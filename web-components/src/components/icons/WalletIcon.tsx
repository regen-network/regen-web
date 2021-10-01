import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  className?: string;
  color?: string;
}

function WalletIcon({ className, color }: Props): JSX.Element {
  return (
    <SvgIcon className={className} viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="15" height="16" rx="2" stroke={color || '#545555'} strokeWidth="2" />
        <rect
          x="12"
          y="5"
          width="8"
          height="8"
          rx="2"
          fill="none"
          stroke={color || '#545555'}
          strokeWidth="2"
        />
        <circle cx="15" cy="9" r="1" fill={color || '#545555'} />
      </svg>
    </SvgIcon>
  );
}

export { WalletIcon };
