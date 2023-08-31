import { useCallback } from 'react';
import { useApolloClient } from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  ProjectPatch,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
} from 'generated/graphql';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getWalletByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery';
import { getWalletByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery.utils';
import { getProjectCreateBaseData } from 'lib/rdf';
import { useWallet } from 'lib/wallet/wallet';

import { OffChainProject } from './useProjectWithMetadata';

type Props = {
  onChainProject?: ProjectInfo;
};

type CreateOrUpdateProjectParams = {
  offChainProject?: OffChainProject;
  projectPatch: ProjectPatch;
  isEdit?: boolean;
};

export const useCreateOrUpdateProject = ({ onChainProject }: Props) => {
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const { wallet } = useWallet();
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
      offChainProject,
      projectPatch,
      isEdit,
    }: CreateOrUpdateProjectParams) => {
      if (offChainProject?.id) {
        await updateProject({
          variables: {
            input: {
              id: offChainProject.id,
              projectPatch,
            },
          },
        });
      } else if (isEdit && onChainProject) {
        const baseMetadata = getProjectCreateBaseData(onChainProject.classId);
        if (projectPatch.metadata) {
          projectPatch.metadata = { ...baseMetadata, ...projectPatch.metadata };
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
        }
      }
    },
    [
      classData?.data?.creditClassByOnChainId?.id,
      createProject,
      onChainProject,
      reactQueryClient,
      updateProject,
      walletData?.walletByAddr?.addr,
      walletData?.walletByAddr?.id,
    ],
  );

  return { createOrUpdateProject };
};
