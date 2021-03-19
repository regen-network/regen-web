import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

interface ArrowFilledIconProps {
  color: string;
  className?: string;
  direction?: 'next' | 'prev' | 'down' | 'up';
}

export interface StyleProps {
  rotate: string;
}

interface DirectionRotate {
  up: string;
  down: string;
  prev: string;
  next: string;
}

export const directionRotate: DirectionRotate = {
  up: '180deg',
  down: '0deg',
  prev: '90deg',
  next: '-90deg',
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  icon: props => ({
    transform: `rotate(${props.rotate})`,
    height: theme.spacing(7),
  }),
}));

export default function ArrowFilledIcon({
  color,
  className,
  direction = 'down',
}: ArrowFilledIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });

  return (
    <SvgIcon
      className={clsx(className, classes.icon)}
      viewBox="0 0 12 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 28L11.7735 18L0.226498 18L6 28ZM5 4.37114e-08L5 19L7 19L7 -4.37114e-08L5 4.37114e-08Z"
        fill={color}
      />
    </SvgIcon>
  );
}
