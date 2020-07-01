import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface props extends React.HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
}

const useStyles = makeStyles<Theme, props>((theme: Theme) => ({
  root: props => ({
    width: props.width || 'inherit',
    height: props.height || 'inherit',
  }),
}));

export default function HamburgerIcon({ width, height, className }: props): JSX.Element {
  const classes = useStyles({ width, height });

  return (
    <SvgIcon
      className={clsx(className, classes.root)}
      viewBox="0 0 29 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="29" height="2" rx="0.25" fill="black" />
      <rect y="10" width="29" height="2" rx="0.25" fill="black" />
      <rect y="20" width="29" height="2" rx="0.25" fill="black" />
    </SvgIcon>
  );
}
