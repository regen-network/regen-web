import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

type Props = {
  className?: string;
  icon: JSX.Element;
  isActive?: boolean;
};

const useStyles = makeStyles()((theme: Theme) => ({
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

const StepCircleBadge: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  icon,
  isActive,
}) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(className, classes.circle, isActive && classes.active)}>
      {icon}
    </div>
  );
};

export default StepCircleBadge;
