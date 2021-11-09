import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface IconProps {
  className?: string;
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: theme.palette.primary.main,
  },
}));

export default function AccountabilityIcon({
  className,
  isActive,
}: IconProps): JSX.Element {
  const classes = useStyles();

  return isActive ? (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
  ) : (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M83.213 90.5128H18.8484C17.2262 90.5128 15.9517 89.2382 15.9517 87.6161V62.8203"
        stroke="#8F8F8F"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <path
        d="M61.1401 14.5034H89.0643C90.6865 14.5034 91.961 15.778 91.961 17.4001V84.4298"
        stroke="#8F8F8F"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />
      <rect
        x="63.0107"
        y="56.0303"
        width="18.4124"
        height="9.8718"
        transform="rotate(45 63.0107 56.0303)"
        stroke="#8F8F8F"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M36.2866 69.1351C54.4283 69.1351 69.1351 54.4283 69.1351 36.2866C69.1351 18.1448 54.4283 3.43799 36.2866 3.43799C18.1448 3.43799 3.43799 18.1448 3.43799 36.2866C3.43799 54.4283 18.1448 69.1351 36.2866 69.1351Z"
        fill="#EFEFEF"
        stroke="#8F8F8F"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <path
        d="M36.2865 60.5609C49.6929 60.5609 60.5609 49.6929 60.5609 36.2865C60.5609 22.8802 49.6929 12.0122 36.2865 12.0122C22.8802 12.0122 12.0122 22.8802 12.0122 36.2865C12.0122 49.6929 22.8802 60.5609 36.2865 60.5609Z"
        fill="white"
        stroke="#8F8F8F"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <mask
        id="path-6-outside-1"
        maskUnits="userSpaceOnUse"
        x="19.1538"
        y="26.2051"
        width="35"
        height="21"
        fill="black"
      >
        <rect fill="white" x="19.1538" y="26.2051" width="35" height="21" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.1538 36.6666C24.387 31.5801 30.0722 28.2051 36.5456 28.2051C43.0191 28.2051 48.7042 31.5801 51.9374 36.6666C48.7042 41.7531 43.0191 45.1282 36.5456 45.1282C30.0722 45.1282 24.387 41.7531 21.1538 36.6666Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.1538 36.6666C24.387 31.5801 30.0722 28.2051 36.5456 28.2051C43.0191 28.2051 48.7042 31.5801 51.9374 36.6666C48.7042 41.7531 43.0191 45.1282 36.5456 45.1282C30.0722 45.1282 24.387 41.7531 21.1538 36.6666Z"
        fill="#EFEFEF"
      />
      <path
        d="M21.1538 36.6666L19.4659 35.5937C19.0498 36.2485 19.0498 37.0848 19.4659 37.7395L21.1538 36.6666ZM51.9374 36.6666L53.6253 37.7395C54.0414 37.0848 54.0414 36.2485 53.6253 35.5937L51.9374 36.6666ZM22.8417 37.7395C25.7233 33.2061 30.7847 30.2051 36.5456 30.2051V26.2051C29.3596 26.2051 23.0507 29.9542 19.4659 35.5937L22.8417 37.7395ZM36.5456 30.2051C42.3065 30.2051 47.3679 33.2061 50.2495 37.7395L53.6253 35.5937C50.0406 29.9542 43.7316 26.2051 36.5456 26.2051V30.2051ZM50.2495 35.5937C47.3679 40.1272 42.3065 43.1282 36.5456 43.1282V47.1282C43.7316 47.1282 50.0406 43.379 53.6253 37.7395L50.2495 35.5937ZM36.5456 43.1282C30.7847 43.1282 25.7233 40.1272 22.8417 35.5937L19.4659 37.7395C23.0507 43.379 29.3596 47.1282 36.5456 47.1282V43.1282Z"
        fill="#8F8F8F"
        mask="url(#path-6-outside-1)"
      />
      <rect
        x="77.9695"
        y="67.2161"
        width="41.434"
        height="15.2073"
        rx="2"
        transform="rotate(45 77.9695 67.2161)"
        fill="#EFEFEF"
        stroke="#8F8F8F"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M36.6667 43.3077C40.3344 43.3077 43.3077 40.3344 43.3077 36.6667C43.3077 32.9989 40.3344 30.0256 36.6667 30.0256C32.9989 30.0256 30.0256 32.9989 30.0256 36.6667C30.0256 40.3344 32.9989 43.3077 36.6667 43.3077Z"
        fill="white"
        stroke="#8F8F8F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}
