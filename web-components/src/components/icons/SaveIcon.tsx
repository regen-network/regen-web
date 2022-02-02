import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/styles';

const SaveIcon: React.FC<{ color?: string; className?: string }> = ({
  className,
  color,
  ...props
}) => {
  const theme = useTheme();
  color = color || theme.palette.primary.main;

  return (
    <SvgIcon
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.28217 1L10.8146 0.999999L12.6455 2.88025L13.8881 4.15644V14H1.28217L1.28217 1Z"
          stroke={color}
          strokeWidth="2"
        />
        <mask id="path-2-inside-1_7504_227896" fill={color}>
          <rect x="2.71649" y="2.5" width="7.30298" height="2.5" rx="0.25" />
        </mask>
        <rect
          x="2.71649"
          y="2.5"
          width="7.30298"
          height="2.5"
          rx="0.25"
          stroke={color}
          strokeWidth="2"
          mask="url(#path-2-inside-1_7504_227896)"
        />
        <ellipse cx="7.58514" cy="10" rx="2.43433" ry="2.5" fill={color} />
      </svg>
    </SvgIcon>
  );
};

export { SaveIcon };
