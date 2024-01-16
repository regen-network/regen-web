import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface PinIconProps extends SvgIconProps {
  size?: number;
}

export default function PinIcon({
  fontSize = 'inherit',
  onClick,
  size,
  ...props
}: PinIconProps): JSX.Element {
  return (
    <SvgIcon
      viewBox="0 0 24 25"
      style={{
        transform: size ? `translate(${-size / 2}px,${-size}px)` : 'none',
      }}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.2581 22.0611C13.6294 21.1258 20 16.4543 20 10.3862C20 6.05288 16.4183 2.54004 12 2.54004C7.58172 2.54004 4 6.05288 4 10.3862C4 16.4543 10.3706 21.1258 11.7419 22.0611C11.9011 22.1697 12.0989 22.1697 12.2581 22.0611ZM12 14.8477C14.3791 14.8477 16.3077 12.9191 16.3077 10.54C16.3077 8.16097 14.3791 6.23235 12 6.23235C9.62093 6.23235 7.69231 8.16097 7.69231 10.54C7.69231 12.9191 9.62093 14.8477 12 14.8477Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
