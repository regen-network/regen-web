import { MouseEvent, ReactNode } from 'react';

export type ButtonType = {
  text: string;
  startIcon?: ReactNode;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  className?: string;
};
