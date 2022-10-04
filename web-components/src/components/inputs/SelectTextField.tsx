import React, { ReactNode } from 'react';
import { Box, MenuItem, Theme, useTheme } from '@mui/material';
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
  label: string | JSX.Element;
  disabled?: boolean;
  selected?: boolean;
}

export interface SelectTextFieldProps
  extends TextFieldProps,
    DefaultStyleProps {
  options?: Option[];
  native?: boolean;
}

interface StyleProps {
  default: boolean;
}

export default function SelectTextField({
  options,
  disabled,
  native = true,
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
        native,
        displayEmpty: true,
        renderValue: native
          ? undefined
          : selected => {
              const selectedOption = options?.find(
                option => option.value === selected,
              );
              if (selectedOption) {
                return selectedOption.label;
              }

              return options?.[0].label;
            },
        IconComponent: disabled
          ? () => <DropdownIcon color={theme.palette.grey['400']} />
          : DropdownIcon,
      }}
    >
      {options ? (
        options.map(option => (
          <Box
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            selected={option.selected}
            component={native ? 'option' : MenuItem}
          >
            {option.label}
          </Box>
        ))
      ) : (
        <Box component={native ? 'option' : MenuItem} key="loading">
          No options available
        </Box>
      )}
    </TextField>
  );
}
