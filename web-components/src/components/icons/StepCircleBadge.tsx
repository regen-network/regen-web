import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import clsx from 'clsx';

type Props = {
  className?: string;
  icon: JSX.Element;
  isActive?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(27.75),
    height: theme.spacing(27.75),
    borderRadius: '50%',
    background: theme.palette.primary.main,
  },
  active: {
    background: theme.palette.secondary.contrastText,
  },
}));

const StepCircleBadge: React.FC<Props> = ({ className, icon, isActive }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(className, classes.circle, isActive && classes.active)}
    >
      {icon}
    </div>
  );
};

export default StepCircleBadge;
