import { forwardRef } from 'react';
import { SxProps, useTheme } from '@mui/material';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { Theme } from 'src/theme/muiTheme';

import { Subtitle } from '../../../typography';
import Checkbox from '../CheckBox/Checkbox';

interface CheckboxLabelProps extends MuiCheckboxProps {
  label: FormControlLabelProps['label'];
  disabled?: boolean;
  className?: string;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
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
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const isLabelStringOrNumber =
      typeof label === 'string' || typeof label === 'number';

    return (
      <>
        <FormControlLabel
          className={className}
          sx={[{ ml: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
          control={
            <Checkbox
              sx={{ p: 0, mr: 3.5 }}
              disabled={disabled}
              ref={ref}
              {...props}
            />
          }
          label={isLabelStringOrNumber ? <Subtitle>{label}</Subtitle> : label}
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
