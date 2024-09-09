import { ChangeEvent, forwardRef, ReactNode } from 'react';
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
import { useRadioStyles } from './Radio.styles';
import { RadiotVariant } from './Radio.types';

export interface RadioProps extends RadioPropsMui {
  value?: string | boolean;
  label?: ReactNode;
  selectedValue?: string | boolean;
  variant?: RadiotVariant;
  optional?: string | boolean;
  helperText?: string | JSX.Element;
  defaultOptional?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  description?: ReactNode;
  tooltip?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      value,
      label,
      selectedValue = '',
      variant = 'default',
      optional,
      defaultOptional,
      helperText,
      children,
      sx = [],
      description,
      tooltip,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const isSelected = selectedValue === value;
    const { classes, cx } = useRadioStyles({ isSelected });
    const isDefaultVariant = variant === 'default';
    const optionalText =
      typeof optional === 'string' ? optional : defaultOptional;

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
                    className={`font-inherit ${
                      disabled ? 'text-grey-400' : 'text-grey-700'
                    }`}
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
                onChange={onChange}
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
