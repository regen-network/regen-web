import * as React from 'react';

const SvgSell = props => (
  <svg
    width={18}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.632 16.617 2.492-2.401c.331-.32.773-.506 1.242-.506h4.347c.5 0 .77.379.77.746 0 .342-.19.772-.77.772H9.35c-.358 0-.634.267-.634.613s.276.612.634.612h3.121l3.132-3.216a.96.96 0 0 1 1.263 0c.54.473.36 1.054.18 1.23l-3.06 3.248a1.656 1.656 0 0 1-1.27.613H8.301L6.78 19.799"
      stroke="#4FB573"
      strokeMiterlimit={10}
      strokeLinejoin="round"
    />
    <path
      d="m5.523 21.74-4.255-4.137 1.759-1.71 4.255 4.137-1.759 1.71Z"
      stroke="#4FB573"
      strokeMiterlimit={10}
      strokeLinejoin="round"
    />
    <circle cx={9} cy={6} r={5} stroke="#4FB573" strokeWidth={2} />
    <circle
      cx={9}
      cy={6}
      r={3}
      stroke="#4FB573"
      strokeLinecap="round"
      strokeDasharray="0.1 2"
    />
  </svg>
);

export default SvgSell;
