import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { SxProps, Theme } from '@mui/material';

import { Direction, StyleProps, DirectionRotate } from './ArrowDownIcon';

interface ArrowDownIconProps {
  className?: string;
  fontSize?: SvgIconProps['fontSize'];
  direction?: Direction;
  sx?: SxProps<Theme>;
}

export const directionRotate: DirectionRotate = {
  up: '-90deg',
  down: '90deg',
  prev: '180deg',
  next: '0deg',
  downLeft: '135deg',
  upRight: '-45deg',
};

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  icon: props => ({
    transform: `rotate(${props.rotate})`,
  }),
}));

export default function ArrowDownIcon({
  className,
  fontSize = 'inherit',
  direction = 'next',
  sx,
}: ArrowDownIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });
  return (
    <SvgIcon
      fontSize={fontSize}
      className={clsx(className, classes.icon)}
      sx={sx}
      width="13"
      height="9"
      viewBox="0 0 13 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="5.13013"
        width="1.34148"
        height="11.5067"
        rx="0.25"
        transform="rotate(-90 0 5.13013)"
        fill="#4FB573"
      />
      <rect
        width="1.31038"
        height="6.19649"
        rx="0.25"
        transform="matrix(0.689918 -0.723888 0.689918 0.723888 7.8208 0.948547)"
        fill="#4FB573"
      />
      <rect
        width="1.31038"
        height="6.19649"
        rx="0.25"
        transform="matrix(0.689918 0.723888 0.689918 -0.723888 7.81836 8.05145)"
        fill="#4FB573"
      />
    </SvgIcon>
  );
}
