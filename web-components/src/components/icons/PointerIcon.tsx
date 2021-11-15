import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
// import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

export default function PointerIcon(): JSX.Element {
  return (
    <SvgIcon fontSize="large" viewBox="0 0 70 43">
      <svg
        width="70"
        height="43"
        viewBox="0 0 70 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="70"
          height="43"
        >
          <rect
            width="70"
            height="43"
            transform="matrix(1 0 0 -1 0 43)"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask0)">
          <g filter="url(#filter0_d)">
            <path
              d="M39.2739 19.9606C37.3269 23.1674 32.6731 23.1674 30.7261 19.9606L18 -0.999998L35 -0.999997L52 -0.999995L39.2739 19.9606Z"
              fill="white"
            />
            <path
              d="M31.1535 19.7011L18.8885 -0.499999L35 -0.499998L51.1115 -0.499996L38.8465 19.7011C37.0943 22.5872 32.9057 22.5872 31.1535 19.7011Z"
              stroke="#D2D5D9"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="8"
            y="-7"
            width="54"
            height="43.3657"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="5" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
}
