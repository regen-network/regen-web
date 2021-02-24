import React from 'react';
import { makeStyles, Theme, Input as MuiInput, InputProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '2px',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      fontSize: theme.spacing(3.5),
    },
    '& .MuiInputAdornment-root p': {
      color: theme.palette.info.main,
    },
    '&.Mui-error': {
      '& input, & .MuiSelect-select': {
        borderColor: theme.palette.error.main,
      },
    },
  },
}));

/** Custom styles on top of MUI's `Input` component */
const Input: React.FC<InputProps> = props => {
  const classes = useStyles();
  return <MuiInput {...props} disableUnderline className={classes.input} />;
};

export default Input;
