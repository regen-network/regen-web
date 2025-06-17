import { useCallback } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useProjectEditContext } from 'legacy-pages/ProjectEdit';

import {
  ProjectPatch,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getUnanchoredProjectBaseMetadata } from 'lib/rdf';

type CreateOrUpdateProjectParams = {
  offChainProjectId?: string;
  projectPatch: ProjectPatch;
};

export const useCreateOrUpdateProject = () => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const reactQueryClient = useQueryClient();
  const { isEdit, onChainProject } = useProjectEditContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [createProject] = useCreateProjectMutation();
  const { activeAccount } = useAuth();
  const { data: classData } = useQuery(
    getCreditClassByOnChainIdQuery({
      client: graphqlClient,
      onChainId: onChainProject?.classId as string,
      enabled: !!onChainProject?.classId && !!graphqlClient,
    }),
  );

  const createOrUpdateProject = useCallback(
    async ({
      offChainProjectId,
      projectPatch,
    }: CreateOrUpdateProjectParams): Promise<string | undefined> => {
      if (offChainProjectId) {
        await updateProject({
          variables: {
            input: {
              id: offChainProjectId,
              projectPatch: {
                adminAccountId: activeAccount?.id,
                ...projectPatch,
              },
            },
          },
        });
      } else if (isEdit && onChainProject) {
        if (projectPatch.metadata) {
          projectPatch.metadata = getUnanchoredProjectBaseMetadata(
            projectPatch.metadata,
            onChainProject.id,
          );
        }
        const createRes = await createProject({
          variables: {
            input: {
              project: {
                onChainId: onChainProject.id,
                creditClassId:
                  classData?.data?.creditClassByOnChainId?.id || undefined,
                adminAccountId: activeAccount?.id,
                ...projectPatch,
              },
            },
          },
        });
        const projectId = createRes?.data?.createProject?.project?.id;
        if (projectId) {
          await reactQueryClient.invalidateQueries({
            queryKey: getAccountProjectsByIdQueryKey({
              id: activeAccount?.id,
            }),
          });
          return projectId;
        }
      }
    },
    [
      activeAccount?.id,
      classData?.data?.creditClassByOnChainId?.id,
      createProject,
      isEdit,
      onChainProject,
      reactQueryClient,
      updateProject,
    ],
  );

  return { createOrUpdateProject };
};
