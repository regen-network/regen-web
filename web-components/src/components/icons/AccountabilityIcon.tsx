import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import withHoverColor, { Props } from './withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: 'white',
  },
}));

function AccountabilityIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d="M56.7362 61.7132H12.8512C11.7452 61.7132 10.8762 60.8442 10.8762 59.7382V42.832"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M41.6865 9.88864H60.7257C61.8317 9.88864 62.7007 10.7577 62.7007 11.8637V57.5657"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <rect
        x="42.9619"
        y="38.2025"
        width="12.5539"
        height="6.73077"
        transform="rotate(45 42.9619 38.2025)"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M24.7408 47.1376C37.1102 47.1376 47.1376 37.1102 47.1376 24.7408C47.1376 12.3714 37.1102 2.34406 24.7408 2.34406C12.3714 2.34406 2.34406 12.3714 2.34406 24.7408C2.34406 37.1102 12.3714 47.1376 24.7408 47.1376Z"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <path
        d="M24.7408 41.2915C33.8815 41.2915 41.2915 33.8815 41.2915 24.7408C41.2915 15.6001 33.8815 8.19012 24.7408 8.19012C15.6001 8.19012 8.19012 15.6001 8.19012 24.7408C8.19012 33.8815 15.6001 41.2915 24.7408 41.2915Z"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <mask
        id="path-6-outside-1"
        maskUnits="userSpaceOnUse"
        x="12.4231"
        y="17.2308"
        width="25"
        height="16"
        fill="black"
      >
        <rect fill="white" x="12.4231" y="17.2308" width="25" height="16" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4231 25C16.6275 21.532 20.5038 19.2308 24.9175 19.2308C29.3312 19.2308 33.2074 21.532 35.4119 25C33.2074 28.4681 29.3312 30.7692 24.9175 30.7692C20.5038 30.7692 16.6275 28.4681 14.4231 25Z"
        />
      </mask>
      <path
        d="M14.4231 25L12.7352 23.9271C12.319 24.5818 12.319 25.4182 12.7352 26.0729L14.4231 25ZM35.4119 25L37.0997 26.0729C37.5159 25.4182 37.5159 24.5818 37.0997 23.9271L35.4119 25ZM16.1109 26.0729C17.9639 23.1579 21.2163 21.2308 24.9175 21.2308V17.2308C19.7912 17.2308 15.2912 19.906 12.7352 23.9271L16.1109 26.0729ZM24.9175 21.2308C28.6186 21.2308 31.8711 23.1579 33.724 26.0729L37.0997 23.9271C34.5438 19.9061 30.0437 17.2308 24.9175 17.2308V21.2308ZM33.724 23.9271C31.8711 26.8421 28.6186 28.7692 24.9175 28.7692V32.7692C30.0437 32.7692 34.5438 30.094 37.0997 26.0729L33.724 23.9271ZM24.9175 28.7692C21.2163 28.7692 17.9639 26.8421 16.1109 23.9271L12.7352 26.0729C15.2912 30.094 19.7912 32.7692 24.9175 32.7692V28.7692Z"
        fill="#4FB573"
        mask="url(#path-6-outside-1)"
      />
      <rect
        x="53.1609"
        y="45.8292"
        width="28.2504"
        height="10.3686"
        rx="2"
        transform="rotate(45 53.1609 45.8292)"
        fill="white"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M25 29.8461C27.6765 29.8461 29.8461 27.6764 29.8461 25C29.8461 22.3235 27.6765 20.1538 25 20.1538C22.3235 20.1538 20.1538 22.3235 20.1538 25C20.1538 27.6764 22.3235 29.8461 25 29.8461Z"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default withHoverColor(AccountabilityIcon);
