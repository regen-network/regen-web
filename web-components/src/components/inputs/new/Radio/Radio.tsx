import { forwardRef, ReactNode } from 'react';
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio as MuiRadio,
  RadioProps as RadioPropsMui,
  SxProps,
} from '@mui/material';

import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import QuestionMarkTooltip from '../../../tooltip/QuestionMarkTooltip';
import { Body } from '../../../typography';
import { RADIO_DEFAULT_OPTIONAL } from './Radio.constants';
import { useRadioStyles } from './Radio.styles';
import { RadiotVariant } from './Radio.types';

export interface RadioProps extends RadioPropsMui {
  value?: string;
  label?: ReactNode;
  selectedValue?: string;
  variant?: RadiotVariant;
  optional?: string | boolean;
  helperText?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  description?: ReactNode;
  tooltip?: ReactNode;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      value,
      label,
      selectedValue = '',
      variant = 'default',
      optional,
      helperText,
      children,
      sx = [],
      description,
      tooltip,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isSelected = selectedValue === value;
    const { classes, cx } = useRadioStyles({ isSelected });
    const isDefaultVariant = variant === 'default';
    const optionalText =
      typeof optional === 'string' ? optional : RADIO_DEFAULT_OPTIONAL;

    return (
      <Box
        className={cx(isDefaultVariant && classes.defaultVariant)}
        sx={[...sxToArray(sx)]}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            value={value}
            label={
              <>
                {label}
                {description && (
                  <Body
                    component="span"
                    className={disabled ? 'text-grey-400' : 'text-grey-700'}
                    size="sm"
                  >
                    {description}
                  </Body>
                )}
              </>
            }
            control={
              <MuiRadio
                {...props}
                disabled={disabled}
                checked={isSelected}
                checkedIcon={
                  <span
                    className={cx(classes.radioBtn, classes.checkedRadioBtn)}
                  />
                }
                icon={<span className={classes.radioBtn} />}
                sx={{ p: 0 }}
                ref={ref}
              />
            }
            sx={{ ml: 0, mr: 1 }}
            className={classes.radioLabel}
          />
          {optional && <Body size="md">{optionalText}</Body>}
          {tooltip && (
            <QuestionMarkTooltip
              color={disabled ? 'grey.100' : undefined}
              sx={{
                alignSelf: 'flex-start',
                marginLeft: 'auto',
                height: 24,
                width: 24,
              }}
              size="lg"
              title={tooltip}
            />
          )}
        </Box>
        {helperText && (
          <FormHelperText sx={{ ml: 8.75 }}>{helperText}</FormHelperText>
        )}
        {children && <Box sx={{ mt: 4 }}>{children}</Box>}
      </Box>
    );
  },
);
