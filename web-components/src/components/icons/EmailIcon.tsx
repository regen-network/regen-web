import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  color?: string;
  className?: string;
}

export default function EmailIcon({ color, className }: Props): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 20 15" className={className}>
      <rect x="1" y="1" width="18" height="13" rx="2" fill="#4FB573" stroke="white" strokeWidth="2" />
      <rect
        x="1"
        y="1.81213"
        width="1"
        height="11.4518"
        rx="0.25"
        transform="rotate(-54.3024 1 1.81213)"
        fill="white"
      />
      <rect
        width="1"
        height="11.4546"
        rx="0.25"
        transform="matrix(-0.583508 -0.812108 -0.812108 0.583508 19.5167 1.81213)"
        fill="white"
      />
    </SvgIcon>
  );
}
