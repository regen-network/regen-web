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

function WhitepaperIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 51 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg width="51" height="64" viewBox="0 0 51 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.2002 61.2V2.79999H25.4002H34.3127L48.6002 18.5888V61.2H2.2002Z"
          stroke={color}
          stroke-width="4"
        />
        <mask id="path-2-inside-1" fill={color}>
          <rect x="11.4004" y="32" width="2.83636" height="28" rx="0.25" transform="rotate(-90 11.4004 32)" />
        </mask>
        <rect
          x="11.4004"
          y="32"
          width="2.83636"
          height="28"
          rx="0.25"
          transform="rotate(-90 11.4004 32)"
          fill={color}
          stroke={color}
          stroke-width="2"
          mask="url(#path-2-inside-1)"
        />
        <mask id="path-3-inside-2" fill={color}>
          <rect
            x="11.4004"
            y="40.5091"
            width="2.83636"
            height="28"
            rx="0.25"
            transform="rotate(-90 11.4004 40.5091)"
          />
        </mask>
        <rect
          x="11.4004"
          y="40.5091"
          width="2.83636"
          height="28"
          rx="0.25"
          transform="rotate(-90 11.4004 40.5091)"
          fill={color}
          stroke={color}
          stroke-width="2"
          mask="url(#path-3-inside-2)"
        />
        <mask id="path-4-inside-3" fill={color}>
          <rect
            x="11.4004"
            y="49.0182"
            width="2.83636"
            height="22.4"
            rx="0.25"
            transform="rotate(-90 11.4004 49.0182)"
          />
        </mask>
        <rect
          x="11.4004"
          y="49.0182"
          width="2.83636"
          height="22.4"
          rx="0.25"
          transform="rotate(-90 11.4004 49.0182)"
          fill={color}
          stroke={color}
          stroke-width="2"
          mask="url(#path-4-inside-3)"
        />
        <path
          d="M32.4004 3.63635V18.9864C32.4004 19.1244 32.5123 19.2364 32.6504 19.2364H49.2004"
          stroke={color}
          stroke-width="3"
        />
      </svg>
    </SvgIcon>
  );
}

export default withHoverColor(WhitepaperIcon);
