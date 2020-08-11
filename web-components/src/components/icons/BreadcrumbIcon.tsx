import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

import { directionRotate } from './ArrowDownIcon';

interface Props {
  className?: string;
  direction?: 'next' | 'prev' | 'down' | 'up';
}

interface StyleProps {
  rotate: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    transform: `rotate(${props.rotate})`,
  }),
}));

export default function BreadcrumbIcon({ direction = 'down', className }: Props): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });

  return (
    <SvgIcon viewBox="0 0 33 20" className={clsx(className, classes.root)}>
      <rect
        width="4.27533"
        height="23.6375"
        rx="0.25"
        transform="matrix(0.697571 0.716516 -0.697571 0.716516 30.0176 0)"
        fill="#4FB573"
      />
      <rect
        width="4.27533"
        height="23.6375"
        rx="0.25"
        transform="matrix(-0.697571 0.716516 0.697571 0.716516 2.98236 0)"
        fill="#4FB573"
      />
    </SvgIcon>
  );
}
