import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import clsx from 'clsx';

interface IconProps {
  color?: string;
  className?: string;
}

export default function PlusIcon({ color, className }: IconProps): JSX.Element {
  return (
    <SvgIcon
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={clsx(className)}
    >
      <rect x="6" y="13" width="18" height="4" fill={color || '#000'} />
      <rect
        x="17"
        y="6"
        width="18"
        height="4"
        transform="rotate(90 17 6)"
        fill={color || '#000'}
      />
    </SvgIcon>
  );
}
