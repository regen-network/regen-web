import SvgIcon from '@mui/material/SvgIcon';

import { useGradientId } from './hooks/useGradientId';
import { SvgLinearGradientProps } from './ProjectPageIcon';

export default function BridgeIcon({
  sx = [],
  linearGradient,
  ...props
}: SvgLinearGradientProps): JSX.Element {
  const gradientId = useGradientId('linear_bridge_icon');
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 24"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      {linearGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="13.105"
            y1="4"
            x2="8.64218"
            y2="21.4289"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00458717" stopColor="#7BC796" />
            <stop offset="1" stopColor="#C5E6D1" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M24.8 13H23.05V7.64C23.46 8.04 23.93 8.45 24.49 8.83L25.61 7.17C23.98 6.08 23.25 4.71 23.05 4.29V4.25C23.05 4.11 22.94 4 22.8 4H21.3C21.16 4 21.05 4.11 21.05 4.25C20.63 5 18.6 8 13.05 8C7.49998 8 5.46998 5 5.04998 4.26C5.04998 4.12 4.93998 4 4.79998 4H3.29998C3.15998 4 3.04998 4.11 3.04998 4.25V4.48C3.04998 4.55 2.92998 5.93 0.599976 7.11L1.49998 8.9C2.11998 8.59 2.62998 8.26 3.04998 7.92V13.01H1.29998C1.15998 13.01 1.04998 13.12 1.04998 13.26V14.76C1.04998 14.9 1.15998 15.01 1.29998 15.01H3.04998V18.01H2.29998C2.15998 18.01 2.04998 18.12 2.04998 18.26V19.76C2.04998 19.9 2.15998 20.01 2.29998 20.01H5.79998C5.93998 20.01 6.04998 19.9 6.04998 19.76V18.26C6.04998 18.12 5.93998 18.01 5.79998 18.01H5.04998V15.01H21.05V18.01H20.3C20.16 18.01 20.05 18.12 20.05 18.26V19.76C20.05 19.9 20.16 20.01 20.3 20.01H23.8C23.94 20.01 24.05 19.9 24.05 19.76V18.26C24.05 18.12 23.94 18.01 23.8 18.01H23.05V15.01H24.8C24.94 15.01 25.05 14.9 25.05 14.76V13.26C25.05 13.12 24.94 13.01 24.8 13.01V13ZM5.04998 13V7.32C5.78998 7.97 6.76998 8.62 8.04998 9.12V13H5.04998ZM9.04998 13V9.46C10.05 9.75 11.22 9.94 12.55 9.98V13H9.04998ZM13.55 13V9.98C14.88 9.94 16.05 9.75 17.05 9.46V13H13.55ZM18.05 13V9.12C19.33 8.62 20.31 7.96 21.05 7.32V13H18.05Z"
        fill={linearGradient ? `url(#${gradientId})` : 'currentColor'}
      />
    </SvgIcon>
  );
}
