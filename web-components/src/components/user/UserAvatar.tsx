import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { getSize, Sizes } from '../../theme/sizing';

interface UserAvatarProps {
  alt?: string;
  src?: string;
  size?: string;
  border?: boolean;
  href?: string;
}

interface StyleProps {
  spacing: Sizes;
  border: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    border: props.border ? '1px solid #D2D5D9' : 'none',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(props.spacing.sm),
      height: theme.spacing(props.spacing.sm),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(props.spacing.xs),
      height: theme.spacing(props.spacing.xs),
    },
  }),
}));

export default function UserAvatar({ alt, src, size, border = true, href }: UserAvatarProps): JSX.Element {
  const spacing: Sizes = getSize(size);
  // TODO: is fallback icon when src not provided ok? what about the bg color?
  const classes = useStyles({ spacing, border });
  const avatar = <Avatar className={classes.root} alt={alt} src={src} />;
  if (avatar) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {avatar}
      </a>
    );
  }
  return avatar;
}
