import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface PinIconProps {
  // color: string;
  onClick?: () => void;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
  size?: number;
}

export default function PinIcon({ fontSize = 'inherit', onClick, size }: PinIconProps): JSX.Element {
  return (
    <SvgIcon
      fontSize={fontSize}
      viewBox="0 0 13 16"
      onClick={onClick}
      style={{ transform: size ? `translate(${-size / 2}px,${-size}px)` : 'none' }}
    >
      <path
        d="M13 6.375C13 11.2343 7.97202 14.9913 6.76036 15.8261C6.60169 15.9354 6.39831 15.9354 6.23964 15.8261C5.02798 14.9913 0 11.2343 0 6.375C0 2.85418 2.91015 0 6.5 0C10.0899 0 13 2.85418 13 6.375Z"
        fill="#D2D5D9"
      />
      <circle cx="6.5" cy="6.5" r="3.5" fill="white" />
      <path
        d="M13 6.375C13 11.2343 7.97202 14.9913 6.76036 15.8261C6.60169 15.9354 6.39831 15.9354 6.23964 15.8261C5.02798 14.9913 0 11.2343 0 6.375C0 2.85418 2.91015 0 6.5 0C10.0899 0 13 2.85418 13 6.375Z"
        fill="#4FB573"
      />
      <circle cx="6.5" cy="6.5" r="3.5" fill="white" />
    </SvgIcon>
  );
}
