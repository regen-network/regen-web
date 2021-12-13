import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { Theme } from 'web-components/lib/theme/muiTheme';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import CreateProjectCard from 'web-components/lib/components/cards/CreateProjectCard';
import {
  useCreateProjectMutation,
  useGetUserProfileByEmailQuery,
} from '../generated/graphql';

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
        <Typography className={classes.subtitle}>
          Get started with your first project.
        </Typography>
      )}
      <div className={classes.cards}>
        {/* TODO: Existing Projects. see regen-network/regen-registry#360 */}
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
