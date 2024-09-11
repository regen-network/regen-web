import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function CreditCardIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      data-testid="CreditCardIcon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 29 16"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <g id="icon/card">
        <path
          id="Vector"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16 4H0V3.25C0 2.56 0.448 2 1 2H15C15.552 2 16 2.56 16 3.25V4ZM16 6.5V13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13V6.5H16ZM4 10C3.73478 10 3.48043 10.1054 3.29289 10.2929C3.10536 10.4804 3 10.7348 3 11C3 11.2652 3.10536 11.5196 3.29289 11.7071C3.48043 11.8946 3.73478 12 4 12H5C5.26522 12 5.51957 11.8946 5.70711 11.7071C5.89464 11.5196 6 11.2652 6 11C6 10.7348 5.89464 10.4804 5.70711 10.2929C5.51957 10.1054 5.26522 10 5 10H4Z"
          fill="#4FB573"
        />
      </g>
    </SvgIcon>
  );
}
