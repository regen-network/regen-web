import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio as MuiRadio,
  RadioProps as RadioPropsMui,
} from '@mui/material';

import { Body } from '../../../../components/typography';
import { useRadioStyles } from './Radio.styles';
import { RadiotVariant } from './Radio.types';

export interface RadioProps extends RadioPropsMui {
  value?: string;
  label?: string;
  isSelected?: boolean;
  variant?: RadiotVariant;
  labelOptionalText?: string;
  helperText?: string;
  children?: React.ReactNode;
}

export const Radio = ({
  value,
  label,
  isSelected,
  variant = 'default',
  labelOptionalText,
  helperText,
  children,
  ...props
}: RadioProps) => {
  const { classes, cx } = useRadioStyles({ isSelected });
  const isDefaultVariant = variant === 'default';

  return (
    <Box
      className={cx(isDefaultVariant && classes.defaultVariant)}
      sx={{ width: 'fit-content' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          value={value}
          label={label}
          control={
            <MuiRadio
              {...props}
              checkedIcon={
                <span
                  className={cx(classes.radioBtn, classes.checkedRadioBtn)}
                />
              }
              icon={<span className={classes.radioBtn} />}
              sx={{ p: 0 }}
            />
          }
          sx={{ ml: 0, mr: 1 }}
          className={classes.radioLabel}
        />
        {labelOptionalText && <Body size="md">{labelOptionalText}</Body>}
      </Box>
      {helperText && (
        <FormHelperText sx={{ ml: 8.75 }}>{helperText}</FormHelperText>
      )}
      {children && <Box sx={{ mt: 4 }}>{children}</Box>}
    </Box>
  );
};
