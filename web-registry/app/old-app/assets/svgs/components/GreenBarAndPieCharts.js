import * as React from 'react';

const SvgGreenBarAndPieCharts = props => (
  <svg
    width={98}
    height={71}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="green-bar-and-pie-charts_svg__a" fill="#fff">
      <rect x={0.579} y={0.571} width={96.842} height={70.429} rx={2} />
    </mask>
    <rect
      x={0.579}
      y={0.571}
      width={96.842}
      height={70.429}
      rx={2}
      fill="#fff"
      stroke="#4FB573"
      strokeWidth={6}
      mask="url(#green-bar-and-pie-charts_svg__a)"
    />
    <path d="M3 16.762h92" stroke="#4FB573" strokeWidth={2} />
    <ellipse cx={9.226} cy={10.051} rx={2.19} ry={2.194} fill="#4FB573" />
    <ellipse cx={15.797} cy={10.051} rx={2.19} ry={2.194} fill="#4FB573" />
    <ellipse cx={22.368} cy={10.051} rx={2.19} ry={2.194} fill="#4FB573" />
    <path
      d="M12.684 33.762v22.667h33.088"
      stroke="#4FB573"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fill="#DCF0E3"
      stroke="#4FB573"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.526 43.476h4.842v12.952h-4.842zM27.21 40.238h4.842v16.191H27.21zM36.895 37h4.842v19.429h-4.842z"
    />
    <ellipse
      cx={69.176}
      cy={43.476}
      rx={15.333}
      ry={15.381}
      fill="#DCF0E3"
      stroke="#4FB573"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <mask
      id="green-bar-and-pie-charts_svg__b"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x={52}
      y={27}
      width={34}
      height={33}
    >
      <ellipse
        cx={69.176}
        cy={43.476}
        rx={15.333}
        ry={15.381}
        fill="#DCF0E3"
        stroke="#4FB573"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#green-bar-and-pie-charts_svg__b)">
      <path
        d="m68.772 44.286 17.35-13.762-15.332-6.881-2.018 20.643Z"
        fill="#fff"
        stroke="#4FB573"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </g>
    <mask
      id="green-bar-and-pie-charts_svg__c"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x={71}
      y={15}
      width={20}
      height={24}
    >
      <path
        d="m72.403 37.405 17.351-13.762-15.333-6.881-2.018 20.643Z"
        fill="#fff"
        stroke="#4FB573"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#green-bar-and-pie-charts_svg__c)">
      <ellipse cx={72.807} cy={36.595} rx={15.333} ry={15.381} fill="#FFC432" />
    </g>
  </svg>
);

export default SvgGreenBarAndPieCharts;
