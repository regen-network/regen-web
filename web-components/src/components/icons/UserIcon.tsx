import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import clsx from 'clsx';

interface IconProps {
  color?: string;
  className?: string;
}

export default function UserIcon({ color, className }: IconProps): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 25 25" className={clsx(className)}>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.5"
          cy="12.5"
          r="11.5"
          stroke={color || 'black'}
          strokeWidth="2"
        />
        <circle
          cx="12.5001"
          cy="9.72223"
          r="4.59259"
          stroke={color || 'black'}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.9165 21.587C4.7969 17.2447 8.30561 14 12.5 14C16.6944 14 20.2031 17.2447 21.0835 21.5871C20.8014 21.8536 20.5068 22.1072 20.2008 22.3469C19.6062 18.1158 16.3115 15 12.5 15C8.68852 15 5.39378 18.1158 4.79917 22.3469C4.49318 22.1072 4.19864 21.8536 3.9165 21.587Z"
          fill={color || 'black'}
        />
      </svg>
    </SvgIcon>
  );
}
