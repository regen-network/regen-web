import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const ProjectPageIconSmall = (props: SvgIconProps): JSX.Element => {
  return (
    <SvgIcon
      {...props}
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="20"
        height="17"
        viewBox="0 0 20 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="15"
          rx="2"
          stroke="currentColor"
          stroke-width="2"
        />
        <rect
          y="6"
          width="0.999999"
          height="20"
          rx="0.25"
          transform="rotate(-90 0 6)"
          fill="currentColor"
        />
        <rect
          x="11"
          y="9"
          width="1"
          height="6"
          rx="0.25"
          transform="rotate(-90 11 9)"
          fill="currentColor"
        />
        <rect
          x="11"
          y="11"
          width="1"
          height="5"
          rx="0.25"
          transform="rotate(-90 11 11)"
          fill="currentColor"
        />
        <rect
          x="11"
          y="13"
          width="1"
          height="4"
          rx="0.25"
          transform="rotate(-90 11 13)"
          fill="currentColor"
        />
        <rect
          x="3.5"
          y="7.5"
          width="6"
          height="6"
          rx="0.5"
          stroke="currentColor"
        />
        <path
          d="M6.5 9.12004L7.5 9.85337V11.5H5.5V9.85337L6.5 9.12004Z"
          stroke="currentColor"
        />
        <circle cx="3.5" cy="3.5" r="0.5" fill="currentColor" />
        <circle cx="5.5" cy="3.5" r="0.5" fill="currentColor" />
        <circle cx="7.5" cy="3.5" r="0.5" fill="currentColor" />
        <path
          d="M8.2 11.5H4.8C4.08203 11.5 3.5 12.082 3.5 12.8C3.5 13.1866 3.8134 13.5 4.2 13.5H8.8C9.1866 13.5 9.5 13.1866 9.5 12.8C9.5 12.082 8.91797 11.5 8.2 11.5Z"
          fill="white"
          stroke="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};
