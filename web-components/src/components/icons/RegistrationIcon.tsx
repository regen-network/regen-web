import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import withHoverColor, { Props } from './withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
    fill: 'white',
  },
}));

function InterfaceIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      width="84"
      height="62"
      viewBox="0 0 84 62"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <mask id="path-1-inside-1" fill="white">
        <rect width="84" height="62" rx="2" />
      </mask>
      <rect
        width="84"
        height="62"
        rx="2"
        fill="white"
        stroke="#4FB573"
        strokeWidth="6"
        mask="url(#path-1-inside-1)"
      />
      <path d="M2 14H82" stroke="#4FB573" strokeWidth="2" />
      <rect x="47" y="28" width="3" height="23" rx="0.25" transform="rotate(-90 47 28)" fill="#4FB573" />
      <rect x="47" y="34" width="2" height="28" rx="0.25" transform="rotate(-90 47 34)" fill="#4FB573" />
      <rect x="47" y="39" width="2" height="28" rx="0.25" transform="rotate(-90 47 39)" fill="#4FB573" />
      <rect x="47" y="44" width="2" height="28" rx="0.25" transform="rotate(-90 47 44)" fill="#4FB573" />
      <rect x="47" y="49" width="2" height="15" rx="0.25" transform="rotate(-90 47 49)" fill="#4FB573" />
      <circle cx="8" cy="8" r="2" fill="#4FB573" />
      <circle cx="14" cy="8" r="2" fill="#4FB573" />
      <circle cx="20" cy="8" r="2" fill="#4FB573" />
      <mask id="path-11-inside-2" fill="white">
        <rect x="9" y="22" width="33" height="29" rx="2" />
      </mask>
      <rect
        x="9"
        y="22"
        width="33"
        height="29"
        rx="2"
        fill="white"
        stroke="#4FB573"
        strokeWidth="6"
        mask="url(#path-11-inside-2)"
      />
      <path d="M30 40V49H17V40V39.4909L23.5 33.3732L30 39.4909V40Z" stroke="#4FB573" strokeWidth="2" />
      <mask id="path-13-inside-3" fill="white">
        <path d="M30 33C30 31.3431 31.3431 30 33 30C34.6569 30 36 31.3431 36 33V49.75C36 49.8881 35.8881 50 35.75 50H30.25C30.1119 50 30 49.8881 30 49.75V33Z" />
      </mask>
      <path
        d="M30 33C30 31.3431 31.3431 30 33 30C34.6569 30 36 31.3431 36 33V49.75C36 49.8881 35.8881 50 35.75 50H30.25C30.1119 50 30 49.8881 30 49.75V33Z"
        stroke="#4FB573"
        strokeWidth="4"
        mask="url(#path-13-inside-3)"
      />
      <mask id="path-14-inside-4" fill="white">
        <rect x="20" y="43" width="7" height="6" rx="0.25" />
      </mask>
      <rect
        x="20"
        y="43"
        width="7"
        height="6"
        rx="0.25"
        stroke="#4FB573"
        strokeWidth="2"
        mask="url(#path-14-inside-4)"
      />
      <mask id="path-15-inside-5" fill="white">
        <rect x="21" y="39" width="5" height="2" rx="0.25" />
      </mask>
      <rect
        x="21"
        y="39"
        width="5"
        height="2"
        rx="0.25"
        stroke="#4FB573"
        strokeWidth="2"
        mask="url(#path-15-inside-5)"
      />
      <line x1="20.3201" y1="43.6159" x2="26.3201" y2="48.6159" stroke="#4FB573" />
      <path d="M31 37H35" stroke="#4FB573" />
      <path d="M31 42H35" stroke="#4FB573" />
      <line
        y1="-0.5"
        x2="7.81025"
        y2="-0.5"
        transform="matrix(-0.768221 0.640184 0.640184 0.768221 27 44)"
        stroke="#4FB573"
      />
    </SvgIcon>
  );
}

export default withHoverColor(InterfaceIcon);
