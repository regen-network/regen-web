import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function ArrowRightIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 51 50"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <circle cx={25.5} cy={25} r={25} fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.75 27a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25H29.9l-5.223-5.223a.25.25 0 0 1 0-.354l1.06-1.06a.25.25 0 0 1 .354 0l7.465 7.465a.25.25 0 0 1 .074.182.25.25 0 0 1-.074.182l-7.465 7.465a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354L29.92 27H17.75Z"
        fill="#fff"
      />
    </SvgIcon>
  );
}
