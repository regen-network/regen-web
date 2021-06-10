import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import CreateProjectCard from 'web-components/lib/components/cards/CreateProjectCard';
import { useGetUserProfileByEmailQuery, Project, Maybe } from '../../generated/graphql';

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

  // TODO Create provider to get directly user data if logged in
  const { user } = useAuth0();
  const userEmail = user?.email;
  const { data } = useGetUserProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail,
    },
  });

  const party = data?.userByEmail?.partyByPartyId;
  let projects: Maybe<Pick<Project, 'creditClassId' | 'metadata'>>[] = [];
  if (party) {
    projects = [
      ...party.projectsByDeveloperId.nodes,
      ...party.projectsByLandOwnerId.nodes,
      ...party.projectsByStewardId.nodes,
    ];
  }

  const isFirstProject: boolean = projects.length === 0;

  const createProject = (): void => {
    // TODO: Go to next step. See issue regen-network/regen-registry#392
  };

  return (
    <OnBoardingSection formContainer title={isFirstProject ? 'Create a Project' : 'Projects'}>
      {isFirstProject && (
        <Typography className={classes.subtitle}>Get started with your first project.</Typography>
      )}
      <div className={classes.cards}>
        {projects.map(project => (
          <div>{/*TODO: Existing Projects. see regen-network/regen-registry#360 */}</div>
        ))}
        <CreateProjectCard
          className={classes.createCard}
          onClick={createProject}
          isFirstProject={isFirstProject}
        />
      </div>
    </OnBoardingSection>
  );
};

export default ProjectList;
