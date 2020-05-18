import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function CheckedIcon(): JSX.Element {
  return (
    <SvgIcon viewBox="0 0 20 20">
      <rect width="20" height="20" rx="1" fill="#4FB573" />
      <path d="M3 9.5L8 14.5L17.5 5" stroke="white" stroke-width="3" />
    </SvgIcon>
  );
}
