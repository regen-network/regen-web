import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

interface ArrowDownIconProps {
  color: string;
  className?: string;
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
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
  }),
}));

export default function ArrowDownIcon({
  color,
  className,
  fontSize = 'default',
  direction = 'down',
}: ArrowDownIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });
  return (
    <SvgIcon fontSize={fontSize} className={clsx(className, classes.icon)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon / Arrow / Large">
          <path
            id="Union"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 4.25C11 4.11193 11.1119 4 11.25 4H12.75C12.8881 4 13 4.11193 13 4.25V16.4L18.2232 11.1768C18.3209 11.0791 18.4792 11.0791 18.5768 11.1768L19.6375 12.2374C19.7351 12.3351 19.7351 12.4934 19.6375 12.591L12.1721 20.0564C12.1219 20.1065 12.0557 20.1309 11.99 20.1295C11.9243 20.1309 11.8581 20.1065 11.8079 20.0564L4.34257 12.591C4.24494 12.4934 4.24494 12.3351 4.34257 12.2374L5.40323 11.1768C5.50086 11.0791 5.65915 11.0791 5.75678 11.1768L11 16.42V4.25Z"
            fill={color}
          />
        </g>
      </svg>
    </SvgIcon>
  );
}
