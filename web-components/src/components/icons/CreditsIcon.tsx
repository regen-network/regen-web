import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface CreditsIconProps {
  color: string;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export default function CreditsIcon({ color, fontSize = 'inherit' }: CreditsIconProps): JSX.Element {
  return (
    <SvgIcon fontSize={fontSize} viewBox="0 0 25 23">
      <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 5V17C1 19.2091 4.13401 21 8 21C9.4225 21 10.7459 20.7575 11.8505 20.341"
          stroke={color}
          strokeWidth="2"
        />
        <path d="M1 14C1 16.2091 4.13401 18 8 18C8.4894 18 8.96708 17.9713 9.42815 17.9167" stroke={color} />
        <path d="M1 11C1 13.2091 4.13401 15 8 15C8.33952 15 8.6734 14.9862 9 14.9595" stroke={color} />
        <path d="M1 8C1 10.2091 4.13401 12 8 12C8.33952 12 8.6734 11.9862 9 11.9595" stroke={color} />
        <ellipse cx="8" cy="5" rx="7" ry="4" stroke={color} strokeWidth="2" />
        <circle cx="16.5" cy="14.5" r="7.5" stroke={color} strokeWidth="2" />
      </svg>
    </SvgIcon>
  );
}
