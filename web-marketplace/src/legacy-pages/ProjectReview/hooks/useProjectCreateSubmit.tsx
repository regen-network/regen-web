import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { regen } from '@regen-network/api';
import { useQueryClient } from '@tanstack/react-query';

import { useUpdateProjectByIdMutation } from 'generated/graphql';
import { generateIri, IriFromMetadataSuccess } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';

import { SignAndBroadcastType } from '../../../hooks/useMsgClient';

interface MsgCreateProjectValues {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataLD>;
  jurisdiction: string;
  referenceId: string;
}

interface Props {
  signAndBroadcast: SignAndBroadcastType;
}

type Return = {
  projectCreateSubmit: (values: MsgCreateProjectValues) => Promise<void>;
};

const useProjectCreateSubmit = ({ signAndBroadcast }: Props): Return => {
  const [updateProject] = useUpdateProjectByIdMutation();
  const reactQueryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projectCreateSubmit = useCallback(
    async ({
      classId,
      admin,
      metadata,
      jurisdiction,
      referenceId,
    }: MsgCreateProjectValues): Promise<void> => {
      if (!classId) {
        // This is an off-chain project without any credit class id,
        // we just need to set published to true
        if (projectId) {
          await updateProject({
            variables: {
              input: {
                id: projectId,
                projectPatch: {
                  published: true,
                },
              },
            },
          });
          await reactQueryClient.invalidateQueries({
            queryKey: getProjectByIdKey(projectId),
          });
          navigate(`/project-pages/${projectId}/finished`);
        }
      } else {
        // We create the project on-chain
        let iriResponse:
          | IriFromMetadataSuccess<Partial<ProjectMetadataLD>>
          | undefined;

        try {
          iriResponse = await generateIri(metadata);
          if (!iriResponse) return;
        } catch (err) {
          throw new Error(err as string);
        }

        const msg =
          regen.ecocredit.v1.MessageComposer.withTypeUrl.createProject({
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
      }
    },
    [navigate, projectId, reactQueryClient, signAndBroadcast, updateProject],
  );

  return { projectCreateSubmit };
};

export { useProjectCreateSubmit };
