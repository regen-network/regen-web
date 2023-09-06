import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { sxToArray } from '../../utils/mui/sxToArray';

interface LocationSearchIconProps extends SvgIconProps {}

export default function LocationSearchIcon({
  sx,
  ...props
}: LocationSearchIconProps): JSX.Element {
  return (
    <SvgIcon
      sx={[...sxToArray(sx)]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.2004 20.9914L19.1469 20.1162C19.5524 19.7413 19.5888 19.0981 19.2283 18.6798L14.5274 13.2242C14.1668 12.8058 13.5459 12.7706 13.1404 13.1456L12.1939 14.0208C11.7884 14.3957 11.7519 15.0389 12.1124 15.4572L16.8134 20.9128C17.1739 21.3312 17.7949 21.3664 18.2004 20.9914Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-miterlimit="10"
      />
      <path
        d="M16.6451 9.01416C16.8896 4.52963 13.5595 0.784135 9.27164 0.464333C4.90427 0.226178 1.24649 3.65585 0.922682 8.05897C0.678172 12.5435 4.00827 16.289 8.29611 16.6088C12.6635 16.847 16.4006 13.4987 16.6451 9.01416ZM8.53903 13.2657C5.99804 13.1064 4.17462 10.9077 4.25757 8.38017C4.42004 5.77096 6.56704 3.72954 9.10803 3.88885C11.649 4.04817 13.4724 6.2468 13.3895 8.77437C13.227 11.3836 11.0007 13.3436 8.53903 13.2657Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
