import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {
  disabled?: boolean;
  useGradient?: boolean;
}

export default function ArrowSkipRightIcon({
  disabled,
  useGradient = true,
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
      <circle
        r={24}
        transform="matrix(-1 0 0 1 25.5 25)"
        fill="#fff"
        stroke={'url(#skipRight)'}
        strokeWidth={2}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.37 25.27a.25.25 0 0 1 .25-.25h12.17l-5.243-5.243a.25.25 0 0 1 0-.354l1.061-1.06a.25.25 0 0 1 .354 0l7.465 7.465a.25.25 0 0 1 .073.182.25.25 0 0 1-.073.182l-7.465 7.465a.25.25 0 0 1-.354 0l-1.06-1.06a.25.25 0 0 1 0-.354l5.223-5.223H15.62a.25.25 0 0 1-.25-.25v-1.5ZM33.75 34a.25.25 0 0 1-.25-.25v-15.5a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v15.5a.25.25 0 0 1-.25.25h-1.5Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="skipRight"
          x1={40.476}
          y1={0}
          x2={15.335}
          y2={55.423}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor={
              disabled || !useGradient
                ? 'currentColor'
                : 'rgba(var(--sc-tag-prefinance-600) / 1)'
            }
          />
          <stop
            offset={0.5}
            stopColor={
              disabled || !useGradient
                ? 'currentColor'
                : 'rgba(var(--sc-tag-prefinance-500) / 1)'
            }
          />
          <stop
            offset={1}
            stopColor={
              disabled || !useGradient
                ? 'currentColor'
                : 'rgba(var(--sc-tag-prefinance-400) / 1)'
            }
          />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}
