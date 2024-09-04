import React from 'react';

const SaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
    <path
      d="M1.28217 1L10.8146 0.999999L12.6455 2.88025L13.8881 4.15644V14H1.28217L1.28217 1Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <mask id="path-2-inside-1_7504_227896" fill="currentColor">
      <rect x="2.71649" y="2.5" width="7.30298" height="2.5" rx="0.25" />
    </mask>
    <rect
      x="2.71649"
      y="2.5"
      width="7.30298"
      height="2.5"
      rx="0.25"
      stroke="currentColor"
      strokeWidth="2"
      mask="url(#path-2-inside-1_7504_227896)"
    />
    <ellipse cx="7.58514" cy="10" rx="2.43433" ry="2.5" fill="currentColor" />
  </svg>
);

export { SaveIcon };
