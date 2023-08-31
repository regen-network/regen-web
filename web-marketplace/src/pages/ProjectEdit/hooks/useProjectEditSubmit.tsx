import { useCallback } from 'react';
import {
  MsgUpdateProjectAdmin,
  MsgUpdateProjectMetadata,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import { NestedPartial } from 'types/nested-partial';
import { generateIri } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';

import { OnTxSuccessfulProps } from 'pages/Dashboard/MyEcocredits/MyEcocredits.types';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  PROJECT_UPDATE_METADATA_LABEL,
  PROJECT_UPDATED_METADATA_HEADER,
} from '../ProjectEdit.constants';

type Props = {
  projectId?: string;
  admin?: string;
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
  newAdmin?: string,
  doUpdateMetadata?: boolean,
  doUpdateAdmin?: boolean,
) => Promise<void>;

const useProjectEditSubmit = ({
  projectId,
  admin,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): UseProjectEditSubmitParams => {
  const projectEditSubmit = useCallback(
    async (
      metadata: NestedPartial<ProjectMetadataLD>,
      newAdmin?: string,
      doUpdateMetadata: boolean = true,
      doUpdateAdmin: boolean = false,
    ): Promise<void> => {
      const iriResponse = await generateIri(metadata);
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
                label: 'new project admin',
                value: {
                  name: newAdmin,
                  url: `/ecocredits/accounts/${newAdmin}/portfolio`,
                },
              },
              {
                label: 'old project admin',
                value: {
                  name: admin,
                  url: `/ecocredits/accounts/${admin}/portfolio`,
                },
              },
            );
          }

          onTxSuccessful({
            cardItems,
            title: PROJECT_UPDATED_METADATA_HEADER,
            cardTitle: PROJECT_UPDATE_METADATA_LABEL,
          });
        }
      };

      await signAndBroadcast({ msgs }, () => onBroadcast(), {
        onError,
        onSuccess,
      });
    },
    [
      projectId,
      admin,
      signAndBroadcast,
      onErrorCallback,
      onTxSuccessful,
      onBroadcast,
    ],
  );

  return projectEditSubmit;
};

export default useProjectEditSubmit;
