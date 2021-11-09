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

function WhitepaperIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 51 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.4 19.9363V58.4H4V4H25.2H30.7V18.1863C30.7 19.1528 31.4835 19.9363 32.45 19.9363H46.4ZM33.7 4.52488L44.9313 16.9363H33.7V4.52488ZM0.25 0C0.111929 0 0 0.111927 0 0.249998V62.15C0 62.2881 0.111928 62.4 0.249999 62.4H50.15C50.2881 62.4 50.4 62.2881 50.4 62.15V17.1145C50.4 17.0525 50.377 16.9927 50.3354 16.9468L35.0744 0.0822561C35.027 0.0298812 34.9597 0 34.8891 0H25.2H0.25ZM11.45 31.2C11.3119 31.2 11.2 31.088 11.2 30.95V28.6136C11.2 28.4755 11.3119 28.3636 11.45 28.3636L38.95 28.3636C39.0881 28.3636 39.2 28.4755 39.2 28.6136V30.95C39.2 31.088 39.0881 31.1999 38.95 31.1999L11.45 31.2ZM11.2 39.4591C11.2 39.5972 11.3119 39.7091 11.45 39.7091H38.95C39.0881 39.7091 39.2 39.5972 39.2 39.4591V37.1227C39.2 36.9847 39.0881 36.8727 38.95 36.8727H11.45C11.3119 36.8727 11.2 36.9847 11.2 37.1227V39.4591ZM11.45 48.2181C11.3119 48.2181 11.2 48.1062 11.2 47.9681V45.6318C11.2 45.4937 11.3119 45.3818 11.45 45.3818H33.35C33.4881 45.3818 33.6 45.4937 33.6 45.6318V47.9681C33.6 48.1062 33.4881 48.2181 33.35 48.2181H11.45Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(WhitepaperIcon);
