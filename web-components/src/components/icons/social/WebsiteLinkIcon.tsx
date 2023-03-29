import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function WebsiteLinkIcon({ sx = [], ...props }: IconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <rect
        x={2.121}
        width={13.622}
        height={9}
        rx={4.5}
        transform="scale(1 -1) rotate(-45 -12.02 -14.909)"
        stroke="currentColor"
        strokeWidth={3}
      />
      <rect
        x={2.121}
        width={13.622}
        height={9}
        rx={4.5}
        transform="scale(1 -1) rotate(-45 -17.31 -27.677)"
        stroke="currentColor"
        strokeWidth={3}
      />
    </SvgIcon>
  );
}
