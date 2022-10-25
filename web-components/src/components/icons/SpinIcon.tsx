import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';
import { DefaultTheme as Theme } from '@mui/styles';

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

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
// Arrow function has parameter type of Identifier instead of ObjectPattern (e.g. `(props) => ({...})` instead of `({color}) => ({...})`).
const useStyles = makeStyles()((theme: Theme) => ({
  icon: props => ({
    transform: `rotate(${props.rotate})`,
    fill: theme.palette.primary.main,
    fontSize: '0.5rem',
  }),
}));

export default function SpinIcon({
  direction = 'up',
}: SpinIconProps): JSX.Element {
  const rotate: string = directionRotate[direction];
  const { classes } = useStyles({ rotate });
  return (
    <SvgIcon viewBox="0 0 8 5" className={classes.icon}>
      <path d="M0.5 4.5L4 1L7.5 4.5" stroke="#D2D5D9" />
    </SvgIcon>
  );
}
