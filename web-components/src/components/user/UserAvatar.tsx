import { Avatar, SxProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { cn } from '../../utils/styles/cn';

interface UserAvatarProps {
  alt?: string;
  src?: string | null;
  size?: string;
  border?: boolean;
  href?: string | null;
  icon?: any;
  sx?: SxProps<Theme>;
  className?: string;
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
    case 'xxl':
      spacing = { xs: 16, sm: 18.75 };
      break;
    case 'xl':
      spacing = { xs: 12.5, sm: 16 };
      break;
    case 'lg':
    case 'big':
      spacing = { xs: 10, sm: 12 };
      break;
    case 'md':
    case 'medium':
      spacing = { xs: 7.5, sm: 7.5 };
      spacing = { xs: 10, sm: 10 };

      break;
    case 'small':
    case 'sm':
      spacing = { xs: 6.5, sm: 6.5 };
      break;
    case 'xs':
      spacing = { xs: 4, sm: 4 };
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
        objectFit: 'cover',
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
  sx,
  className,
}: UserAvatarProps): JSX.Element {
  const spacing: Sizes = getSize(size);
  // TODO: is fallback icon when src not provided ok? what about the bg color?
  const { classes } = useStyles({ spacing, border });
  const avatar =
    !src || icon ? (
      <Avatar
        sx={sx}
        className={cn(classes.root, className)}
        alt={alt}
        src={icon}
      >
        {icon}
      </Avatar>
    ) : (
      <Avatar
        sx={sx}
        className={cn(classes.root, className)}
        alt={alt}
        src={src}
      />
    );

  if (href) {
    return (
      <a href={href} rel="noopener noreferrer">
        {avatar}
      </a>
    );
  }
  return avatar;
}
