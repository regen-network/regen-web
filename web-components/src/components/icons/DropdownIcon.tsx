import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import clsx from 'clsx';

import { directionRotate, StyleProps } from './ArrowDownIcon';

interface Props {
  color?: string;
  className?: string;
  direction?: 'next' | 'prev' | 'down' | 'up';
  onClick?: () => void;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  icon: props => ({
    transform: `rotate(${props.rotate})`,
    width: '11px',
    height: '8px',
    position: 'relative',
    top: '-1px',
    '&:hover': {
      borderBottom: 'none',
    },
  }),
}));

export default function DropdownIcon({
  color,
  direction = 'down',
  className,
  ...props
}: Props): JSX.Element {
  const rotate: string = directionRotate[direction];
  const classes = useStyles({ rotate });

  return (
    <SvgIcon
      className={clsx(className, classes.icon)}
      width="11"
      height="8"
      viewBox="0 0 11 8"
      {...props}
    >
      <path
        d="M5.69995 7.7336C5.59994 7.86684 5.40006 7.86684 5.30005 7.7336L0.171111 0.900071C0.0474202 0.735273 0.165005 0.5 0.371057 0.5L10.6289 0.500001C10.835 0.500001 10.9526 0.735274 10.8289 0.900072L5.69995 7.7336Z"
        fill={color || '#4FB573'}
      />
    </SvgIcon>
  );
}
