import SvgIcon from '@mui/material/SvgIcon';

import { sxToArray } from '../../utils/mui/sxToArray';
import { SvgLinearGradientProps } from './ProjectPageIcon';

export default function EditIcon({
  sx,
  linearGradient,
  disabled,
  color,
  ...props
}: SvgLinearGradientProps): JSX.Element {
  const gradientId = color ? `linear_edit_icon-${color}` : 'linear_edit_icon';
  return (
    <SvgIcon
      sx={[{ color: disabled ? color : '#4FB573' }, ...sxToArray(sx)]}
      width="13"
      height="13"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.0732 17.5334C3.02632 17.5803 2.99998 17.6439 2.99998 17.7102L2.99997 20.7496C2.99997 20.8878 3.11214 20.9998 3.25036 20.9996L6.28476 20.9949C6.35093 20.9948 6.41436 20.9684 6.46115 20.9217L18.1914 9.19143L14.8033 5.80332L3.0732 17.5334ZM15.5104 5.09621L18.8985 8.48432L20.6757 6.70712C21.0662 6.3166 21.0662 5.68343 20.6757 5.29291L18.7018 3.31902C18.3113 2.92849 17.6781 2.92849 17.2876 3.31902L15.5104 5.09621Z"
        fill={linearGradient ? `url(#${gradientId})` : 'currentColor'}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="11.9843"
          y1="3.02612"
          x2="4.79348"
          y2="20.9983"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0.00458717"
            stopColor={disabled && color ? color : '#7BC796'}
          />
          <stop
            offset="1"
            stopColor={disabled && color ? '#EFEFEF' : '#C5E6D1'}
          />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}
