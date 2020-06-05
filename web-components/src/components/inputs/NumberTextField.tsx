import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextFieldProps } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import TextField from './TextField';
import SpinIcon from '../icons/SpinIcon';

export interface NumberTextFieldProps extends TextFieldProps {
  increment?: number;
  min?: number;
  max?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  arrows: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    cursor: 'pointer',
    width: theme.spacing(6.5),
  },
  arrow: {
    height: '50%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid transparent',
    borderLeft: `1px solid ${theme.palette.grey[50]}`,
    '&:first-of-type': {
      borderBottom: `1px solid ${theme.palette.grey[50]}`,
    },
  },
}));

export default function NumberTextField({
  min,
  max,
  increment = 1,
  ...props
}: NumberTextFieldProps): JSX.Element {
  const classes = useStyles();
  const {
    field: { value, name },
    form: { setFieldValue },
  } = props;
  return (
    <div className={classes.root}>
      <TextField {...props} type="number" />
      <Grid container className={classes.arrows}>
        <Grid
          item
          className={classes.arrow}
          onClick={(): void =>
            setFieldValue(name, max ? Math.min(max, value + increment) : value + increment)
          }
        >
          <SpinIcon />
        </Grid>
        <Grid
          item
          className={classes.arrow}
          onClick={(): void =>
            setFieldValue(name, min ? Math.max(min, value - increment) : value - increment)
          }
        >
          <SpinIcon direction="down" />
        </Grid>
      </Grid>
    </div>
  );
}
