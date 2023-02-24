import Avatar from '@mui/material/Avatar';
import { makeStyles } from 'tss-react/mui';

interface UserAvatarProps {
  alt?: string;
  src?: string | null;
  size?: string;
  border?: boolean;
  href?: string | null;
  icon?: any;
}

// TODO `Sizes` and `getSize` were moved from the prior /sizing helpers. This is
// the only place they are still used, so i've moved here but we probably want
// to use a system similar to the typography system
interface Sizes {
  xs: number;
  sm: number;
}

function getSize(size?: string): Sizes {
  let spacing: Sizes;
  switch (size) {
    case 'xl':
      spacing = { xs: 12.5, sm: 16 };
      break;
    case 'big':
      spacing = { xs: 10, sm: 12 };
      break;
    case 'medium':
      spacing = { xs: 7, sm: 10 };
      break;
    case 'small':
      spacing = { xs: 7, sm: 7 };
      break;
    case 'project':
      spacing = { xs: 8.75, sm: 8.75 };
      break;
    default:
      spacing = { xs: 7, sm: 10 };
      break;
  }
  return spacing;
}

type UseStylesParams = {
  border: boolean;
  spacing: Sizes;
};

const useStyles = makeStyles<UseStylesParams>()(
  (theme, { border, spacing }) => ({
    root: {
      border: border ? `1px solid ${theme.palette.grey[100]}` : 'none',
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(spacing.sm),
        height: theme.spacing(spacing.sm),
      },
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(spacing.xs),
        height: theme.spacing(spacing.xs),
      },
      backgroundColor: theme.palette.primary.main,
      img: {
        objectFit: 'contain',
      },
    },
  }),
);

export default function UserAvatar({
  alt,
  src,
  size,
  border = true,
  href,
  icon,
}: UserAvatarProps): JSX.Element {
  const spacing: Sizes = getSize(size);
  // TODO: is fallback icon when src not provided ok? what about the bg color?
  const { classes } = useStyles({ spacing, border });
  const avatar =
    !src || icon ? (
      <Avatar className={classes.root} alt={alt}>
        {icon}
      </Avatar>
    ) : (
      <Avatar className={classes.root} alt={alt} src={src} />
    );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {avatar}
      </a>
    );
  }
  return avatar;
}
