import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // width: theme.spacing(6.5),
    // height: theme.spacing(6.5),
  },
}));

export default function EyeIcon({ ...props }): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 19 14" className={classes.root} {...props}>
      <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 6.91021C1.29537 2.90035 5.05898 0 9.5 0C13.941 0 17.7046 2.90035 19 6.91021C17.7046 10.9201 13.941 13.8204 9.5 13.8204C5.05898 13.8204 1.29537 10.9201 0 6.91021Z"
          fill="#4FB573"
        />
        <circle cx="9.81977" cy="6.91022" r="3.29587" fill="#4FB573" stroke="white" strokeWidth="1.5" />
      </svg>
    </SvgIcon>
  );
}
