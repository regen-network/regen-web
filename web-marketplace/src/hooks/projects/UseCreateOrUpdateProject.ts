import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ProjectPatch,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from 'generated/graphql';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { getWalletByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery.utils';
import { getUnanchoredProjectBaseMetadata } from 'lib/rdf';
import { useWallet } from 'lib/wallet/wallet';

import { useProjectEditContext } from 'pages/ProjectEdit';

type CreateOrUpdateProjectParams = {
  offChainProjectId?: string;
  projectPatch: ProjectPatch;
};

export const useCreateOrUpdateProject = () => {
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
  const { isEdit, onChainProject } = useProjectEditContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const [createProject] = useCreateProjectMutation();
  const { data: walletData } = useQuery(
    getWalletByAddrQuery({
      addr: wallet?.address ?? '',
      client: graphqlClient,
      enabled: wallet?.address !== undefined,
    }),
  );
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
              projectPatch,
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
                adminWalletId: walletData?.walletByAddr?.id,
                ...projectPatch,
              },
            },
          },
        });
        const projectId = createRes?.data?.createProject?.project?.id;
        if (projectId) {
          await reactQueryClient.invalidateQueries({
            queryKey: getWalletByAddrQueryKey(
              walletData?.walletByAddr?.addr ?? '',
            ),
          });
          // await reactQueryClient.invalidateQueries({
          //   queryKey: getProjectByOnChainIdKey(onChainProject.id),
          // });
          return projectId;
        }
      }
    },
    [
      classData?.data?.creditClassByOnChainId?.id,
      createProject,
      isEdit,
      onChainProject,
      reactQueryClient,
      updateProject,
      walletData?.walletByAddr?.addr,
      walletData?.walletByAddr?.id,
    ],
  );

  return { createOrUpdateProject };
};
