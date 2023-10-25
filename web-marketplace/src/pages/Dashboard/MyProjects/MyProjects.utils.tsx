import { NavigateFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { useCreateProjectMutation } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { getAccountProjectsByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByAddrQuery/getAccountProjectsByAddrQuery.utils';

type SubmitCreateProjectParams = {
  activeAccountId?: string;
  addr?: string;
  createProject: ReturnType<typeof useCreateProjectMutation>[0];
  navigate: NavigateFunction;
  setError: UseStateSetter<string | null>;
  reactQueryClient: QueryClient;
};

export async function submitCreateProject({
  activeAccountId,
  addr,
  createProject,
  setError,
  navigate,
  reactQueryClient,
}: SubmitCreateProjectParams): Promise<void> {
  try {
    const res = await createProject({
      variables: {
        input: {
          project: {
            adminAccountId: activeAccountId,
          },
        },
      },
    });
    const projectId = res?.data?.createProject?.project?.id;
    if (projectId) {
      await reactQueryClient.invalidateQueries({
        queryKey: getAccountProjectsByAddrQueryKey({ addr: addr ?? '' }),
      });
      navigate(`/project-pages/${projectId}/choose-credit-class`);
    }
  } catch (e) {
    setError('Error creating project');
  }
}
