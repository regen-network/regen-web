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

function LinkIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <rect
        x="2.82843"
        y="24.0416"
        width="16.7778"
        height="11"
        rx="5.5"
        transform="rotate(-45 2.82843 24.0416)"
        stroke={color}
        strokeWidth="4"
      />
      <rect
        x="12.178"
        y="14.6921"
        width="16.7778"
        height="11"
        rx="5.5"
        transform="rotate(-45 12.178 14.6921)"
        stroke={color}
        strokeWidth="4"
      />
    </SvgIcon>
  );
}

export default withHoverColor(LinkIcon);
