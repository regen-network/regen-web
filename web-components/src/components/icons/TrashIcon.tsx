import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

import withHoverColor, { Props } from './withHoverColor';

function TrashIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  return (
    <SvgIcon
      className={className}
      width="17"
      height="24"
      viewBox="0 0 17 24"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg fill="none">
        <mask id="path-1-inside-1" fill="white">
          <path d="M12 4.75C12 4.88807 11.8881 5 11.75 5L5.25 5C5.11193 5 5 4.88807 5 4.75L5 3C5 1.34315 6.34315 -1.77008e-08 8 1.27146e-07L9 2.14569e-07C10.6569 3.59416e-07 12 1.34315 12 3L12 4.75Z" />
        </mask>
        <path
          d="M12 4.75C12 4.88807 11.8881 5 11.75 5L5.25 5C5.11193 5 5 4.88807 5 4.75L5 3C5 1.34315 6.34315 -1.77008e-08 8 1.27146e-07L9 2.14569e-07C10.6569 3.59416e-07 12 1.34315 12 3L12 4.75Z"
          stroke={color || 'black'}
          strokeWidth="4"
          mask="url(#path-1-inside-1)"
        />
        <mask id="path-2-inside-2" fill="white">
          <path d="M1 6.25C1 6.11193 1.11193 6 1.25 6H15.75C15.8881 6 16 6.11193 16 6.25V21C16 22.6569 14.6569 24 13 24H4C2.34315 24 1 22.6569 1 21V6.25Z" />
        </mask>
        <path
          d="M1 6.25C1 6.11193 1.11193 6 1.25 6H15.75C15.8881 6 16 6.11193 16 6.25V21C16 22.6569 14.6569 24 13 24H4C2.34315 24 1 22.6569 1 21V6.25Z"
          fill="none"
          stroke={color || 'black'}
          strokeWidth="4"
          mask="url(#path-2-inside-2)"
        />
        <rect
          x="5"
          y="10"
          width="1"
          height="10"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="17"
          y="3"
          width="2"
          height="17"
          rx="0.25"
          transform="rotate(90 17 3)"
          fill={color || 'black'}
        />
        <rect
          x="8"
          y="10"
          width="1"
          height="10"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="11"
          y="10"
          width="1"
          height="10"
          rx="0.25"
          fill={color || 'black'}
        />
      </svg>
    </SvgIcon>
  );
}

export default withHoverColor(TrashIcon);
