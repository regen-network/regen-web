import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function WalletErrorIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 222 200"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <circle cx={99} cy={103} r={97} fill="#D2D5D9" />
      <mask id="wallet-error-mask" fill="#fff">
        <rect x={17} y={38} width={164} height={133} rx={2} />
      </mask>
      <rect
        x={17}
        y={38}
        width={164}
        height={133}
        rx={2}
        fill="#fff"
        stroke="#8F8F8F"
        strokeWidth={6}
        mask="url(#wallet-error-mask)"
      />
      <path d="M19 69h162" stroke="#8F8F8F" strokeWidth={3} />
      <rect
        x={73}
        y={137}
        width={6}
        height={52}
        rx={0.25}
        transform="rotate(-90 73 137)"
        fill="#8F8F8F"
      />
      <circle cx={31} cy={55} r={3} fill="#8F8F8F" />
      <circle cx={65.5} cy={98.5} r={4.5} fill="#8F8F8F" />
      <circle cx={129.5} cy={98.5} r={4.5} fill="#8F8F8F" />
      <circle cx={43} cy={55} r={3} fill="#8F8F8F" />
      <circle cx={55} cy={55} r={3} fill="#8F8F8F" />
      <rect
        x={200}
        y={44}
        width={6}
        height={22}
        rx={0.25}
        transform="rotate(-90 200 44)"
        fill="#8F8F8F"
      />
      <rect
        x={187}
        y={22}
        width={6}
        height={22}
        rx={0.25}
        transform="rotate(180 187 22)"
        fill="#8F8F8F"
      />
      <rect
        x={200.243}
        y={28.377}
        width={6}
        height={22.818}
        rx={0.25}
        transform="rotate(-135 200.243 28.377)"
        fill="#8F8F8F"
      />
    </SvgIcon>
  );
}
