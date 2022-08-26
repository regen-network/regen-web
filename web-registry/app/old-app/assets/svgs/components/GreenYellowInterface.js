import * as React from 'react';

const SvgGreenYellowInterface = props => (
  <svg
    width={104}
    height={75}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="green-yellow-interface_svg__a" fill="#fff">
      <rect x={0.421} y={0.363} width={103.158} height={74.571} rx={2} />
    </mask>
    <rect
      x={0.421}
      y={0.363}
      width={103.158}
      height={74.571}
      rx={2}
      fill="#fff"
      stroke="#4FB573"
      strokeWidth={6}
      mask="url(#green-yellow-interface_svg__a)"
    />
    <path d="M3 17.506h98" stroke="#4FB573" strokeWidth={2} />
    <ellipse cx={9.631} cy={10.4} rx={2.333} ry={2.323} fill="#4FB573" />
    <ellipse cx={16.631} cy={10.4} rx={2.333} ry={2.323} fill="#4FB573" />
    <ellipse cx={23.631} cy={10.4} rx={2.333} ry={2.323} fill="#4FB573" />
    <path
      d="M19.333 26.077h35.246M19.333 45.792h35.246"
      stroke="#FFC432"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      stroke="#4FB573"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.333 38.077v-7.714h65.333v7.714zM19.333 57.792v-7.714H50.28v7.714zM53.72 57.791v-7.714h30.947v7.714z"
    />
    <path
      fill="#4FB573"
      stroke="#4FB573"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M68.333 73.22v-7.714h16.333v7.714z"
    />
  </svg>
);

export default SvgGreenYellowInterface;
