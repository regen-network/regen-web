import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { getSize, Sizes } from './sizing';

interface UserAvatarProps {
  alt?: string;
  src?: string;
  size?: string;
}

interface StyleProps {
  spacing: Sizes;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#D2D5D9',
    [theme.breakpoints.up('sm')] : {
      width: theme.spacing(props.spacing.sm),
      height: theme.spacing(props.spacing.sm),
    },
    [theme.breakpoints.down('xs')] : {
      width: theme.spacing(props.spacing.xs),
      height: theme.spacing(props.spacing.xs),
    },
  }),
}));

export default function UserAvatar({ alt, src, size }: UserAvatarProps): JSX.Element {
  const spacing: Sizes = getSize(size);
  // TODO: is fallback icon when src not provided ok? what about the bg color?
  const classes = useStyles({ spacing });
  return <Avatar className={classes.root} alt={alt} src={src} />;
}
