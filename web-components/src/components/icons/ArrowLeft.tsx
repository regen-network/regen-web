import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function ArrowLeftIcon({
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
        <circle r={25} transform="matrix(-1 0 0 1 25 25)" fill="#D2D5D9" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.75 27a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25H20.6l5.223-5.223a.25.25 0 0 0 0-.354l-1.06-1.06a.25.25 0 0 0-.354 0l-7.465 7.465a.25.25 0 0 0-.073.182.25.25 0 0 0 .073.182l7.465 7.465a.25.25 0 0 0 .354 0l1.06-1.06a.25.25 0 0 0 0-.354L20.58 27h12.17Z"
          fill="#EFEFEF"
        />
      </svg>
    </SvgIcon>
  );
}
