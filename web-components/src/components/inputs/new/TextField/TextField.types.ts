import { ReactNode } from 'react';
import { StandardTextFieldProps } from '@mui/material';

export interface RegenTextFieldProps extends StandardTextFieldProps {
  children?: any;
  optional?: boolean | string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  step?: number | string;
  customInputProps?: { min?: number; max?: number; step?: string | number };
  description?: string | ReactNode;
  label?: ReactNode;
  className?: string;
  name?: string;
  labelClassName?: string;
}
