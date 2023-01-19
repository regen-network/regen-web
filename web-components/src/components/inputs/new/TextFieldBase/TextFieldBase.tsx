import React, { forwardRef, ReactNode } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField, { BaseTextFieldProps } from '@mui/material/TextField';

import { DefaultStyleProps } from '../FieldFormControl/FieldFormControl';
import InputLabel from '../InputLabel/InputLabel';
import { useTextFieldStyles } from './textFieldBase.styles';

export interface RegenTextFieldProps
  extends DefaultStyleProps,
    BaseTextFieldProps {
  children?: any;
  error?: boolean;
  optional?: boolean | string;
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  step?: number;
  customInputProps?: { min?: number; max?: number };
  label?: ReactNode;
}

const TextFieldBase = forwardRef<HTMLDivElement, RegenTextFieldProps>(
  (
    {
      error = false,
      optional = false,
      defaultStyle = true,
      forceDefaultStyle = false,
      disabled,
      children,
      startAdornment,
      endAdornment,
      customInputProps = {},
      label,
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useTextFieldStyles({
      error,
      label: label,
    });
    const baseClasses = [styles.root, props.className];
    const defaultClasses = [styles.default, ...baseClasses];
    const rootClasses = defaultStyle
      ? forceDefaultStyle
        ? defaultClasses
        : [...defaultClasses, styles.firstOfType]
      : baseClasses;

    return (
      <MuiTextField
        {...props}
        ref={ref}
        error={error}
        variant="standard"
        className={cx(rootClasses)}
        InputProps={{
          disableUnderline: true,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
          inputProps: { ...customInputProps },
        }}
        label={
          <InputLabel optional={!!optional} focused={false} required={false}>
            {label}
          </InputLabel>
        }
        InputLabelProps={{ focused: false, required: false }}
        fullWidth
      >
        {children}
      </MuiTextField>
    );
  },
);

export default TextFieldBase;
