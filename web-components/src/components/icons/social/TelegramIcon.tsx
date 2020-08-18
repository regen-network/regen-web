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

function TelegramIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
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
        d="M26.4678 13.0447L23.7062 25.4682C23.4978 26.345 22.9546 26.5632 22.1824 26.1501L17.9747 23.1923L15.9444 25.0551C15.7197 25.2694 15.5317 25.4487 15.0987 25.4487L15.401 21.3613L23.1997 14.6386C23.5388 14.3502 23.1261 14.1904 22.6727 14.4787L13.0316 20.2696L8.88106 19.0304C7.9783 18.7616 7.96194 18.1692 9.06898 17.7561L25.3036 11.7898C26.0553 11.521 26.7129 11.9497 26.4678 13.0447Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(TelegramIcon);
