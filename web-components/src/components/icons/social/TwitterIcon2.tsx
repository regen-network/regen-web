import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function TwitterIcon2({ sx = [], ...props }: IconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.938 13.831c-.74.29-1.482.579-2.222.675.833-.482 1.389-1.253 1.667-2.217-.741.482-1.575.771-2.5.964C26.14 12.482 25.122 12 24.01 12c-2.13 0-3.889 1.831-3.889 4.048 0 .29 0 .675.093.964a10.92 10.92 0 0 1-8.057-4.24c-.37.577-.556 1.252-.556 2.023 0 1.446.648 2.603 1.76 3.374-.649 0-1.204-.193-1.76-.482v.096c0 1.928 1.297 3.566 3.149 3.952-.37.096-.648.096-1.019.096-.278 0-.463 0-.74-.096.462 1.639 1.944 2.795 3.61 2.795a7.583 7.583 0 0 1-4.815 1.735c-.277 0-.648 0-.926-.096C12.621 27.325 14.658 28 16.788 28c7.13 0 11.02-6.169 11.02-11.47v-.482c.926-.674 1.575-1.446 2.13-2.217Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
