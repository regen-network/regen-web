import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const ProjectPageIcon: React.FC<React.PropsWithChildren<SvgIconProps>> =
  props => {
    return (
      <SvgIcon
        {...props}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2.5"
          y="5"
          width="20"
          height="15"
          rx="2"
          stroke="#7BC796"
          strokeWidth="2"
        />
        <rect
          x="1.5"
          y="10"
          width="0.999999"
          height="21"
          rx="0.25"
          transform="rotate(-90 1.5 10)"
          fill="#7BC796"
        />
        <rect
          x="12.5"
          y="13"
          width="1"
          height="8"
          rx="0.25"
          transform="rotate(-90 12.5 13)"
          fill="#7BC796"
        />
        <rect
          x="12.5"
          y="15"
          width="1"
          height="7"
          rx="0.25"
          transform="rotate(-90 12.5 15)"
          fill="#7BC796"
        />
        <rect
          x="12.5"
          y="17"
          width="1"
          height="4"
          rx="0.25"
          transform="rotate(-90 12.5 17)"
          fill="#7BC796"
        />
        <rect x="5" y="11.5" width="6" height="6" rx="0.5" stroke="#7BC796" />
        <path d="M7 15.5V13.8534L8 13.12L9 13.8534V15.5H7Z" stroke="#7BC796" />
        <circle cx="5" cy="7.5" r="0.5" fill="#7BC796" />
        <circle cx="7" cy="7.5" r="0.5" fill="#7BC796" />
        <circle cx="9" cy="7.5" r="0.5" fill="#7BC796" />
        <path
          d="M6.3 15.5C5.58203 15.5 5 16.082 5 16.8C5 17.1866 5.3134 17.5 5.7 17.5H10.3C10.6866 17.5 11 17.1866 11 16.8C11 16.082 10.418 15.5 9.7 15.5H6.3Z"
          stroke="#7BC796"
        />
      </SvgIcon>
    );
  };
