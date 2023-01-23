import { ReactNode } from 'react';
import { StandardTextFieldProps } from '@mui/material';

import { DefaultStyleProps } from '../FieldFormControl/FieldFormControl';

export interface RegenTextFieldProps
  extends StandardTextFieldProps,
    DefaultStyleProps {
  children?: any;
  optional?: boolean | string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  step?: number;
  customInputProps?: { min?: number; max?: number };
  description?: string | React.ReactNode;
  label: ReactNode;
  className?: string;
  name?: string;
}
