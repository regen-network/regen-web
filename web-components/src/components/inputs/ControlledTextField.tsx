import React from 'react';
import { InputAdornment, InputProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { FieldProps } from 'formik';

import { Body } from '../typography';
import FieldFormControl, { DefaultStyleProps } from './FieldFormControl';
import Input from './Input';

interface ControlledTextFieldProps
  extends FieldProps,
    InputProps,
    DefaultStyleProps {
  charLimit?: number;
  description?: string;
  label?: string;
  optional?: boolean | string;
  onExampleClick?: () => void;
  sx?: SxProps<Theme>;
}

export default function ControlledTextField({
  charLimit,
  className,
  description,
  endAdornment,
  field,
  form,
  label,
  meta,
  optional,
  startAdornment,
  onExampleClick,
  defaultStyle = true,
  sx,
  ...inputProps
}: ControlledTextFieldProps): JSX.Element {
  const charsLeft =
    (charLimit || Infinity) -
    ((field && field.value && field.value.length) || 0);

  function handleFieldChange(
    {
      target: { value },
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    handleFn: (val: string) => void,
  ): void {
    const text =
      charLimit && charsLeft <= charLimit ? value.slice(0, charLimit) : value;
    handleFn(text);
  }

  return (
    <FieldFormControl
      label={label}
      description={description}
      onExampleClick={onExampleClick}
      disabled={form.isSubmitting}
      optional={optional}
      className={className}
      field={field}
      form={form}
      meta={meta}
      defaultStyle={defaultStyle}
      sx={sx}
    >
      {({ handleChange, handleBlur }) => (
        <>
          <Input
            {...inputProps}
            onBlur={({ target: { value } }) => handleBlur(value)}
            onChange={e => handleFieldChange(e, handleChange)}
            value={field.value}
            disabled={!!inputProps.disabled || form.isSubmitting}
            startAdornment={
              startAdornment ? (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ) : null
            }
            endAdornment={
              endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null
            }
          />
          {charLimit && (
            <Body
              size="sm"
              sx={{ color: 'info.main', mt: 1, mb: { xs: 3, sm: 4 } }}
            >
              {`${charsLeft} character${charsLeft === 1 ? '' : 's'} remaining`}
            </Body>
          )}
        </>
      )}
    </FieldFormControl>
  );
}
