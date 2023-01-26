import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function TwitterBadgeIcon({
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
      <circle cx={25.5} cy={25} r={25} fill="#D7F0FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.923 17.29c-.926.36-1.852.722-2.778.843 1.042-.603 1.736-1.567 2.083-2.772-.926.603-1.967.964-3.125 1.205-.926-.964-2.2-1.566-3.588-1.566-2.663 0-4.862 2.29-4.862 5.06 0 .362 0 .844.116 1.205-4.052-.24-7.64-2.169-10.071-5.301-.463.723-.695 1.566-.695 2.53 0 1.807.81 3.253 2.2 4.217-.81 0-1.505-.241-2.2-.603v.12c0 2.41 1.62 4.459 3.936 4.94-.463.121-.81.121-1.274.121-.347 0-.578 0-.926-.12.58 2.048 2.431 3.494 4.515 3.494-1.62 1.325-3.704 2.168-6.02 2.168-.347 0-.81 0-1.157-.12 2.2 1.446 4.746 2.289 7.408 2.289 8.914 0 13.776-7.71 13.776-14.337v-.603c1.157-.843 1.967-1.807 2.662-2.77Z"
        fill="#1DA1F2"
      />
    </SvgIcon>
  );
}
