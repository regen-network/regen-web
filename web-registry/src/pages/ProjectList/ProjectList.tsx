import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { Flex } from 'web-components/lib/components/box';
import { CreateProjectCard } from 'web-components/lib/components/cards/CreateCards/CreateProjectCard';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import { Body } from 'web-components/lib/components/typography';

import {
  useCreateProjectMutation,
  useGetUserProfileByEmailQuery,
} from '../../generated/graphql';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();

  // TODO Create provider to get directly user data if logged in
  // https://github.com/regen-network/regen-registry/issues/555
  const { user } = useAuth0();
  const userEmail = user?.email;
  const { data } = useGetUserProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail as string,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [createProject] = useCreateProjectMutation();

  const projects = data?.userByEmail?.projectsByCreatorId.nodes;
  const isFirstProject: boolean = projects?.length === 0;

  async function submitCreateProject(): Promise<void> {
    try {
      const res = await createProject({
        variables: {
          input: {
            project: {
              creatorId: data?.userByEmail?.id,
            },
          },
        },
      });
      const projectId = res.data?.createProject?.project?.id;
      if (projectId) {
        navigate(`/project-pages/${projectId}/choose-credit-class`);
      }
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  // TODO: when existing project is clicked for editing, use this
  // const editProjectPage = (projectId: string): void => {
  //   const editUrl = `/project-pages/${projectId}/edit/`;
  //   navigate(isMobile ? editUrl : `${editUrl}/basic-info`);
  // };

  return (
    <OnBoardingSection
      formContainer
      title={isFirstProject ? 'Create a Project' : 'Projects'}
    >
      {isFirstProject && (
        <Body size="lg" align="center" sx={{ pt: [4, 5] }}>
          Get started with your first project.
        </Body>
      )}
      <Flex col justify="center">
        {/* TODO: Existing Projects. see regen-network/regen-registry#360 */}
        <CreateProjectCard
          sx={{ mt: [6, 8] }}
          onClick={submitCreateProject}
          isFirstProject={isFirstProject}
        />
      </Flex>
    </OnBoardingSection>
  );
};

export { ProjectList };
