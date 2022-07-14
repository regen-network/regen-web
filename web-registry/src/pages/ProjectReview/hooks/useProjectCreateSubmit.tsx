import { MsgCreateProject } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProjectMetadataLD,
  VCSProjectMetadataLD,
} from '../../../generated/json-ld';
import { SignAndBroadcastType } from '../../../hooks/useMsgClient';
import {
  generateIri,
  IriFromMetadataSuccess,
} from '../../../lib/metadata-graph';

export interface MsgCreateProjectValues {}

type Props = {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataLD> | Partial<VCSProjectMetadataLD>;
  jurisdiction: string;
  referenceId?: string;
  signAndBroadcast: SignAndBroadcastType;
  onSuccess: () => void;
};

type ReturnType = (values: MsgCreateProject) => Promise<void>;

const useProjectCreateSubmit = ({
  classId,
  admin,
  metadata,
  jurisdiction,
  referenceId,
  signAndBroadcast,
  onSuccess,
}: Props): ReturnType => {
  const navigate = useNavigate();
  const projectCreateSubmit = useCallback(async (): Promise<void> => {
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
      await signAndBroadcast(tx, () => console.log('signAndBroadcast sent'));
      onSuccess();
    } catch (e) {
      console.error(e);
    }
  }, [
    admin,
    classId,
    jurisdiction,
    metadata,
    referenceId,
    signAndBroadcast,
    onSuccess,
  ]);

  return projectCreateSubmit;
};

export { useProjectCreateSubmit };
