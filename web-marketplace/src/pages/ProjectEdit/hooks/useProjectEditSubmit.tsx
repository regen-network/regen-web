import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  MsgUpdateProjectAdmin,
  MsgUpdateProjectMetadata,
} from '@regen-network/api/regen/ecocredit/v1/tx';

import { NestedPartial } from 'types/nested-partial';
import { generateIri } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getAnchoredProjectBaseMetadata } from 'lib/rdf';

import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  PROJECT_UPDATE_METADATA_LABEL,
  PROJECT_UPDATED_METADATA_HEADER,
} from '../ProjectEdit.constants';

type Props = {
  projectId?: string;
  admin?: string;
  creditClassId?: string;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
};

export type UseProjectEditSubmitParams = (
  metadata: NestedPartial<ProjectMetadataLD>,
  newAdmin?: string | null,
  doUpdateMetadata?: boolean,
  doUpdateAdmin?: boolean,
) => Promise<void>;

const useProjectEditSubmit = ({
  projectId,
  admin,
  creditClassId,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): UseProjectEditSubmitParams => {
  const { _ } = useLingui();

  const projectEditSubmit = useCallback(
    async (
      metadata: NestedPartial<ProjectMetadataLD>,
      newAdmin?: string | null,
      doUpdateMetadata: boolean = true,
      doUpdateAdmin: boolean = false,
    ): Promise<void> => {
      const iriResponse = await generateIri(
        getAnchoredProjectBaseMetadata(metadata, creditClassId),
      );
      if (!iriResponse) return;
      const msgs: Array<MsgUpdateProjectMetadata | MsgUpdateProjectAdmin> = [];

      if (doUpdateMetadata)
        msgs.push(
          MsgUpdateProjectMetadata.fromPartial({
            projectId,
            admin,
            newMetadata: iriResponse.iri,
          }),
        );

      if (doUpdateAdmin && newAdmin)
        msgs.push(
          MsgUpdateProjectAdmin.fromPartial({
            projectId,
            admin,
            newAdmin,
          }),
        );

      const onError = (err?: Error): void => {
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (): void => {
        if (projectId && metadata) {
          const cardItems = [
            {
              label: 'project',
              value: {
                name: metadata['schema:name'] || '',
                url: `/project/${projectId}`,
              },
            },
          ];

          if (doUpdateAdmin && admin && newAdmin) {
            cardItems.push(
              {
                label: _(msg`new project admin`),
                value: {
                  name: newAdmin,
                  url: `/profiles/${newAdmin}/portfolio`,
                },
              },
              {
                label: _(msg`old project admin`),
                value: {
                  name: admin,
                  url: `/profiles/${admin}/portfolio`,
                },
              },
            );
          }

          onTxSuccessful({
            cardItems,
            title: _(PROJECT_UPDATED_METADATA_HEADER),
            cardTitle: _(PROJECT_UPDATE_METADATA_LABEL),
          });
        }
      };

      await signAndBroadcast({ msgs }, () => onBroadcast(), {
        onError,
        onSuccess,
      });
    },
    [
      creditClassId,
      projectId,
      admin,
      _,
      signAndBroadcast,
      onErrorCallback,
      onTxSuccessful,
      onBroadcast,
    ],
  );

  return projectEditSubmit;
};

export default useProjectEditSubmit;
