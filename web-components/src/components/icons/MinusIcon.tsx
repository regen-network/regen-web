import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

interface IconProps {
  color?: string;
  className?: string;
}

export default function MinusIcon({
  color,
  className,
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
    >
      <rect x="6" y="13" width="18" height="4" fill={color || 'currentColor'} />
    </SvgIcon>
  );
}
