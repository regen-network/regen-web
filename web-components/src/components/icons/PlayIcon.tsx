import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles, Theme } from '@material-ui/core';

interface PlayIconProps {
  width?: string;
  height?: string;
}

const useStyles = makeStyles<Theme, PlayIconProps>((theme: Theme) => ({
  root: props => ({
    width: props.width || 'inherit',
    height: props.height || 'inherit',
  }),
}));

export default function PlayIcon({ width, height }: PlayIconProps): JSX.Element {
  const classes = useStyles({ width, height });

  return (
    <SvgIcon viewBox="0 0 9 9" className={classes.root}>
      <path
        d="M8.36279 4.18667C8.69613 4.37912 8.69613 4.86024 8.36279 5.05269L1.72899 8.88272C1.39566 9.07517 0.97899 8.83461 0.97899 8.44971L0.97899 0.789649C0.978991 0.404749 1.39566 0.164188 1.72899 0.356638L8.36279 4.18667Z"
        fill="#4FB573"
      />
    </SvgIcon>
  );
}
