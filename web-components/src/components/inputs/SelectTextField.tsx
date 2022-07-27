import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TextFieldProps } from 'formik-mui';

import DropdownIcon from '../icons/DropdownIcon';
import { DefaultStyleProps } from './FieldFormControl';
import TextField from './TextField';

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    '& select': {
      color: props => (props.default ? theme.palette.info.main : 'inherit'),
    },
  },
}));

export interface Option {
  value: string;
  label: string;
}

export interface SelectTextFieldProps
  extends TextFieldProps,
    DefaultStyleProps {
  options?: Option[];
}

interface StyleProps {
  default: boolean;
}

export default function SelectTextField({
  options,
  ...props
}: SelectTextFieldProps): JSX.Element {
  const {
    field: { value },
  } = props;
  const styles = useStyles({ default: !value });

  return (
    <TextField
      {...props}
      className={styles.root}
      select
      SelectProps={{
        native: true,
        IconComponent: DropdownIcon,
      }}
    >
      {options ? (
        options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      ) : (
        <option key="loading">No options available</option>
      )}
    </TextField>
  );
}
