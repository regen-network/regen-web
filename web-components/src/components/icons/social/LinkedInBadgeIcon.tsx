import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function LinkedInBadgeIcon({
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
      <circle cx={25.5} cy={25} r={25} fill="#C2E1FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.059 20.64H14.94V36h5.118V20.64Zm.441-4.847c0-1.56-1.323-2.793-3-2.793-1.588 0-2.912 1.232-3 2.793 0 1.56 1.323 2.793 3 2.793s3-1.232 3-2.793Zm6.64 4.542H22.5V36h4.807v-7.79c0-2.011.414-4.021 2.9-4.021 2.486 0 2.486 2.345 2.486 4.188V36H37.5v-8.544c0-4.189-.912-7.456-5.801-7.456-2.32 0-3.895 1.256-4.558 2.513v-2.178Z"
        fill="#0A66C2"
      />
    </SvgIcon>
  );
}
