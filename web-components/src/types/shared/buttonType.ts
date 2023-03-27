import { ReactNode } from 'react';

export type ButtonType = {
  text: string;
  startIcon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
