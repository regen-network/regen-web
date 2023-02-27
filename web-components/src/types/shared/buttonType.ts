import { ReactNode } from 'react';

export type ButtonType = {
  text: string;
  startIcon?: ReactNode;
  onClick?: () => void;
};
