import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core';
import cx from 'clsx';

interface IconProps {
  className?: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

export default function AvatarIcon({ className }: IconProps): JSX.Element {
  const styles = useStyles();

  return (
    <SvgIcon className={cx(styles.root, className)} viewBox="0 0 97 97">
      <svg width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48.5" cy="48.5" r="48.5" fill="#D2D5D9" />
        <ellipse cx="48.5" cy="36.7522" rx="19.7593" ry="19.7593" fill="#8F8F8F" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.196 83.7578C18.612 66.9096 32.2258 54.32 48.5 54.32C64.7742 54.32 78.388 66.9096 81.804 83.7577C73.1164 91.9668 61.3959 97 48.5 97C35.604 97 23.8836 91.9669 15.196 83.7578Z"
          fill="#8F8F8F"
        />
      </svg>
    </SvgIcon>
  );
}
