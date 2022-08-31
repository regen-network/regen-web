import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export function CreditBatchIcon({ sx, ...props }: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 22"
      sx={{ fill: 'none', ...sx }}
      {...props}
    >
      <mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={-1}
        y={-1}
        width={17}
        height={25}
      >
        <path d="M3-1h-4v25h17v-5H3V-1Z" fill="#D9D9D9" />
      </mask>
      <g mask="url(#a)">
        <path
          d="M14 9.727V21H1V4H8.672L14 9.727Z"
          stroke="currentColor"
          strokeWidth={2}
        />
      </g>
      <path
        d="M17 5.384V18H4V1h9.055L17 5.384Z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M12.5 0v5.25c0 .138.112.25.25.25H18" stroke="currentColor" />
      <circle cx={10.5} cy={11.5} r={4} stroke="currentColor" />
      <circle
        cx={10.5}
        cy={11.5}
        r={2.5}
        stroke="currentColor"
        strokeLinecap="round"
        strokeDasharray="0.1 2"
      />
    </SvgIcon>
  );
}
