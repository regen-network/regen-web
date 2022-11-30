import { useCallback } from 'react';
import { MsgCreateProject } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';

import { generateIri, IriFromMetadataSuccess } from 'lib/db/api/metadata-graph';
import { ProjectMetadataIntersectionLD } from 'lib/db/types/json-ld';

import { SignAndBroadcastType } from '../../../hooks/useMsgClient';

interface MsgCreateProjectValues {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataIntersectionLD>;
  jurisdiction: string;
  referenceId?: string;
}

interface Props {
  signAndBroadcast: SignAndBroadcastType;
}

type ReturnType = {
  projectCreateSubmit: (values: MsgCreateProjectValues) => Promise<void>;
};

const useProjectCreateSubmit = ({ signAndBroadcast }: Props): ReturnType => {
  const projectCreateSubmit = useCallback(
    async ({
      classId,
      admin,
      metadata,
      jurisdiction,
      referenceId,
    }: MsgCreateProjectValues): Promise<void> => {
      if (!classId)
        return Promise.reject('cant create project without a class ID');

      let iriResponse:
        | IriFromMetadataSuccess<Partial<ProjectMetadataIntersectionLD>>
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

      await signAndBroadcast(tx);
    },
    [signAndBroadcast],
  );

  return { projectCreateSubmit };
};

export { useProjectCreateSubmit };
