import React from 'react';
import { SvgIcon, useTheme } from '@mui/material';
import clsx from 'clsx';

interface IconProps {
  color?: string;
  className?: string;
}

export default function QuestionIcon({
  color,
  className,
}: IconProps): JSX.Element {
  const theme = useTheme();

  return (
    <SvgIcon viewBox="0 0 25 28" className={clsx(className)}>
      <svg
        width="25"
        height="28"
        viewBox="0 0 25 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12.5"
          cy="14.5"
          r="12.5"
          fill={color || theme.palette.secondary.main}
        />
        <path
          d="M10.8638 8.724C11.2598 8.496 11.6798 8.328 12.1238 8.22C12.5798 8.1 13.0298 8.04 13.4738 8.04C14.1818 8.04 14.8118 8.16 15.3638 8.4C15.9158 8.64 16.3418 8.982 16.6418 9.426C16.9418 9.858 17.0918 10.362 17.0918 10.938C17.0918 11.574 16.9478 12.132 16.6598 12.612C16.3718 13.08 15.9458 13.614 15.3818 14.214C14.8778 14.766 14.4938 15.246 14.2298 15.654C13.9658 16.062 13.8038 16.524 13.7438 17.04L13.6718 17.454H12.6098V16.878C12.6098 16.17 12.7358 15.57 12.9878 15.078C13.2398 14.574 13.6058 14.022 14.0858 13.422C14.4698 12.942 14.7518 12.54 14.9318 12.216C15.1238 11.88 15.2198 11.502 15.2198 11.082C15.2198 10.614 15.0578 10.248 14.7338 9.984C14.4098 9.708 13.9538 9.57 13.3658 9.57C12.5258 9.57 11.6918 9.822 10.8638 10.326V8.724ZM12.0878 18.84H14.2298V21H12.0878V18.84Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
}
