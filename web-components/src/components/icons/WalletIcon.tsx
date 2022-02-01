import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

interface Props {
  className?: string;
  color?: string;
}

function WalletIcon({ className, color }: Props): JSX.Element {
  return (
    <SvgIcon
      className={className}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 21 18"
      version="1.1"
    >
      <g>
        <path
          fill="none"
          d="M14,2H3C2.4,2,2,2.4,2,3v12c0,0.6,0.4,1,1,1h11c0.6,0,1-0.4,1-1v-1h-1c-1.7,0-3-1.3-3-3V7c0-1.7,1.3-3,3-3h1V3
          C15,2.4,14.6,2,14,2z"
        />
        <path
          fill={color}
          d="M18,4h-1V3c0-1.7-1.3-3-3-3H3C1.3,0,0,1.3,0,3v12c0,1.7,1.3,3,3,3h11c1.7,0,3-1.3,3-3v-1h1c1.7,0,3-1.3,3-3V7
          C21,5.3,19.7,4,18,4z M15,15c0,0.6-0.4,1-1,1H3c-0.6,0-1-0.4-1-1V3c0-0.6,0.4-1,1-1h11c0.6,0,1,0.4,1,1v1h-1c-1.7,0-3,1.3-3,3v4
          c0,1.7,1.3,3,3,3h1V15z M19,11c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1V7c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V11z"
        />
      </g>
      <circle fill={color} cx="15" cy="9" r="1" />
    </SvgIcon>
  );
}

export { WalletIcon };
