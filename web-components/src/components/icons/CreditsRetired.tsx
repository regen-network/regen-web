import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function CreditsRetiredIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 31 31"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <circle cx={15.34} cy={15.5} r={15} fill="#EFEFEF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.34 7.75a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25V19.9l5.223-5.223a.25.25 0 0 1 .354 0l1.06 1.06a.25.25 0 0 1 0 .354l-7.465 7.465a.25.25 0 0 1-.182.073.25.25 0 0 1-.182-.073l-7.465-7.465a.25.25 0 0 1 0-.354l1.06-1.06a.25.25 0 0 1 .354 0l5.243 5.243V7.75Z"
        fill="#E6735C"
      />{' '}
    </SvgIcon>
  );
}
