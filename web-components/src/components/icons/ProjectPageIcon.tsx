import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material';

interface IconProps {
  sx?: SxProps<Theme>;
}

const ProjectPageIcon: React.FC<IconProps> = ({ sx }) => {
  return (
    <SvgIcon
      sx={sx}
      width="73"
      height="59"
      viewBox="0 0 73 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="73"
        height="59"
        viewBox="0 0 73 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1_396_30679" fill="white">
          <rect width="73" height="59" rx="3" />
        </mask>
        <rect
          width="73"
          height="59"
          rx="3"
          fill="white"
          stroke="currentColor"
          strokeWidth="8"
          mask="url(#path-1-inside-1_396_30679)"
        />
        <rect
          y="16.6667"
          width="3.66666"
          height="73"
          rx="0.25"
          transform="rotate(-90 0 16.6667)"
          fill="currentColor"
        />
        <rect
          x="40.1499"
          y="27"
          width="4"
          height="21.9"
          rx="0.25"
          transform="rotate(-90 40.1499 27)"
          fill="currentColor"
        />
        <rect
          x="40.1499"
          y="35"
          width="4"
          height="18.25"
          rx="0.25"
          transform="rotate(-90 40.1499 35)"
          fill="currentColor"
        />
        <rect
          x="40.1499"
          y="43"
          width="4"
          height="14.6"
          rx="0.25"
          transform="rotate(-90 40.1499 43)"
          fill="currentColor"
        />
        <mask id="path-6-inside-2_396_30679" fill="white">
          <rect x="9" y="23" width="25.55" height="25.6667" rx="1" />
        </mask>
        <rect
          x="9"
          y="23"
          width="25.55"
          height="25.6667"
          rx="1"
          stroke="currentColor"
          strokeWidth="4"
          mask="url(#path-6-inside-2_396_30679)"
        />
        <path
          d="M17.3 41.8333V34.5387L21.775 31.2421L26.25 34.5387V41.8333H17.3Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <circle cx="14" cy="8" r="2" fill="currentColor" />
        <circle cx="20" cy="8" r="2" fill="currentColor" />
        <path
          d="M15.5835 42C13.4112 42 11.6501 43.761 11.6501 45.9333C11.6501 46.8906 12.4262 47.6667 13.3835 47.6667H30.1668C31.1241 47.6667 31.9001 46.8906 31.9001 45.9333C31.9001 43.761 30.1391 42 27.9668 42H15.5835Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </SvgIcon>
  );
};

export { ProjectPageIcon };
