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

function LinkedInIcon({ className, color, onMouseEnter, onMouseLeave }: Props): JSX.Element {
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
        d="M11.1711 15.1081H14.9172V26.3521H11.1711V15.1081ZM13.0441 9.51611C14.2713 9.51611 15.2401 10.418 15.2401 11.5605C15.2401 12.7029 14.2713 13.6049 13.0441 13.6049C11.817 13.6049 10.8481 12.7029 10.8481 11.5605C10.9127 10.418 11.8816 9.51611 13.0441 9.51611Z"
        fill={color}
      />
      <path
        d="M16.7041 14.8854H20.1012V16.4797C20.5865 15.5599 21.7391 14.6401 23.4377 14.6401C27.0168 14.6401 27.6841 17.0316 27.6841 20.0976V26.3521H24.1656V20.7721C24.1656 19.423 24.1656 17.7061 22.3458 17.7061C20.5259 17.7061 20.2226 19.1778 20.2226 20.6494V26.3521H16.7041V14.8854Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default withHoverColor(LinkedInIcon);
