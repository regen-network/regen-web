import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function CreditsTradeableIcon({
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
      <circle cx={15.67} cy={15.5} r={15} fill="#EFEFEF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.406 10.94a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-12.15l1.93 1.93a.25.25 0 0 1 0 .353l-1.06 1.06a.25.25 0 0 1-.354 0L7.606 12.12a.248.248 0 0 1-.06-.095.25.25 0 0 1 .053-.276l4.162-4.161a.25.25 0 0 1 .353 0l1.06 1.06a.25.25 0 0 1 0 .354l-1.939 1.94h12.17ZM8.777 20.93a.25.25 0 0 1-.25-.25v-1.5a.25.25 0 0 1 .25-.25h12.15L18.997 17a.25.25 0 0 1 0-.353l1.061-1.06a.25.25 0 0 1 .354 0l4.165 4.164a.25.25 0 0 1 .06.095.25.25 0 0 1-.053.276l-4.162 4.162a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354l1.94-1.94H8.777Z"
        fill="#7BC796"
      />
    </SvgIcon>
  );
}
