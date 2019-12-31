import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { getSize } from './sizing';

interface UserAvatarProps {
  alt?: string;
  src?: string;
  size?: string;
}

interface StyleProps {
  spacing: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#D2D5D9',
    width: theme.spacing(props.spacing),
    height: theme.spacing(props.spacing),
  }),
}));

export default function UserAvatar({ alt, src, size }: UserAvatarProps): JSX.Element {
  const spacing: number = getSize(size);
  // TODO: is fallback icon when src not provided ok? what about the bg color?
  const classes = useStyles({ spacing });
  return (
    <Avatar className={classes.root} alt={alt} src={src} />
  );
}
