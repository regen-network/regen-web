import { SxProps, Theme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface CreditsIconProps {
  fontSize?: SvgIconProps['fontSize'];
  sx?: SxProps<Theme>;
}

export default function CreditsIcon({
  fontSize = 'inherit',
  sx,
}: CreditsIconProps): JSX.Element {
  return (
    <SvgIcon fontSize={fontSize} viewBox="0 0 25 23" sx={sx}>
      <svg
        width="25"
        height="23"
        viewBox="0 0 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.50002 6L1.5 17.8678C1.5 19.9389 4.38835 21.6178 7.9513 21.6178C9.2623 21.6178 11 21.5 12 20.5"
          stroke="#7BC796"
          strokeWidth="2"
        />
        <path
          d="M1.56543 14.6414C1.70117 16.8463 4.78038 18.451 8.44305 18.2255C8.90671 18.197 9.3575 18.1405 9.79097 18.0591"
          stroke="#7BC796"
        />
        <path
          d="M1.56543 12C1.70117 14.205 4.78038 15.8097 8.44305 15.5842C8.90671 15.5556 9.3575 15.4991 9.79097 15.4177"
          stroke="#7BC796"
        />
        <path
          d="M1.56543 9.49146C1.70117 11.6964 4.78038 13.3011 8.44305 13.0756C8.90671 13.0471 9.3575 12.9906 9.79097 12.9092"
          stroke="#7BC796"
        />
        <ellipse
          cx="8"
          cy="6"
          rx="6.5"
          ry="4"
          stroke="#7BC796"
          strokeWidth="2"
        />
        <circle cx="16.5" cy="15" r="7" stroke="#7BC796" strokeWidth="2" />
      </svg>
    </SvgIcon>
  );
}
