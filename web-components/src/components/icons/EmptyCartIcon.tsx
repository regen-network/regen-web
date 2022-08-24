import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function EmptyCartIcon({ ...props }: IconProps): JSX.Element {
  return (
    <SvgIcon
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 98 84"
      {...props}
    >
      <path
        d="M17.5 17.5h54.753a1 1 0 0 1 .977 1.217l-6.556 29.5a1 1 0 0 1-.976.783H25.302a1 1 0 0 1-.976-.783L17.5 17.5Z"
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        d="M5 3h7.915a1 1 0 0 1 .974.774l10.178 43.939a1 1 0 0 1-.127.757l-7.528 11.998A1 1 0 0 0 17.26 62H59"
        stroke="currentColor"
        strokeWidth={4}
      />
      <rect
        x={3}
        y={5}
        width={4}
        height={10}
        rx={0.25}
        transform="rotate(-90 3 5)"
        fill="currentColor"
      />
      <rect
        x={50}
        y={64}
        width={4}
        height={14}
        rx={0.25}
        transform="rotate(-90 50 64)"
        fill="currentColor"
      />
      <circle cx={21} cy={75} r={4.5} stroke="currentColor" strokeWidth={2} />
      <circle cx={59.5} cy={75} r={4.5} stroke="currentColor" strokeWidth={2} />
      <circle
        r={22.838}
        transform="scale(1.013 .98682) rotate(-45 102.52 -57.657)"
        fill="#fff"
      />
      <rect
        x={-1.414}
        width={17.428}
        height={1.974}
        rx={0.987}
        transform="scale(-1.013 .98682) rotate(-45 47.133 153.207)"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.974}
      />
      <circle
        r={15.523}
        transform="scale(1.013 .98682) rotate(-45 102.52 -57.657)"
        fill="#fff"
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        transform="matrix(-.7163 .69779 -.7163 -.69779 83.379 46.712)"
        fill="currentColor"
        stroke="currentColor"
        d="M-.716 0h30.125v2.949H-.716z"
      />
    </SvgIcon>
  );
}
