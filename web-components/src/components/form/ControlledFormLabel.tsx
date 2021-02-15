import React from 'react';
import clsx from 'clsx';
import { Theme, makeStyles } from '@material-ui/core';

interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  optional?: boolean;
}

interface StyleProps {
  optional?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  label: props => ({
    lineHeight: '140%',
    transform: 'scale(1)',
    color: props.disabled ? theme.palette.info.main : theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    position: 'relative',
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
}));

/**
 *  manually re-implements MUI's FormLabel component to allow more control over positioning etc
 */
export default function FormLabel({ children, className, optional, disabled }: Props): JSX.Element {
  const classes = useStyles({ optional, disabled });
  return <label className={clsx(classes.label, className)}>{children}</label>;
}
