import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

interface IconProps {
  className?: string;
}

export default function UncheckedIcon({ className }: IconProps): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 20 20" className={className}>
      <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="0.5"
        fill="white"
        stroke="#D2D5D9"
      />
    </SvgIcon>
  );
}
