import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  color?: string;
  className?: string;
}

export default function PrintIcon({ color = '#4FB573', className }: Props): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 20 23" className={className}>
      <path d="M5 10V1H7H11.5858L15 4.41421V10H5Z" fill="white" stroke={color} strokeWidth="2" />
      <path d="M11 1V4.75C11 4.88807 11.1119 5 11.25 5H15" stroke={color} />
      <rect x="1" y="9" width="18" height="10" rx="2" fill="white" stroke={color} strokeWidth="2" />
      <rect x="5" y="15" width="10" height="7" fill="white" stroke={color} strokeWidth="2" />
    </SvgIcon>
  );
}
