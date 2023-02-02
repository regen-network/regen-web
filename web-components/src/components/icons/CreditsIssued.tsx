import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function CreditsIssuedIcon({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 31"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <circle cx={15} cy={15.5} r={15} fill="#EFEFEF" />
      <g clipPath="url(#a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 23.25a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25V11.1l-5.223 5.223a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354l7.465-7.465a.25.25 0 0 1 .182-.074.25.25 0 0 1 .182.074l7.465 7.465a.25.25 0 0 1 0 .354l-1.06 1.06a.25.25 0 0 1-.354 0L16 11.08v12.17Z"
          fill="#7BC796"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(3 3.5)" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}
