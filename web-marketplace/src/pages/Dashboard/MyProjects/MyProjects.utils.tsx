import { NavigateFunction } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { ProjectCardProps } from 'web-components/src/components/cards/ProjectCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';

import { useCreateProjectMutation } from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { getAccountProjectsByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountProjectsByIdQuery/getAccountProjectsByIdQuery.utils';

type SubmitCreateProjectParams = {
  activeAccountId?: string;
  addr?: string;
  createProject: ReturnType<typeof useCreateProjectMutation>[0];
  navigate: NavigateFunction;
  setError: UseStateSetter<string | null>;
  reactQueryClient: QueryClient;
  isIssuer: boolean;
};

export async function submitCreateProject({
  activeAccountId,
  createProject,
  setError,
  navigate,
  reactQueryClient,
  isIssuer,
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
        queryKey: getAccountProjectsByIdQueryKey({ id: activeAccountId }),
      });
      
    }
  } catch (e) {
    setError('Error creating project');
  }
}

export const getDefaultProject = (disabled: boolean): ProjectCardProps => ({
  name: '',
  imgSrc: '/jpg/default-project.jpg',
  place: '',
  area: 0,
  areaUnit: 'ha',
  button: {
    text: 'Edit project',
    startIcon: (
      <EditIcon
        sx={{ width: 20, height: 20, color: disabled ? 'grey.100' : 'inherit' }}
      />
    ),
    disabled,
  },
});
