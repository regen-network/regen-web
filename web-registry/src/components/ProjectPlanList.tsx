import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Card from 'web-components/lib/components/cards/Card';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // [theme.breakpoints.down('xs')]: {
    // },
  },
  subtitle: {
    padding: theme.spacing(4, 0),
    textAlign: 'center',
    fontSize: theme.spacing(4),
    color: theme.palette.info.dark,
  },
  cards: {},
  createPlanCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(60.5),
    background: theme.palette.info.light,
  },
  createPlanButton: {
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
  },
}));

const ProjectPlanList: React.FC = () => {
  const classes = useStyles();

  return (
    <OnBoardingSection title="Create a Project">
      <div className={classes.content}>
        <Typography className={classes.subtitle}>Get started with your first project.</Typography>
        <div className={classes.cards}>
          <Card className={classes.createPlanCard}>
            <ContainedButton className={classes.createPlanButton}>+ create project</ContainedButton>
          </Card>
        </div>
      </div>
    </OnBoardingSection>
  );
};

export default ProjectPlanList;
