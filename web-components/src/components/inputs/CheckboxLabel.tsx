import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import CheckedIcon from '../icons/CheckedIcon';
import UncheckedIcon from '../icons/UncheckedIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));

interface CheckboxLabelProps extends CheckboxProps {
  label: string;
}

export default function CheckboxLabel({ label, ...props }: CheckboxLabelProps): JSX.Element {
  const classes = useStyles();
  return (
    <FormControlLabel
      className={`${classes.root} ${props.className}`}
      control={
        <Checkbox {...props} color="secondary" icon={<UncheckedIcon />} checkedIcon={<CheckedIcon />} />
      }
      label={label}
    />
  );
}
