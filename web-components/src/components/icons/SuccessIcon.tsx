import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function SuccessIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9832 4.97886C17.8856 4.88123 17.7273 4.88123 17.6297 4.97886L8.10022 14.5083L2.93533 9.34344C2.8377 9.24581 2.67941 9.24581 2.58178 9.34344L1.75682 10.1684C1.65919 10.266 1.65919 10.4243 1.75682 10.522L7.91904 16.6842C7.96897 16.7341 8.03478 16.7585 8.10022 16.7574C8.16566 16.7585 8.23147 16.7341 8.28141 16.6842L18.8082 6.15737C18.9058 6.05974 18.9058 5.90145 18.8082 5.80382L17.9832 4.97886Z"
        fill={'currentColor' || '#202020'}
      />
    </SvgIcon>
  );
}
