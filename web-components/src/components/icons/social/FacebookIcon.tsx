import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import clsx from 'clsx';

import withHoverColor, { Props } from '../withHoverColor';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function FacebookIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9148 12.2536H23.0956V8.78418H20.2209C16.0577 8.78418 16.1568 12.1544 16.1568 12.6501V15.3264H14.2734V18.6967H16.1568V27.8162H20.1218V18.6967H22.7982C22.7982 18.6967 22.9964 17.1107 23.1947 15.3264C22.8973 15.3264 20.2209 15.3264 20.2209 15.3264C20.2209 15.3264 20.2209 13.3439 20.2209 13.0466C20.1218 12.7492 20.5183 12.2536 20.9148 12.2536Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(FacebookIcon);
