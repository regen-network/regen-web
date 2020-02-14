import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // height: theme.spacing(13.5),
    // width: theme.spacing(14.75),
  },
}));

export default function OrganizationIcon(): JSX.Element {
  const classes = useStyles({});

  return (
    <SvgIcon viewBox="0 0 23 22" className={classes.root}>
      <mask id="path-2-inside-1" fill="white">
        <rect width="14" height="22" rx="0.25" />
      </mask>
      <rect width="14" height="22" rx="0.25" stroke="#D2D5D9" strokeWidth="4" mask="url(#path-2-inside-1)" />
      <mask id="path-3-inside-2" fill="white">
        <rect x="12" y="7" width="11" height="15" rx="0.25" />
      </mask>
      <rect
        x="12"
        y="7"
        width="11"
        height="15"
        rx="0.25"
        stroke="#D2D5D9"
        strokeWidth="4"
        mask="url(#path-3-inside-2)"
      />
      <mask id="path-4-inside-3" fill="white">
        <rect x="4" y="4" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="4"
        y="4"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-4-inside-3)"
      />
      <mask id="path-5-inside-4" fill="white">
        <rect x="8" y="4" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="8"
        y="4"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-5-inside-4)"
      />
      <mask id="path-6-inside-5" fill="white">
        <rect x="4" y="8" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="4"
        y="8"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-6-inside-5)"
      />
      <mask id="path-7-inside-6" fill="white">
        <rect x="8" y="8" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="8"
        y="8"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-7-inside-6)"
      />
      <mask id="path-8-inside-7" fill="white">
        <rect x="4" y="12" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="4"
        y="12"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-8-inside-7)"
      />
      <mask id="path-9-inside-8" fill="white">
        <rect x="8" y="12" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="8"
        y="12"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-9-inside-8)"
      />
      <mask id="path-10-inside-9" fill="white">
        <rect x="16" y="11" width="3" height="3" rx="0.25" />
      </mask>
      <rect
        x="16"
        y="11"
        width="3"
        height="3"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-10-inside-9)"
      />
      <mask id="path-11-inside-10" fill="white">
        <rect x="16" y="15" width="3" height="3" rx="0.25" />
      </mask>
      <rect
        x="16"
        y="15"
        width="3"
        height="3"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-11-inside-10)"
      />
      <mask id="path-12-inside-11" fill="white">
        <rect x="4" y="16" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="4"
        y="16"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-12-inside-11)"
      />
      <mask id="path-13-inside-12" fill="white">
        <rect x="8" y="16" width="2" height="2" rx="0.25" />
      </mask>
      <rect
        x="8"
        y="16"
        width="2"
        height="2"
        rx="0.25"
        fill="#D2D5D9"
        stroke="#D2D5D9"
        strokeWidth="2"
        mask="url(#path-13-inside-12)"
      />
    </SvgIcon>
  );
}
