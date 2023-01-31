import React, { forwardRef } from 'react';
import { Input as MuiInput, InputProps } from '@mui/material';

import { useInputStyles } from './Input.styles';

type Props = React.PropsWithChildren<InputProps>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    const { classes: styles, cx } = useInputStyles();
    return (
      <MuiInput
        {...props}
        ref={ref}
        disableUnderline
        className={cx(styles.input, className)}
      />
    );
  },
);

export default Input;
