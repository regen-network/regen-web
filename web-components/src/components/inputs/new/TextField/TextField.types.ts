import { PropsWithChildren, ReactNode } from 'react';
import { StandardTextFieldProps } from '@mui/material';

import { DefaultStyleProps } from '../FieldFormControl/FieldFormControl';

export interface TriggerTextFieldProps
  extends PropsWithChildren,
    StandardTextFieldProps {
  triggerOnChange?: (v: any) => Promise<void>;
  transformValue?: (v: any) => any;
}

export interface RegenTextFieldProps
  extends TriggerTextFieldProps,
    DefaultStyleProps {
  children?: any;
  errors?: boolean;
  optional?: boolean | string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  step?: number;
  customInputProps?: { min?: number; max?: number };
  description?: string | React.ReactNode;
  label: ReactNode;
  formErrors: string[];
  className?: string;
}
