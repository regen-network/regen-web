import React from 'react';

/** An SVG copy icon which takes React SVG props */
export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19 8v9H9.25a.25.25 0 0 1-.25-.25V3h5v4.25c0 .414.336.75.75.75H19Zm-4-4.586L18.287 7H15V3.414ZM3.25 5H7V1.25A.25.25 0 0 1 7.25 1h8.14c.07 0 .137.03.184.081l5.36 5.847a.25.25 0 0 1 .066.17V18.75a.25.25 0 0 1-.25.25H17v3.75a.25.25 0 0 1-.25.25H3.25a.25.25 0 0 1-.25-.25V5.25A.25.25 0 0 1 3.25 5ZM7 16.75V7H5v14h10v-2H7.25a.25.25 0 0 1-.25-.25v-2Z"
      clipRule="evenodd"
    />
  </svg>
);
