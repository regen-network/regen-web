import * as React from 'react';

const SvgGreenReversal = props => (
  <svg
    width={63}
    height={63}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M31.5 61C47.792 61 61 47.792 61 31.5S47.792 2 31.5 2 2 15.208 2 31.5 15.208 61 31.5 61Z"
      fill="#DCF0E3"
      stroke="#4FB573"
      strokeWidth={3}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x={39} y={23} width={3} height={25} rx={0.25} fill="#4FB573" />
    <rect x={18} y={21} width={3} height={21} rx={0.25} fill="#4FB573" />
    <rect
      width={3.123}
      height={13.927}
      rx={0.25}
      transform="scale(.9607 1.0378) rotate(45 -19.955 78.616)"
      fill="#4FB573"
    />
    <rect
      width={3.117}
      height={13.938}
      rx={0.25}
      transform="scale(.96071 1.0378) rotate(-45 63.62 -19.281)"
      fill="#4FB573"
    />
    <path
      d="M40.5 27.333V19a5 5 0 0 0-5-5h-11a5 5 0 0 0-5 5v15"
      stroke="#4FB573"
      strokeWidth={3}
    />
  </svg>
);

export default SvgGreenReversal;
