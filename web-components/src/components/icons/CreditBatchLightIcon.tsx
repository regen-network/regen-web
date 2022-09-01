import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export function CreditBatchLightIcon({ sx, ...props }: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 68 83"
      fill="none"
      sx={{ fill: 'none', ...sx }}
      {...props}
    >
      <mask id="path-1-inside-1_1571_58548" fill="#fff">
        <path
          fillRule="evenodd"
          d="M21.334 11.318H.25a.25.25 0 00-.25.25V82.75c0 .138.112.25.25.25h56.167a.25.25 0 00.25-.25V61.682H21.333V11.318z"
          clipRule="evenodd"
        ></path>
      </mask>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M21.334 11.318H.25a.25.25 0 00-.25.25V82.75c0 .138.112.25.25.25h56.167a.25.25 0 00.25-.25V61.682H21.333V11.318z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M21.334 11.318h4v-4h-4v4zm35.333 50.364h4v-4h-4v4zm-35.334 0h-4v4h4v-4zm-1.095-46.364h1.096v-8h-1.096v8zm-19.988 0h19.988v-8H.25v8zM4 11.568a3.75 3.75 0 01-3.75 3.75v-8A4.25 4.25 0 00-4 11.568h8zM4 82.75V11.568h-8V82.75h8zM.25 79A3.75 3.75 0 014 82.75h-8A4.25 4.25 0 00.25 87v-8zm56.167 0H.25v8h56.167v-8zm-3.75 3.75a3.75 3.75 0 013.75-3.75v8a4.25 4.25 0 004.25-4.25h-8zm0-21.068V82.75h8V61.682h-8zm4-4H21.333v8h35.334v-8zm-31.334 4V11.318h-8v50.364h8z"
        mask="url(#path-1-inside-1_1571_58548)"
      ></path>
      <path
        fill="#fff"
        stroke="currentColor"
        strokeWidth="4"
        d="M13.334 69.682V2H50.11L66 19.632v50.05H13.334z"
      ></path>
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M49 0v20.75c0 .138.112.25.25.25H68M55.666 43.386c0 8.823-7.162 15.978-16 15.978-8.837 0-16-7.155-16-15.978 0-8.822 7.163-15.977 16-15.977 8.838 0 16 7.155 16 15.977z"
      ></path>
      <ellipse
        cx="39.667"
        cy="43.386"
        stroke="currentColor"
        strokeDasharray="0.1 4"
        strokeLinecap="round"
        strokeWidth="2"
        rx="9.444"
        ry="9.432"
      ></ellipse>
    </SvgIcon>
  );
}
