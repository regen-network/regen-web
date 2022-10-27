import React from 'react';
import Grid from '@mui/material/Grid';
import { DefaultTheme as Theme } from '@mui/styles';
import { TextFieldProps } from 'formik-mui';
import { makeStyles } from 'tss-react/mui';

import SpinIcon from '../icons/SpinIcon';
import TextField from './TextField';

export interface NumberTextFieldProps extends TextFieldProps {
  increment?: number;
  min?: number;
  max?: number;
  arrows?: boolean;
}

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  arrows: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 60,
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
    borderLeft: `1px solid ${theme.palette.grey[100]}`,
    '&:first-of-type': {
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
    },
  },
}));

export default function NumberTextField({
  min,
  max,
  increment = 1,
  arrows = true,
  ...props
}: NumberTextFieldProps): JSX.Element {
  const { classes } = useStyles();
  const {
    field: { value, name },
    form: { setFieldValue },
  } = props;
  return (
    <div className={classes.root}>
      <TextField
        {...props}
        type="number"
        inputProps={{ step: increment, lang: 'en' }}
        customInputProps={{ min, max }}
      />
      {arrows && (
        <Grid container className={classes.arrows}>
          <Grid
            item
            className={classes.arrow}
            onClick={(): void =>
              setFieldValue(
                name,
                max ? Math.min(max, value + increment) : value + increment,
              )
            }
          >
            <SpinIcon />
          </Grid>
          <Grid
            item
            className={classes.arrow}
            onClick={(): void =>
              setFieldValue(
                name,
                min ? Math.max(min, value - increment) : value - increment,
              )
            }
          >
            <SpinIcon direction="down" />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
