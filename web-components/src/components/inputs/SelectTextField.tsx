import React from 'react';
import { Theme, useTheme } from '@mui/material';
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
  disabled,
  ...props
}: SelectTextFieldProps): JSX.Element {
  const {
    field: { value },
  } = props;
  const styles = useStyles({ default: !value });
  const theme = useTheme();

  return (
    <TextField
      {...props}
      disabled={disabled}
      className={styles.root}
      select
      SelectProps={{
        native: true,
        IconComponent: disabled
          ? () => <DropdownIcon color={theme.palette.grey['400']} />
          : DropdownIcon,
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
