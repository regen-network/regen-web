import { useCallback } from 'react';
import { MsgUpdateProjectMetadata } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import { generateIri } from 'lib/db/api/metadata-graph';

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

export type UseProjectEditSubmitParams = (metadata: any) => Promise<void>;

const useProjectEditSubmit = ({
  projectId,
  admin,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): UseProjectEditSubmitParams => {
  const projectEditSubmit = useCallback(
    async (metadata: any): Promise<void> => {
      const iriResponse = await generateIri(metadata);
      if (!iriResponse) return;
      const metadataMsg = MsgUpdateProjectMetadata.fromPartial({
        projectId,
        admin,
        newMetadata: iriResponse.iri,
      });

      const onError = (err?: Error): void => {
        onErrorCallback && onErrorCallback(err);
      };
      const onSuccess = (): void => {
        if (projectId && metadata) {
          const cardItems = [
            {
              label: 'project',
              value: {
                name: metadata['schema:name'],
                url: `/project/${projectId}`,
              },
            },
          ];

          onTxSuccessful({
            cardItems,
            title: PROJECT_UPDATED_METADATA_HEADER,
            cardTitle: PROJECT_UPDATE_METADATA_LABEL,
          });
        }
      };
      // TODO submit MsgUpdateProjectAdmin as part of the same tx if needed: regen-registry/issues/1500
      await signAndBroadcast({ msgs: [metadataMsg] }, () => onBroadcast(), {
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
