import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

interface DecentralizeIconProps {
  color?: string;
  height?: string;
  width?: string;
}

interface StyleProps {
  height?: string;
  width?: string;
}

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: props => ({
    height: props.height || theme.spacing(31.25),
    width: props.width || theme.spacing(55.25),
  }),
}));

export default function DecentralizeIcon({
  height,
  width,
}: DecentralizeIconProps): JSX.Element {
  const classes = useStyles({ height, width });

  return (
    <SvgIcon
      className={classes.root}
      width="221"
      height="125"
      viewBox="0 0 221 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.1539 45.7661C46.0282 45.7661 55.6542 36.1354 55.6542 24.2552C55.6542 12.3751 46.0282 2.74438 34.1539 2.74438C22.2796 2.74438 12.6536 12.3751 12.6536 24.2552C12.6536 36.1354 22.2796 45.7661 34.1539 45.7661Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0227 34.0939C18.5986 41.0257 25.7952 45.8108 34.1539 45.8108C46.0439 45.8108 55.6542 36.1958 55.6542 24.3C55.6542 14.6849 49.3516 6.54568 40.68 3.81769"
        stroke="#4FB573"
        fill="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.0685 26.0441L29.2817 32.2603L45.1946 16.2949"
        stroke="#4FB573"
        fill="white"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M64.4593 90.532H67.0253"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M71.3018 90.532H77.674"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M79.8123 90.532H82.3782"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M140.671 90.532H143.237"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M147.514 90.532H153.886"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M156.024 90.532H158.59"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3 4"
      />
      <path
        d="M34.1539 119.422L5.54646 105.111V76.5342L34.1539 90.845V119.422Z"
        fill="#B9E1C7"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.4221 119.467L63.0295 105.156V76.579L34.4221 90.8897V119.467Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.4221 90.1742L63.0295 75.8634L34.1539 61.5527L5.54646 75.8634L34.4221 90.1742Z"
        fill="#DCF0E3"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110.366 45.7661C122.24 45.7661 131.866 36.1354 131.866 24.2552C131.866 12.3751 122.24 2.74438 110.366 2.74438C98.4916 2.74438 88.8656 12.3751 88.8656 24.2552C88.8656 36.1354 98.4916 45.7661 110.366 45.7661Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M99.2805 26.0441L105.494 32.2603L121.407 16.2949"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      <path
        d="M110.366 119.422L81.7585 105.111V76.5342L110.366 90.845V119.422Z"
        fill="#B9E1C7"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110.634 119.467L139.242 105.156V76.579L110.634 90.8898V119.467Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110.634 90.1742L139.242 75.8634L110.366 61.5527L81.7585 75.8634L110.634 90.1742Z"
        fill="#DCF0E3"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M186.578 45.7661C198.452 45.7661 208.078 36.1354 208.078 24.2552C208.078 12.3751 198.452 2.74438 186.578 2.74438C174.704 2.74438 165.078 12.3751 165.078 24.2552C165.078 36.1354 174.704 45.7661 186.578 45.7661Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M175.493 26.0441L181.706 32.2603L197.619 16.2949"
        stroke="#4FB573"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
      <path
        d="M186.578 119.422L157.97 105.111V76.5342L186.578 90.845V119.422Z"
        fill="#B9E1C7"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M186.846 119.467L215.454 105.156V76.579L186.846 90.8897V119.467Z"
        fill="white"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M186.846 90.1742L215.454 75.8634L186.578 61.5527L157.97 75.8634L186.846 90.1742Z"
        fill="#DCF0E3"
        stroke="#4FB573"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}
