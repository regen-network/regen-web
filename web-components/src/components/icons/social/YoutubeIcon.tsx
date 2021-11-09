import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import withHoverColor, { Props } from '../withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function YoutubeIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.2716 0.716129C31.7398 1.12258 32.8989 2.28387 33.2852 3.75484C34 6.42581 34 12 34 12C34 12 34 17.5742 33.3045 20.2452C32.8989 21.7355 31.7591 22.8968 30.2909 23.2839C27.625 24 17 24 17 24C17 24 6.375 24 3.72841 23.2839C2.26023 22.8774 1.10114 21.7161 0.714773 20.2452C0 17.5742 0 12 0 12C0 12 0 6.42581 0.695455 3.75484C1.10114 2.26452 2.24091 1.10323 3.70909 0.716129C6.375 0 17 0 17 0C17 0 27.625 0 30.2716 0.716129ZM22 12L14 7V17L22 12Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(YoutubeIcon);
