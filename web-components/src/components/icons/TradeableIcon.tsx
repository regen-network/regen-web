import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function TradeableIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.097 5.57a.25.25 0 0 1 .25.25v1a.25.25 0 0 1-.25.25h-9.05L6.45 8.473a.25.25 0 0 1 0 .354l-.707.707a.25.25 0 0 1-.354 0L2.354 6.498a.249.249 0 0 1-.058-.092.25.25 0 0 1 .053-.274l3.033-3.033a.25.25 0 0 1 .353 0l.708.707a.25.25 0 0 1 0 .354l-1.41 1.41h9.064ZM3.25 13.063a.25.25 0 0 1-.25-.25v-1a.25.25 0 0 1 .25-.25h9.05l-1.403-1.403a.25.25 0 0 1 0-.354l.707-.707a.25.25 0 0 1 .354 0l3.035 3.035a.248.248 0 0 1 .059.093.25.25 0 0 1-.054.274l-3.033 3.033a.25.25 0 0 1-.353 0l-.707-.707a.25.25 0 0 1 0-.354l1.41-1.41H3.25Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
