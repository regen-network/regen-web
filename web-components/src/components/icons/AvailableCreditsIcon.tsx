import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: theme.spacing(14.25),
    height: theme.spacing(17.25),
  },
}));

export default function AvailableCreditsIcon(): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 57 69" className={classes.root}>
      <svg
        width="57"
        height="69"
        viewBox="0 0 57 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75267 50.5L17.1846 42.2027C18.3052 41.098 19.7994 40.4536 21.387 40.4536H36.0933C37.7832 40.4536 38.7018 41.7626 38.7018 43.0313C38.7018 44.2151 38.0571 45.701 36.0933 45.701H28.104C26.89 45.701 25.9561 46.6217 25.9561 47.8185C25.9561 49.0152 26.89 49.9359 28.104 49.9359H38.6633L49.2592 38.8206C50.0996 37.992 52.0397 37.4894 53.5319 38.8205C55.363 40.4536 54.7527 42.4607 54.1423 43.0674L43.7887 54.2971C42.7614 55.5859 41.1739 56.4145 39.4929 56.4145H24.5512L19.4035 61.4991"
          stroke="#4FB573"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        <path
          d="M15.1522 68.2073L0.75267 53.9102L6.70447 48.0007L21.104 62.2978L15.1522 68.2073Z"
          stroke="#4FB573"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
        <circle
          cx="24.7527"
          cy="17"
          r="15.5"
          stroke="#4FB573"
          strokeWidth="3"
        />
        <circle
          cx="24.7527"
          cy="17"
          r="10"
          stroke="#4FB573"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.1 3.5"
        />
      </svg>
    </SvgIcon>
  );
}
