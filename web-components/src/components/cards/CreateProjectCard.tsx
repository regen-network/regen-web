import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Card from './Card';
import ContainedButton from '../buttons/ContainedButton';
import OutlinedButton from '../buttons/OutlinedButton';

interface CreateProjectCardProps {
  className?: string;
  onClick: () => void;
  isFirstProject: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
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

const CreateProjectCard: React.FC<CreateProjectCardProps> = ({ className, onClick, isFirstProject }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(className, classes.createPlanCard)}>
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

export default CreateProjectCard;
