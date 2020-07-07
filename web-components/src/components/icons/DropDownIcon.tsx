import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

interface Props {
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& svg.MuiSvgIcon-root': {
      width: '11px',
      height: '8px',
      position: 'relative',
      top: '-1px',
    },
    '& svg.MuiSvgIcon-root:hover': {
      borderBottom: 'none',
    },
  },
}));

export default function DropDownIcon({ color, ...props }: Props): JSX.Element {
  const classes = useStyles({});

  return (
    <span className={classes.root}>
      <SvgIcon width="11" height="8" viewBox="0 0 11 8" {...props}>
        <path
          d="M5.69995 7.7336C5.59994 7.86684 5.40006 7.86684 5.30005 7.7336L0.171111 0.900071C0.0474202 0.735273 0.165005 0.5 0.371057 0.5L10.6289 0.500001C10.835 0.500001 10.9526 0.735274 10.8289 0.900072L5.69995 7.7336Z"
          fill={color || '#B9E1C7'}
        />
      </SvgIcon>
    </span>
  );
}
