import React from 'react';
import { TextFieldProps } from 'formik-mui';

import DropdownIcon from '../icons/DropdownIcon';
import TextField from './TextField';
import { DefaultStyleProps } from './FieldFormControl';

export interface Option {
  value: string;
  label: string;
}

export interface SelectTextFieldProps
  extends TextFieldProps,
    DefaultStyleProps {
  options?: Option[];
}

export default function SelectTextField({
  options,
  defaultStyle = true,
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
      defaultStyle={defaultStyle}
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
