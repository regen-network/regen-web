import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import DropdownIcon from '../icons/DropdownIcon';
import TextField from './TextField';

const useStyles = makeStyles((theme: Theme) => ({
  selectRoot: {},
}));

export interface Option {
  value: string;
  label: string;
}

interface SelectTextFieldProps {
  options: Option[];
}

export default function SelectTextField({ options, ...props }: SelectTextFieldProps): JSX.Element {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      className={classes.selectRoot}
      select
      SelectProps={{
        native: true,
        IconComponent: DropdownIcon,
      }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
}
