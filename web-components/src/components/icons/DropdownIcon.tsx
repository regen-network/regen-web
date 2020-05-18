import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export default function DropdownIcon(): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 11 8" className={classes.root}>
      <path
        d="M5.69995 7.7336C5.59994 7.86684 5.40006 7.86684 5.30005 7.7336L0.171111 0.900071C0.0474202 0.735273 0.165005 0.5 0.371057 0.5L10.6289 0.500001C10.835 0.500001 10.9526 0.735274 10.8289 0.900072L5.69995 7.7336Z"
        fill="#4FB573"
      />
    </SvgIcon>
  );
}
