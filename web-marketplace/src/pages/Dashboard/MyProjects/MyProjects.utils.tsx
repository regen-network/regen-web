import { NavigateFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { useCreateProjectMutation, WalletByAddrQuery } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { getWalletByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getWalletByAddrQuery/getWalletByAddrQuery.utils';

type SubmitCreateProjectParams = {
  walletData?: WalletByAddrQuery;
  createProject: ReturnType<typeof useCreateProjectMutation>[0];
  navigate: NavigateFunction;
  setError: UseStateSetter<string | null>;
  reactQueryClient: QueryClient;
};

export async function submitCreateProject({
  createProject,
  setError,
  navigate,
  walletData,
  reactQueryClient,
}: SubmitCreateProjectParams): Promise<void> {
  const adminWalletId = walletData?.walletByAddr?.id;

  try {
    const res = await createProject({
      variables: {
        input: {
          project: {
            adminWalletId,
          },
        },
      },
    });
    const projectId = res?.data?.createProject?.project?.id;
    if (projectId) {
      await reactQueryClient.invalidateQueries({
        queryKey: getWalletByAddrQueryKey(walletData?.walletByAddr?.addr ?? ''),
      });
      navigate(`/project-pages/${projectId}/choose-credit-class`);
    }
  } catch (e) {
    setError('Error creating project');
  }
}
