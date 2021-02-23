import { Grid, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import ContainedButton from '../buttons/ContainedButton';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      marginRight: theme.spacing(8.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6.25),
      marginRight: theme.spacing(2.5),
    },
  },
  cancelBtn: {
    color: theme.palette.grey[400],
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.grey[500],
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

type Props = {
  onSubmit: () => void;
  onCancel?: () => void;
  disabled: boolean;
  submitText?: string;
  cancelText?: string;
};

export const OnboardingSubmit: React.FC<Props> = ({
  onSubmit,
  onCancel,
  disabled,
  submitText = 'Next',
  cancelText = 'Back',
}) => {
  const classes = useStyles();
  return (
    <Grid container justify={!!onCancel ? 'space-between' : 'flex-end'}>
      {!!onCancel && (
        <ContainedButton
          variant="text"
          onClick={onCancel}
          className={clsx(classes.cancelBtn, classes.button)}
        >
          {cancelText}
        </ContainedButton>
      )}
      <ContainedButton onClick={onSubmit} className={classes.button} disabled={disabled}>
        {submitText}
      </ContainedButton>
    </Grid>
  );
};
