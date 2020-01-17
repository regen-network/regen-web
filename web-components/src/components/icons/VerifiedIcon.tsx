import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface VerifiedIconProps {
  color: string;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export default function VerifiedIcon({ color, fontSize = 'default' }: VerifiedIconProps): JSX.Element {
  return (
    <SvgIcon fontSize={fontSize}>
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.3875 1.73937C12.4076 1.71659 12.4445 1.69499 12.5 1.69499C12.5555 1.69499 12.5924 1.71659 12.6125 1.73937C15.3639 4.85786 19.362 6.83299 23.8174 6.85551C22.4923 13.9684 18.2962 20.051 12.5 23.8168C6.70382 20.051 2.50766 13.9684 1.18257 6.85551C5.638 6.83299 9.63613 4.85786 12.3875 1.73937Z"
          stroke={color}
        />
        <rect
          x="18.1241"
          y="9"
          width="2"
          height="11.7178"
          rx="0.25"
          transform="rotate(45 18.1241 9)"
          fill={color}
        />
        <rect
          width="2"
          height="5.99902"
          rx="0.25"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 8.41422 13.0438)"
          fill={color}
        />
      </svg>
    </SvgIcon>
  );
}
