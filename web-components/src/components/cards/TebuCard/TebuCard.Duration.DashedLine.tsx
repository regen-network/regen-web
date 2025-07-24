import React from 'react';

export interface DashProps {
  style?: React.CSSProperties;
  className?: string;
  height: number;
}

const DashedLine: React.FC<DashProps> = ({ style, className, height }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2"
    height={height}
    viewBox={`0 0 2 ${height}`}
    fill="none"
    className={className}
    style={style}
  >
    <path
      d="M1 0L0.999999 26"
      strokeDasharray="4 4"
      style={{
        stroke: 'rgba(var(--ac-neutral-500) / 1)',
      }}
    />
  </svg>
);

export default DashedLine;
