import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import CreateProjectCard from 'web-components/lib/components/cards/CreateProjectCard';
import { useCreateProjectMutation, useGetUserProfileByEmailQuery } from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
    fontSize: theme.spacing(4),
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      paddingTop: theme.spacing(5),
    },
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  createCard: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
}));

const ProjectList: React.FC = () => {
  const classes = useStyles();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm')); used for navigating to edit
  const history = useHistory();

  // TODO Create provider to get directly user data if logged in
  // https://github.com/regen-network/regen-registry/issues/555
  const { user } = useAuth0();
  const userEmail = user?.email;
  const { data } = useGetUserProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail,
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
        history.push(`/project-pages/${projectId}/choose-credit-class`);
      }
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      console.log(e);
    }
  }

  // TODO: when existing project is clicked for editing, use this
  const editProjectPage = (projectId: string): void => {
    const editUrl = `/project-pages/edit/${projectId}`;
    history.push(`${editUrl}/basic-info`);
  };
  console.log(projects);

  return (
    <OnBoardingSection formContainer title={isFirstProject ? 'Create a Project' : 'Projects'}>
      {isFirstProject && (
        <Typography className={classes.subtitle}>Get started with your first project.</Typography>
      )}
      <div className={classes.cards}>
        {/* TODO: Existing Projects. see regen-network/regen-registry#360 */}
        {projects?.map(p => (
          <div onClick={() => editProjectPage(p?.id)}>{p?.id}</div>
        ))}
        <CreateProjectCard
          className={classes.createCard}
          onClick={submitCreateProject}
          isFirstProject={isFirstProject}
        />
      </div>
    </OnBoardingSection>
  );
};

export { ProjectList };
