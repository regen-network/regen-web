import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));

export default function ZoomIcon(): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 13 14" className={classes.root}>
      <path
        d="M11.7693 13.1191L11.8563 13.0403C12.2657 12.6697 12.3019 12.0331 11.937 11.6185L9.35413 8.68399C8.98924 8.26941 8.36153 8.2338 7.95209 8.60446L7.86509 8.68322C7.45566 9.05387 7.41955 9.69043 7.78444 10.105L10.3673 13.0396C10.7322 13.4541 11.3599 13.4897 11.7693 13.1191Z"
        fill="#4FB573"
      />
      <path
        d="M10.494 5.73631C10.6529 2.88252 8.48832 0.499025 5.70122 0.295515C2.86243 0.143962 0.484877 2.32648 0.274401 5.12846C0.115471 7.98226 2.28003 10.3658 5.06713 10.5693C7.90592 10.7208 10.335 8.59011 10.494 5.73631ZM5.22502 8.44183C3.57338 8.34045 2.38816 6.94132 2.44208 5.33287C2.54768 3.67246 3.94323 2.37337 5.59487 2.47475C7.24651 2.57614 8.43174 3.97527 8.37782 5.58372C8.27221 7.24413 6.82512 8.49141 5.22502 8.44183Z"
        fill="#4FB573"
      />
    </SvgIcon>
  );
}
