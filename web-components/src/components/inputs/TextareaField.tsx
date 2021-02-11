import React from 'react';
import { TextFieldProps } from 'formik-material-ui';
import { makeStyles, Theme } from '@material-ui/core';
import TextField from './TextField';

interface RegenTextareaFieldProps extends TextFieldProps {
  children?: any;
  errors?: boolean;
  optional?: boolean;
  adornment?: string;
  charLimit?: number;
  triggerOnChange?: (v: any) => Promise<void>;
  transformValue?: (v: any) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  // TODO: none of this works...
  root: {
    // height: '300px !important',
    height: theme.spacing(30),
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(25), // 11.25
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(20), // 8.75
    },
    '& .MuiInputBase-root': {
      [theme.breakpoints.up('sm')]: {
        height: theme.spacing(25), // 11.25
      },
      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(20), // 8.75
      },
    },
  },
}));

export default function TextareaField({ onChange, ...props }: RegenTextareaFieldProps): JSX.Element {
  const classes = useStyles();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> {
    if (onChange) {
      console.log('val :>> ', props.field.value);
      console.log('e :>> ', e);
      // triggerOnChange(e);
    } else {
      console.log('no onChange');
    }
  }

  return (
    <TextField
      className={classes.root}
      triggerOnChange={handleChange}
      multiline
      rows={3}
      rowsMax={5}
      {...props}
    />
  );
}
