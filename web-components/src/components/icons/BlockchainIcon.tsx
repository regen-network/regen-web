import React from 'react';

export const BlockchainIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <g clip-path="url(#clip0_4785_34949)">
        <path
          d="M12.5 5L19.4282 8.5V15.5L12.5 19L5.5718 15.5V8.5L12.5 5Z"
          stroke="#545555"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <path
          d="M12.5 1L22.8923 6.5V17.5L12.5 23L2.1077 17.5V6.5L12.5 1Z"
          stroke="#545555"
          stroke-linejoin="round"
          stroke-dasharray="2 2"
        />
        <line
          x1="12.5"
          y1="12"
          x2="12.5"
          y2="19"
          stroke="#545555"
          stroke-width="2"
        />
        <line
          x1="19.1003"
          y1="8.89404"
          x2="11.948"
          y2="12.4779"
          stroke="#545555"
          stroke-width="2"
        />
        <line
          y1="-1"
          x2="8"
          y2="-1"
          transform="matrix(0.894043 0.447982 0.447982 -0.894043 6.5 8)"
          stroke="#545555"
          stroke-width="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_4785_34949">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
