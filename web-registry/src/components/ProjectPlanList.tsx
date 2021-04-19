import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import CreateProjectPlanCard from 'web-components/lib/components/cards/CreateProjectPlanCard';

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

const ProjectPlanList: React.FC = () => {
  const classes = useStyles();
  const projectPlans: any[] = []; // TODO: placeholder until we can fetch project plans;
  const [isFirstProject, setIsFirstProject] = useState(true);

  useEffect(() => {
    setIsFirstProject(projectPlans.length === 0);
  }, [projectPlans]);

  const createProjectPlan = (): void => {
    // TODO: Go to next step. See issue regen-network/regen-registry#392
  };

  return (
    <OnBoardingSection formContainer title={isFirstProject ? 'Create a Project' : 'Projects'}>
      {isFirstProject && (
        <Typography className={classes.subtitle}>Get started with your first project.</Typography>
      )}
      <div className={classes.cards}>
        {projectPlans.map(projectPlan => (
          <div>{/*TODO: Existing Project Plans. see regen-network/regen-registry#360 */}</div>
        ))}
        <CreateProjectPlanCard
          className={classes.createCard}
          onClick={createProjectPlan}
          isFirstProject={isFirstProject}
        />
      </div>
    </OnBoardingSection>
  );
};

export default ProjectPlanList;
