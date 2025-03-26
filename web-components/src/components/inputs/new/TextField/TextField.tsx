import { forwardRef, useMemo, useRef } from 'react';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';

import { sxToArray } from '../../../../utils/mui/sxToArray';
import { Body } from '../../../typography';
import usePreventWheelScroll from '../../hooks/usePreventWheelScroll';
import { useInputLabelStyles } from '../InputLabel/InputLabel.styles';
import { useTextFieldStyles } from './TextField.styles';
import { RegenTextFieldProps } from './TextField.types';

const TextField = forwardRef<HTMLDivElement, RegenTextFieldProps>(
  (
    {
      error = false,
      optional = false,
      children,
      startAdornment,
      endAdornment,
      description,
      label,
      customInputProps = {},
      sx = [],
      labelClassName,
      required,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const isTypeNumber = useMemo(() => props?.type === 'number', [props?.type]);

    // Prevents the wheel scroll for input fields type=number
    usePreventWheelScroll(inputRef, isTypeNumber);

    const { classes: styles } = useTextFieldStyles({
      error,
      label,
    });
    const baseClasses = [styles.root, props.className];
    const { classes: labelClasses } = useInputLabelStyles({
      optional: !!optional,
    });
    const id = props.id ?? props.name;
    const hasLabelOrDescription = !!label || !!description;

    return (
      <MuiTextField
        {...props}
        sx={[...baseClasses, ...sxToArray(sx)]}
        ref={ref}
        id={id}
        variant="standard"
        error={error}
        InputProps={{
          disableUnderline: true,
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
          inputProps: { ...customInputProps },
          inputRef,
        }}
        label={
          hasLabelOrDescription ? (
            <>
              {label && (
                <Box
                  className={labelClassName}
                  sx={{
                    display: 'inline-block',
                    width: optional ? 'inherit' : '100%',
                  }}
                >
                  {label}
                  {required ? '*' : ''}
                </Box>
              )}
              {description && (
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <Body size="sm">{description}</Body>
                </Box>
              )}
            </>
          ) : undefined
        }
        InputLabelProps={{
          classes: labelClasses,
          htmlFor: id,
          focused: false,
          required: false,
        }}
        fullWidth
      >
        {children}
      </MuiTextField>
    );
  },
);

export default TextField;
