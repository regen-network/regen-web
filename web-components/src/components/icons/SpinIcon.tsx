import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface SpinIconProps {
  direction?: 'next' | 'prev' | 'down' | 'up';
}

interface StyleProps {
  rotate: string;
}

interface DirectionRotate {
  up: string;
  down: string;
  prev: string;
  next: string;
}

const directionRotate: DirectionRotate = {
  up: '0deg',
  down: '180deg',
  prev: '90deg',
  next: '-90deg',
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  icon: props => ({
    transform: `rotate(${props.rotate})`,
    fill: theme.palette.primary.main,
    fontSize: '0.5rem',
  }),
}));

export default function SpinIcon({ direction = 'up' }: SpinIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });
  return (
    <SvgIcon viewBox="0 0 8 5" className={classes.icon}>
      <path d="M0.5 4.5L4 1L7.5 4.5" stroke="#D2D5D9" />
    </SvgIcon>
  );
}
