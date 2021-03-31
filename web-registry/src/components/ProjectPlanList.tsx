import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import Card from 'web-components/lib/components/cards/Card';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';

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
  createPlanCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(60.5),
    background: theme.palette.info.light,
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(78.25),
      marginTop: theme.spacing(8),
    },
  },
  createPlanButton: {
    paddingLeft: theme.spacing(14),
    paddingRight: theme.spacing(14),
  },
}));

interface CreateProjectPlanCardProps {
  onClick: () => void;
  isFirstProject: boolean;
}

const CreateProjectPlanCard: React.FC<CreateProjectPlanCardProps> = ({ onClick, isFirstProject }) => {
  const classes = useStyles();

  return (
    <Card className={classes.createPlanCard}>
      {isFirstProject ? (
        <ContainedButton className={classes.createPlanButton} onClick={onClick}>
          + create project
        </ContainedButton>
      ) : (
        <OutlinedButton className={classes.createPlanButton} onClick={onClick}>
          add another project
        </OutlinedButton>
      )}
    </Card>
  );
};

const ProjectPlanList: React.FC = () => {
  const classes = useStyles();
  const projectPlans: any[] = []; // TODO: placeholder until we can fetch project plans;
  // const [projectPlans, setProjectPlans] = useState([]);
  const [isFirstProject, setIsFirstProject] = useState(true);

  useEffect(() => {
    setIsFirstProject(projectPlans.length === 0);
  }, [projectPlans]);

  const createProjectPlan = (): void => {
    // TODO: Go to next step. See issue regen-network/regen-registry#392
  };

  return (
    <OnBoardingSection title={isFirstProject ? 'Create a Project' : 'Projects'}>
      {isFirstProject && (
        <Typography className={classes.subtitle}>Get started with your first project.</Typography>
      )}
      <div className={classes.cards}>
        {projectPlans.map(projectPlan => (
          <div>{/*TODO: Existing Project Plans. see regen-network/regen-registry#360 */}</div>
        ))}
        <CreateProjectPlanCard onClick={createProjectPlan} isFirstProject={isFirstProject} />
      </div>
    </OnBoardingSection>
  );
};

export default ProjectPlanList;
