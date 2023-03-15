import { forwardRef } from 'react';
import { InputAdornment, InputProps, SxProps } from '@mui/material';
import { DefaultTheme as Theme } from '@mui/styles';

import FieldFormControl, {
  DefaultStyleProps,
} from '../FieldFormControl/FieldFormControl';
import Input from '../Input/Input';

interface TextareaFieldProps extends InputProps, DefaultStyleProps {
  charLimit?: number;
  description?: string;
  label?: string;
  optional?: boolean | string;
  disabled?: boolean;
  children?: React.ReactNode;
  onExampleClick?: () => void;
  sx?: SxProps<Theme>;
}

export const TextAreaField = forwardRef<HTMLInputElement, TextareaFieldProps>(
  (
    {
      charLimit,
      className,
      description,
      endAdornment,
      label,
      optional,
      disabled = false,
      startAdornment,
      onExampleClick,
      defaultStyle = true,
      children,
      sx,
      ...inputProps
    }: TextareaFieldProps,
    ref,
  ): JSX.Element => (
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
          disabled={disabled}
          startAdornment={
            startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null
          }
          endAdornment={
            endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null
          }
          ref={ref}
        />
        {children}
      </>
    </FieldFormControl>
  ),
);
