import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

interface IconProps {
  className?: string;
}

export default function SoilSampleIcon({ className }: IconProps): JSX.Element {
  return (
    <SvgIcon
      className={className}
      width="59"
      height="94"
      viewBox="0 0 59 94"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 38L41 38"
        stroke="#4FB573"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16.7692 51.3043V38H34.4923V51.3043L50 92H2L16.7692 51.3043Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M2 92L10.8889 69.8846C10.8889 69.8846 16.2222 71.6539 21.5556 71.6539C26.8889 71.6539 27.7778 69 33.1111 69C38.4444 69 41.1111 69.8846 41.1111 69.8846L50 92H2Z"
        fill="#B9E1C7"
        stroke="#4FB573"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="34.5" cy="78.5" r="2.5" fill="#4FB573" />
      <circle cx="17.5" cy="79.5" r="2.5" fill="#4FB573" />
      <circle cx="27.5" cy="84.5" r="2.5" fill="#4FB573" />
      <path
        d="M29.8153 28.8356C34.2113 33.2317 42.0088 32.2726 46.1828 28.0986C51.0998 23.1816 51.7948 12.9127 50.8644 7.96415C50.8469 7.87092 50.7799 7.7999 50.6881 7.77612C45.2785 6.37512 35.474 7.54633 30.5523 12.4681C25.5855 17.4349 25.4192 24.4395 29.8153 28.8356Z"
        fill="#DCF0E3"
        stroke="#4FB573"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M39.8696 16.7693L48.9491 21.0204"
        stroke="#4FB573"
        strokeWidth="2"
      />
      <path
        d="M40.5949 17.517L37.6305 9.70172"
        stroke="#4FB573"
        strokeWidth="2"
      />
      <path
        d="M34.534 22.8671L45.7153 27.4882"
        stroke="#4FB573"
        strokeWidth="2"
      />
      <path
        d="M34.9356 23.1763L31.1627 12.9356"
        stroke="#4FB573"
        strokeWidth="2"
      />
      <path
        d="M50.5 8C50.5 8 38.5 14.5 31 30C23.5 45.5 24.5 71 24.5 71"
        stroke="#4FB573"
        strokeWidth="2"
        fill="none"
      />
    </SvgIcon>
  );
}
