import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import withHoverColor, { Props } from './withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function MediumIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 38 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d="M10.3373 13.5332C10.3637 13.2842 10.2643 13.0381 10.0697 12.8705L8.08765 10.5889V10.248H14.242L18.999 20.2172L23.1811 10.248H29.0481V10.5889L27.3534 12.1415C27.2073 12.2479 27.1348 12.4228 27.1651 12.596V24.0041C27.1348 24.1772 27.2073 24.3522 27.3534 24.4586L29.0084 26.0112V26.352H20.6837V26.0112L22.3982 24.4207C22.5667 24.2598 22.5667 24.2124 22.5667 23.9663V14.745L17.7998 26.3142H17.1556L11.6058 14.745V22.4988C11.5596 22.8248 11.6729 23.153 11.913 23.3888L14.1429 25.9734V26.3142H7.82007V25.9734L10.0499 23.3888C10.2883 23.1526 10.395 22.8222 10.3373 22.4988V13.5332Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(MediumIcon);
