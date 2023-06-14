import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { sxToArray } from '../../utils/mui/sxToArray';

interface IconProps extends SvgIconProps {}

export default function UserMenuIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      sx={[{ fill: 'none' }, ...sxToArray(sx)]}
      {...props}
    >
      <circle
        cx="12.5"
        cy="12.5"
        r="11.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.2083 9.37502C17.2083 11.9754 15.1003 14.0834 12.5 14.0834C9.89965 14.0834 7.79166 11.9754 7.79166 9.37502C7.79166 6.77468 9.89965 4.66669 12.5 4.66669C15.1003 4.66669 17.2083 6.77468 17.2083 9.37502Z"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.91647 21.587C4.79687 17.2447 8.30558 14 12.5 14C16.6944 14 20.2031 17.2447 21.0835 21.5871C20.8013 21.8537 20.5068 22.1073 20.2008 22.3469C19.6062 18.1158 16.3114 15 12.5 15C8.68849 15 5.39375 18.1158 4.79914 22.3469C4.49314 22.1072 4.1986 21.8536 3.91647 21.587Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
