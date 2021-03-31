import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Card from 'web-components/lib/components/cards/Card';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    padding: theme.spacing(4, 0, 6),
    textAlign: 'center',
    fontSize: theme.spacing(4),
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      padding: theme.spacing(5, 0, 8),
    },
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  createPlanCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(60.5),
    background: theme.palette.info.light,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(78.25),
    },
  },
  createPlanButton: {
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
  },
}));

const ProjectPlanList: React.FC = () => {
  const classes = useStyles();
  const [projectPlans, setProjectPlans] = useState([]);

  return (
    <OnBoardingSection title="Create a Project">
      <Typography className={classes.subtitle}>Get started with your first project.</Typography>
      <div className={classes.cards}>
        {projectPlans?.length ? (
          <div>{/*TODO: Existing Project Plans */}</div>
        ) : (
          <Card className={classes.createPlanCard}>
            <ContainedButton className={classes.createPlanButton}>+ create project</ContainedButton>
          </Card>
        )}
      </div>
    </OnBoardingSection>
  );
};

export default ProjectPlanList;
