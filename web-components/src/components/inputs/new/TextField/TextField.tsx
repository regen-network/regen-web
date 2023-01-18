import { forwardRef } from 'react';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { Body } from '../../../typography';
import InputLabel from '../../InputLabel';
import { useTextFieldStyles } from './TextField.styles';
import { TriggerTextField } from './TextField.TriggerTextField';
import { RegenTextFieldProps } from './TextField.types';

const TextField = forwardRef<HTMLDivElement, RegenTextFieldProps>(
  (
    {
      transformValue,
      triggerOnChange,
      errors = false,
      optional = false,
      defaultStyle = true,
      forceDefaultStyle = false,
      children,
      startAdornment,
      endAdornment,
      description,
      customInputProps = {},
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useTextFieldStyles({
      errors,
      formErrors: props.formErrors,
      label: props.label,
    });
    const baseClasses = [styles.root, props.className];
    const defaultClasses = [styles.default, ...baseClasses];
    const rootClasses = defaultStyle
      ? forceDefaultStyle
        ? defaultClasses
        : [...defaultClasses, styles.firstOfType]
      : baseClasses;

    return (
      <TriggerTextField
        {...props}
        ref={ref}
        variant="standard"
        transformValue={transformValue}
        triggerOnChange={triggerOnChange}
        className={cx(rootClasses)}
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
            <InputLabel optional={!!optional} focused={false} required={false}>
              {props.label}
            </InputLabel>
            {description && (
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Body size="sm">{description}</Body>
              </Box>
            )}
          </>
        }
        InputLabelProps={{ focused: false, required: false }}
        fullWidth
      >
        {children}
      </TriggerTextField>
    );
  },
);

export default TextField;
