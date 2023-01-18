import { forwardRef } from 'react';
import MuiTextField from '@mui/material/TextField';

import { TriggerTextFieldProps } from './TextField.types';

export const TriggerTextField = forwardRef<
  HTMLDivElement,
  TriggerTextFieldProps
>(
  (
    { triggerOnChange, transformValue, ...props }: TriggerTextFieldProps,
    ref,
  ): JSX.Element => {
    const onChange = async (event: any): Promise<void> => {
      const { value } = event.target;
      if (triggerOnChange) {
        await triggerOnChange(value);
      }
    };
    return <MuiTextField {...props} onChange={onChange} ref={ref} />;
  },
);
