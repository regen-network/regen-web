import React, { forwardRef } from 'react';
import { InputAdornment, InputProps, SxProps } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';

import { Body } from '../../../typography';
import FieldFormControl, {
  DefaultStyleProps,
} from '../FieldFormControl/FieldFormControl';
import Input from '../Input/Input';

interface ControlledTextFieldProps extends InputProps, DefaultStyleProps {
  charLimit?: number;
  description?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  optional?: boolean | string;
  onExampleClick?: () => void;
  sx?: SxProps<Theme>;
}

const ControlledTextField = forwardRef<
  HTMLInputElement,
  ControlledTextFieldProps
>(
  (
    {
      charLimit,
      className,
      description,
      endAdornment,
      label,
      optional,
      startAdornment,
      onExampleClick,
      disabled,
      value,
      defaultStyle = true,
      sx,
      ...inputProps
    },
    ref,
  ) => {
    const charsLeft = (charLimit || Infinity) - ((value && value.length) || 0);

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
        disabled={disabled}
        optional={optional}
        className={className}
        defaultStyle={defaultStyle}
        sx={sx}
      >
        <>
          <Input
            {...inputProps}
            ref={ref}
            disabled={disabled}
            value={value}
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
      </FieldFormControl>
    );
  },
);

export default ControlledTextField;
