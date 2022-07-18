import { MsgCreateProject } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useCallback, useState } from 'react';
import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../../generated/json-ld';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import {
  generateIri,
  IriFromMetadataSuccess,
} from '../../../lib/metadata-graph';

interface MsgCreateProjectValues {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>;
  jurisdiction: string;
  referenceId?: string;
}

interface Props {
  signAndBroadcast: SignAndBroadcastType;
}

type ReturnType = {
  projectCreateSubmit: (values: MsgCreateProjectValues) => Promise<void>;
  isSubmitModalOpen: boolean;
  closeSubmitModal: () => void;
};

const useProjectCreateSubmit = ({ signAndBroadcast }: Props): ReturnType => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const closeSubmitModal = () => setIsSubmitModalOpen(false);

  const projectCreateSubmit = useCallback(
    async ({
      classId,
      admin,
      metadata,
      jurisdiction,
      referenceId,
    }: MsgCreateProjectValues): Promise<void> => {
      if (!classId) return Promise.reject();

      let iriResponse:
        | IriFromMetadataSuccess<
            Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>
          >
        | undefined;

      try {
        iriResponse = await generateIri(metadata);
        if (!iriResponse) return;
      } catch (err) {
        throw new Error(err as string);
      }

      const msg = MsgCreateProject.fromPartial({
        classId,
        admin,
        metadata: iriResponse.iri,
        jurisdiction,
        referenceId,
      });

      const tx = {
        msgs: [msg],
        fee: undefined,
      };

      try {
        await signAndBroadcast(tx, () => setIsSubmitModalOpen(true));
      } catch (e) {
        console.error('useProjectCreateSubmit', e);
      }
    },
    [signAndBroadcast],
  );

  return { projectCreateSubmit, isSubmitModalOpen, closeSubmitModal };
};

export { useProjectCreateSubmit };
