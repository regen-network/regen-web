import React from 'react';
import { Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';

const useStyles = makeStyles()((theme: Theme) => ({
  button: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      marginRight: theme.spacing(8.75),
    },
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
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

export const OnboardingSubmit: React.FC<React.PropsWithChildren<Props>> = ({
  onSubmit,
  onCancel,
  disabled,
  submitText,
  cancelText,
}) => {
  const { classes, cx } = useStyles();
  return (
    <Grid container justifyContent={!!onCancel ? 'space-between' : 'flex-end'}>
      {!!onCancel && (
        <ContainedButton
          variant="text"
          onClick={onCancel}
          className={cx(classes.cancelBtn, classes.button)}
        >
          {cancelText}
        </ContainedButton>
      )}
      <ContainedButton
        onClick={onSubmit}
        className={classes.button}
        disabled={disabled}
      >
        {submitText}
      </ContainedButton>
    </Grid>
  );
};
