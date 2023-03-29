import { NavigateFunction } from 'react-router-dom';

import { useCreateProjectMutation, WalletByAddrQuery } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';

type SubmitCreateProjectParams = {
  walletData?: WalletByAddrQuery;
  createProject: ReturnType<typeof useCreateProjectMutation>[0];
  navigate: NavigateFunction;
  setError: UseStateSetter<string | null>;
};

export async function submitCreateProject({
  createProject,
  setError,
  navigate,
  walletData,
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
      navigate(`/project-pages/${projectId}/choose-credit-class`);
    }
  } catch (e) {
    setError('Error creating project');
  }
}
