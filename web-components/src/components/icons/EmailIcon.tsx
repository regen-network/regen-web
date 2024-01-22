import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="20" height="15" fill="none" {...props}>
    <rect
        x="1"
        y="1"
        width="18"
        height="13"
        rx="2"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="1"
        y="1.81213"
        width="1"
        height="11.4518"
        rx="0.25"
        transform="rotate(-54.3024 1 1.81213)"
        fill="currentColor"
      />
      <rect
        width="1"
        height="11.4546"
        rx="0.25"
        transform="matrix(-0.583508 -0.812108 -0.812108 0.583508 19.5167 1.81213)"
        fill="currentColor"
      />
  </svg>
);
// function EmailIcon({
//   className,
// }: SvgIconProps): JSX.Element {
//   return (
//     <SvgIcon
//       viewBox="0 0 20 15"
//       className={className}
//     >
//       <rect
//         x="1"
//         y="1"
//         width="18"
//         height="13"
//         rx="2"
//         fill="transparent"
//         stroke="currentColor"
//         strokeWidth="2"
//       />
//       <rect
//         x="1"
//         y="1.81213"
//         width="1"
//         height="11.4518"
//         rx="0.25"
//         transform="rotate(-54.3024 1 1.81213)"
//         fill="currentColor"
//       />
//       <rect
//         width="1"
//         height="11.4546"
//         rx="0.25"
//         transform="matrix(-0.583508 -0.812108 -0.812108 0.583508 19.5167 1.81213)"
//         fill="currentColor"
//       />
//     </SvgIcon>
//   );
// }

export default EmailIcon;
