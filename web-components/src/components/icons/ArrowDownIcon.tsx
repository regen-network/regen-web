import React from 'react';
import { SxProps, Theme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

export type Direction =
  | 'next'
  | 'prev'
  | 'down'
  | 'up'
  | 'downLeft'
  | 'upRight';

interface ArrowDownIconProps {
  color: string;
  className?: string;
  fontSize?: SvgIconProps['fontSize'];
  direction?: Direction;
  sx?: SxProps<Theme>;
}

export interface StyleProps {
  rotate: string;
}

export interface DirectionRotate {
  up: string;
  down: string;
  prev: string;
  next: string;
  downLeft: string;
  upRight: string;
}

export const directionRotate: DirectionRotate = {
  up: '180deg',
  down: '0deg',
  prev: '90deg',
  next: '-90deg',
  downLeft: '45deg',
  upRight: '225deg',
};

type UseStylesParams = {
  rotate: string;
};

const useStyles = makeStyles<UseStylesParams>()((theme, { rotate }) => ({
  icon: {
    transform: `rotate(${rotate})`,
  },
}));

export default function ArrowDownIcon({
  color,
  className,
  fontSize = 'inherit',
  direction = 'down',
  sx,
}: ArrowDownIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const { classes, cx } = useStyles({ rotate });
  return (
    <SvgIcon
      fontSize={fontSize}
      className={cx(className, classes.icon)}
      sx={sx}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
