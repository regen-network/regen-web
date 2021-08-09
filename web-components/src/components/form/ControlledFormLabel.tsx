import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  optional?: boolean;
  labelSubText?: string;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
  },
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: props.disabled ? theme.palette.info.main : theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    position: 'relative',
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    '&::after': {
      content: props.optional ? '" (optional)"' : '',
      fontWeight: 'normal',
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  }),
  subLabel: {
    marginLeft: theme.spacing(1),
    fontWeight: 'normal',
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

/**
 *  manually re-implements MUI's FormLabel component to allow more control over positioning etc
 */
export default function ControlledFormLabel({
  children,
  className,
  optional,
  disabled,
  labelSubText,
}: Props): JSX.Element {
  const styles = useStyles({ optional, disabled });
  return (
    <div className={styles.root}>
      <label className={clsx(styles.label, className)}>{children}</label>
      {labelSubText && <label className={styles.subLabel}>&nbsp;{labelSubText}</label>}
    </div>
  );
}
