import { forwardRef } from 'react';
import { SxProps, useTheme } from '@mui/material';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { Theme } from '../../../../theme/muiTheme';
import { cn } from '../../../../utils/styles/cn';
import { Subtitle } from '../../../typography';
import Checkbox from '../CheckBox/Checkbox';

export interface CheckboxLabelProps extends MuiCheckboxProps {
  label: FormControlLabelProps['label'];
  disabled?: boolean;
  className?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  optional?: boolean;
  optionalTextClassName?: string;
}

const CheckboxLabel = forwardRef<HTMLButtonElement, CheckboxLabelProps>(
  (
    {
      label,
      disabled,
      sx = [],
      className,
      error = false,
      helperText = '',
      optional,
      optionalTextClassName,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const isLabelStringOrNumber =
      typeof label === 'string' || typeof label === 'number';
    const labelClassName = optional
      ? cn(
          `after:content-['(optional)'] after:text-grey-400 after:ml-[4px] after:text-sm sm:after:text-base`,
          optionalTextClassName,
        )
      : '';

    return (
      <>
        <FormControlLabel
          className={cn('ml-0 flex items-start', className)}
          sx={[...(Array.isArray(sx) ? sx : [sx])]}
          control={
            <Checkbox
              sx={{ p: 0, mr: 3.5 }}
              disabled={disabled}
              ref={ref}
              {...props}
            />
          }
          label={
            isLabelStringOrNumber ? (
              <Subtitle className={labelClassName}>{label}</Subtitle>
            ) : (
              <div className={labelClassName}>{label}</div>
            )
          }
        />
        {error && (
          <FormHelperText error={error} sx={{ ml: 9 }}>
            <Subtitle
              as="span"
              size="sm"
              sx={{ color: theme.palette.error.main }}
            >
              {helperText}
            </Subtitle>
          </FormHelperText>
        )}
      </>
    );
  },
);

export default CheckboxLabel;
