import React from 'react';
import { SxProps, Theme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

interface IconProps {
  className?: string;
  color?: string;
  sx?: SxProps<Theme>;
}

export default function OrganizationIcon({
  className,
  color,
  sx,
}: IconProps): JSX.Element {
  return (
    <SvgIcon className={className} viewBox="0 0 23 22" sx={sx}>
      <svg
        width="23"
        height="22"
        viewBox="0 0 23 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1" fill="white">
          <rect width="14" height="22" rx="0.25" />
        </mask>
        <rect
          width="14"
          height="22"
          rx="0.25"
          stroke={color || 'black'}
          strokeWidth="4"
          mask="url(#path-1-inside-1)"
        />
        <mask id="path-2-inside-2" fill="white">
          <rect x="12" y="7" width="11" height="15" rx="0.25" />
        </mask>
        <rect
          x="12"
          y="7"
          width="11"
          height="15"
          rx="0.25"
          stroke={color || 'black'}
          strokeWidth="4"
          mask="url(#path-2-inside-2)"
        />
        <rect
          x="4"
          y="4"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="8"
          y="4"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="4"
          y="8"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="8"
          y="8"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="4"
          y="12"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="8"
          y="12"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <mask id="path-9-inside-3" fill="white">
          <rect x="16" y="11" width="3" height="3" rx="0.25" />
        </mask>
        <rect
          x="16"
          y="11"
          width="3"
          height="3"
          rx="0.25"
          stroke={color || 'black'}
          strokeWidth="2"
          mask="url(#path-9-inside-3)"
        />
        <mask id="path-10-inside-4" fill="white">
          <rect x="16" y="15" width="3" height="3" rx="0.25" />
        </mask>
        <rect
          x="16"
          y="15"
          width="3"
          height="3"
          rx="0.25"
          stroke={color || 'black'}
          strokeWidth="2"
          mask="url(#path-10-inside-4)"
        />
        <rect
          x="4"
          y="16"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
        <rect
          x="8"
          y="16"
          width="2"
          height="2"
          rx="0.25"
          fill={color || 'black'}
        />
      </svg>
    </SvgIcon>
  );
}
