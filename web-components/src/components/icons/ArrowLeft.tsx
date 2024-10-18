import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  isDisabled: boolean;
}

export default function ArrowLeftIcon({
  sx = [],
  isDisabled,
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 50"
      sx={[
        { fill: 'none' },
        ...(Array.isArray(sx) ? sx : [sx]),
        { transform: 'rotate(180deg)' },
      ]}
      {...props}
    >
      <circle
        cx={25.5}
        cy={25}
        r={25}
        fill={isDisabled ? 'currentColor' : 'url(#paint0_linear_2124_4005)'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.75 27a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25H29.9l-5.223-5.223a.25.25 0 0 1 0-.354l1.06-1.06a.25.25 0 0 1 .354 0l7.465 7.465a.25.25 0 0 1 .074.182.25.25 0 0 1-.074.182l-7.465 7.465a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354L29.92 27H17.75Z"
        fill="#fff"
      />
      <linearGradient
        id="paint0_linear_2124_4005"
        x1="40.4762"
        y1="9.04192e-07"
        x2="15.3347"
        y2="55.4228"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="rgba(var(--sc-icon-credibility-100-blue-green-gradient-600) / 1)" />
        <stop
          offset="0.5"
          stopColor="rgba(var(--sc-icon-credibility-100-blue-green-gradient-500) / 1)"
        />
        <stop
          offset="1"
          stopColor="rgba(var(--sc-icon-credibility-100-blue-green-gradient-400) / 1)"
        />
      </linearGradient>
    </SvgIcon>
  );
}
