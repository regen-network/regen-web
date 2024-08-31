import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface Props extends SvgIconProps {
  className?: string;
}

const DraftDocumentAltIcon: React.FC<
  React.PropsWithChildren<Props & Partial<typeof SvgIcon>>
> = ({ className, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 24 24" className={className} {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 8V21H5V3H12H14V7.25C14 7.66421 14.3358 8 14.75 8H19ZM21 7.09725V7H20.9803C20.9693 6.97387 20.9538 6.94958 20.9343 6.92831L15.5743 1.08107C15.527 1.02941 15.4601 1 15.39 1H15H14H12H3.25C3.11193 1 3 1.11193 3 1.25V22.75C3 22.8881 3.11193 23 3.25 23H20.75C20.8881 23 21 22.8881 21 22.75V8V7.09725ZM15 3.41433L18.2869 7H15V3.41433Z"
          fill="url(#paint0_linear_79_28515)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_79_28515"
            x1="12"
            y1="1"
            x2="1.93033"
            y2="21.5971"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00458717" stopColor="#7BC796" />
            <stop offset="1" stopColor="#C5E6D1" />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default DraftDocumentAltIcon;
