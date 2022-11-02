import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function ErrorIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 20"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <path
        d="m 11.041576,2.529661 c 0.1924,-0.33333 0.6736,-0.33333 0.866,0 l 8.2273,14.25 c 0.1924,0.3333 -0.0482,0.75 -0.4331,0.75 H 3.2473363 c -0.3849,0 -0.62546,-0.4167 -0.43301,-0.75 z"
        id="path2"
        stroke="#202020"
      />
      <path
        d="m 10.982576,13.103661 -0.564,-5.784 h 2.232 l -0.576,5.784 z m -0.42,2.676 v -1.92 h 1.944 v 1.92 z"
        id="path4"
        fill="#202020"
      />
    </SvgIcon>
  );
}
