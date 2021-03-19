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
      viewBox="0 0 120 87"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <mask id="path-1-inside-1" fill="white">
        <rect width="120" height="87" rx="2" />
      </mask>
      <rect
        width="120"
        height="87"
        rx="2"
        fill="white"
        stroke="#4FB573"
        strokeWidth="6"
        mask="url(#path-1-inside-1)"
      />
      <path d="M3 20L117 20" stroke="#4FB573" strokeWidth="2" />
      <ellipse cx="10.7143" cy="11.7097" rx="2.71429" ry="2.70968" fill="#4FB573" />
      <ellipse cx="18.8572" cy="11.7097" rx="2.71428" ry="2.70968" fill="#4FB573" />
      <ellipse cx="27" cy="11.7097" rx="2.71428" ry="2.70968" fill="#4FB573" />
      <path d="M22 30H63" stroke="#FFC432" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 53H63" stroke="#FFC432" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect
        x="22"
        y="44"
        width="9"
        height="76"
        transform="rotate(-90 22 44)"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="22"
        y="67"
        width="9"
        height="36"
        transform="rotate(-90 22 67)"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="62"
        y="67"
        width="9"
        height="36"
        transform="rotate(-90 62 67)"
        stroke="#4FB573"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="79"
        y="85"
        width="9"
        height="19"
        transform="rotate(-90 79 85)"
        fill="#4FB573"
        stroke="#4FB573"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default withHoverColor(InterfaceIcon);
