import * as React from 'react';

const SvgGreenPermanence = props => (
  <svg
    width={53}
    height={70}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="green-permanence_svg__a" fill="#fff">
      <path d="M38.328 14.262a.25.25 0 0 1-.25.25H14.922a.25.25 0 0 1-.25-.25V3a3 3 0 0 1 3-3h17.656a3 3 0 0 1 3 3v11.262Z" />
    </mask>
    <path
      d="M38.328 14.262a.25.25 0 0 1-.25.25H14.922a.25.25 0 0 1-.25-.25V3a3 3 0 0 1 3-3h17.656a3 3 0 0 1 3 3v11.262Z"
      stroke="#4FB573"
      strokeWidth={6}
      mask="url(#green-permanence_svg__a)"
    />
    <mask id="green-permanence_svg__b" fill="#fff">
      <path d="M4.534 18.177a.25.25 0 0 1 .25-.25H49.06a.25.25 0 0 1 .25.25V67a3 3 0 0 1-3 3H7.534a3 3 0 0 1-3-3V18.177Z" />
    </mask>
    <path
      d="M4.534 18.177a.25.25 0 0 1 .25-.25H49.06a.25.25 0 0 1 .25.25V67a3 3 0 0 1-3 3H7.534a3 3 0 0 1-3-3V18.177Z"
      fill="#DCF0E3"
      stroke="#4FB573"
      strokeWidth={6}
      mask="url(#green-permanence_svg__b)"
    />
    <rect
      width={2.897}
      height={29.016}
      rx={0.25}
      transform="scale(.99479 1.00519) rotate(-45 49.616 -2.71)"
      fill="#4FB573"
    />
    <rect
      x={52.69}
      y={11.951}
      width={2.561}
      height={52.379}
      rx={0.25}
      transform="rotate(90 52.69 11.951)"
      fill="#4FB573"
    />
    <rect
      width={2.897}
      height={29.016}
      rx={0.25}
      transform="matrix(-.70342 -.71077 .70342 -.71077 18.4 55.092)"
      fill="#4FB573"
    />
  </svg>
);

export default SvgGreenPermanence;
