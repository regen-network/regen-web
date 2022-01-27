import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useTheme } from '@material-ui/core';

export const HorizontalDotsIcon: React.FC<{ color?: string; className?: string }> = ({
  className,
  color,
  ...props
}) => {
  const theme = useTheme();
  color = color || theme.palette.secondary.main;

  return (
    <SvgIcon
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <svg fill="none" stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </SvgIcon>
  );
};
