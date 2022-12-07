import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function ArrowSkipLeftIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          cx={25}
          cy={25}
          r={24}
          fill="#fff"
          stroke="#D2D5D9"
          strokeWidth={2}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.13 25.27a.25.25 0 0 0-.25-.25H22.71l5.243-5.243a.25.25 0 0 0 0-.354l-1.061-1.06a.25.25 0 0 0-.354 0l-7.465 7.465a.25.25 0 0 0-.073.182.25.25 0 0 0 .073.182l7.465 7.465a.25.25 0 0 0 .354 0l1.06-1.06a.25.25 0 0 0 0-.354L22.73 27.02h12.15a.25.25 0 0 0 .25-.25v-1.5ZM16.75 34a.25.25 0 0 0 .25-.25v-15.5a.25.25 0 0 0-.25-.25h-1.5a.25.25 0 0 0-.25.25v15.5c0 .138.112.25.25.25h1.5Z"
          fill="#D2D5D9"
        />
      </svg>
    </SvgIcon>
  );
}
