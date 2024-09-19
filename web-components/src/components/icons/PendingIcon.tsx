import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function PendingIcon({
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
        d="M9.8125 1.78124C5.77437 1.78124 2.5 5.18156 2.5 9.375H0.0625L3.22312 12.6572L3.28 12.7753L6.5625 9.375H4.125C4.125 6.10968 6.66813 3.46874 9.8125 3.46874C12.9569 3.46874 15.5 6.10968 15.5 9.375C15.5 12.6403 12.9569 15.2813 9.8125 15.2813C8.24438 15.2813 6.8225 14.6147 5.79875 13.5431L4.645 14.7413C5.96937 16.1166 7.78937 16.9688 9.8125 16.9688C13.8506 16.9688 17.125 13.5684 17.125 9.375C17.125 5.18156 13.8506 1.78124 9.8125 1.78124ZM9 6L9 10.2188L12.4775 12.3619L13.0625 11.3409L10.2187 9.58594L10.2188 6H9Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
