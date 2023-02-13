import { forwardRef } from 'react';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';

import { Body } from '../../../typography';
import { useInputLabelStyles } from '../InputLabel/InputLabel.styles';
import { useTextFieldStyles } from './TextField.styles';
import { RegenTextFieldProps } from './TextField.types';

const TextField = forwardRef<HTMLDivElement, RegenTextFieldProps>(
  (
    {
      error = false,
      optional = false,
      defaultStyle = true,
      forceDefaultStyle = false,
      children,
      startAdornment,
      endAdornment,
      description,
      label,
      customInputProps = {},
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useTextFieldStyles({
      error,
      label,
    });
    const baseClasses = [styles.root, props.className];
    const defaultClasses = [styles.default, ...baseClasses];
    const { classes: labelClasses } = useInputLabelStyles({
      optional: !!optional,
    });
    const rootClasses = defaultStyle
      ? forceDefaultStyle
        ? defaultClasses
        : [...defaultClasses, styles.firstOfType]
      : baseClasses;
    const id = props.id ?? props.name;

    return (
      <MuiTextField
        {...props}
        ref={ref}
        id={id}
        variant="standard"
        className={cx(rootClasses)}
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
        }}
        label={
          <>
            <Box
              sx={{
                display: 'inline-block',
                width: optional ? 'inherit' : '100%',
              }}
            >
              {label}
            </Box>
            {description && (
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Body size="sm">{description}</Body>
              </Box>
            )}
          </>
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
