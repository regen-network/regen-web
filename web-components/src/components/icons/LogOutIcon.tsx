import React from 'react';

import { useGradientId } from './hooks/useGradientId';

type Props = {
  linearGradient?: boolean;
} & React.SVGProps<SVGSVGElement>;

export const LogOutIcon = (props: Props) => {
  const gradientId = useGradientId('logout_icon');

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 5L13.75 5C13.8881 5 14 4.88807 14 4.75V3.25C14 3.11193 13.8881 3 13.75 3H4C3.44772 3 3 3.44772 3 4V4.25V4.75V11.25V12.75V19.25V19.75V20C3 20.5523 3.44771 21 4 21H13.75C13.8881 21 14 20.8881 14 20.75V19.25C14 19.1119 13.8881 19 13.75 19H5V12.75V11.25V5ZM14.5347 8.59099C14.4371 8.49336 14.4371 8.33507 14.5347 8.23744L15.5953 7.17678C15.693 7.07915 15.8513 7.07915 15.9489 7.17678L20.5451 11.773C20.6427 11.8706 20.6427 12.0289 20.5451 12.1265L20.5451 12.1265L19.4844 13.1872L19.4818 13.1898L15.9489 16.7227C15.8512 16.8204 15.6929 16.8204 15.5953 16.7227L14.5346 15.6621C14.437 15.5644 14.437 15.4061 14.5346 15.3085L16.8432 13H8.25C8.11193 13 8 12.8881 8 12.75V11.25C8 11.1119 8.11193 11 8.25 11H16.9437L14.5347 8.59099Z"
        fill={props.linearGradient ? `url(#${gradientId})` : 'currentColor'}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="11.6592"
          y1="2"
          x2="3.93067"
          y2="21.3195"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.00458717" stopColor={'#7BC796'} />
          <stop offset="1" stopColor={'#C5E6D1'} />
        </linearGradient>
      </defs>
    </svg>
  );
};
