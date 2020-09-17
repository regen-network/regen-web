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

function YoutubeIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        d="M30.6206 12.2647C30.3378 11.1879 29.4894 10.3378 28.4147 10.0403C26.4774 9.51611 18.6999 9.51611 18.6999 9.51611C18.6999 9.51611 10.9224 9.51611 8.97091 10.0403C7.8962 10.3237 7.06189 11.1737 6.76493 12.2647C6.25586 14.2198 6.25586 18.3001 6.25586 18.3001C6.25586 18.3001 6.25586 22.3804 6.77907 24.3356C7.06189 25.4123 7.91035 26.2624 8.98505 26.5599C10.9224 27.0841 18.6999 27.0841 18.6999 27.0841C18.6999 27.0841 26.4774 27.0841 28.4288 26.5599C29.5035 26.2766 30.3378 25.4265 30.6348 24.3356C31.1439 22.3804 31.1439 18.3001 31.1439 18.3001C31.1439 18.3001 31.1439 14.2198 30.6206 12.2647Z"
        fill={color}
      />
      <path d="M16.5039 21.9601V14.6401L22.3599 18.3001L16.5039 21.9601Z" fill="#545555" />
    </SvgIcon>
  );
}

export default withHoverColor(YoutubeIcon);
