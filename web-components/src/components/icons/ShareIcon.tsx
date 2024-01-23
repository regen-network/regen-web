import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { sxToArray } from '../../utils/mui/sxToArray';

interface ShareIconProps extends SvgIconProps {}

export default function ShareIcon({
  sx,
  ...props
}: ShareIconProps): JSX.Element {
  // TODO: review implementation, looks like default color was supposed to be used but it's being ignored
  const defaultColor = '#4FB573';
  return (
    <SvgIcon
      sx={[...sxToArray({ ...{ color: defaultColor }, ...sx })]}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#shareIconClipPath)">
        <g filter="url(#shareIconFilter)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 4C21 2.34315 19.6569 1 18 1C16.3431 1 15 2.34315 15 4C15 4.13134 15.0084 4.26071 15.0248 4.38759L6.41901 9.35616C5.99653 9.12892 5.51332 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15C5.56138 15 6.08675 14.8458 6.53606 14.5775L15.0433 19.4891C15.0148 19.6552 15 19.8258 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17C17.2421 17 16.5498 17.2811 16.0217 17.7446L7.82495 13.0122C7.93827 12.696 8 12.3552 8 12C8 11.6033 7.923 11.2246 7.78313 10.878L15.9319 6.17327C16.4701 6.68555 17.1983 7 18 7C19.6569 7 21 5.65685 21 4Z"
            fill={props.color ?? 'white'}
          />
        </g>
      </g>
      <defs>
        <filter
          id="shareIconFilter"
          x="-18"
          y="-19"
          width="59"
          height="62"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_251_24054"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_251_24054"
            result="shape"
          />
        </filter>
        <clipPath id="shareIconClipPath">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
