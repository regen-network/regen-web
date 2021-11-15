import React from 'react';

import DropdownIcon from '../icons/DropdownIcon';
import TextField from './TextField';
// import { StandardTextFieldProps as TextFieldProps } from '@mui/material/TextField';
import { TextFieldProps } from 'formik-material-ui';

export interface Option {
  value: string;
  label: string;
}

export interface SelectTextFieldProps extends TextFieldProps {
  options?: Option[];
}

export default function SelectTextField({
  options,
  ...props
}: SelectTextFieldProps): JSX.Element {
  return (
    <TextField
      {...props}
      select
      SelectProps={{
        native: true,
        IconComponent: DropdownIcon,
      }}
    >
      {options &&
        options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </TextField>
  );
}
