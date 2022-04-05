import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Grid, { GridDirection } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import UserAvatar from './UserAvatar';
import { getFontSize } from '../../theme/sizing';
import OrganizationIcon from '../icons/OrganizationIcon';

export interface User {
  name: string;
  type: string; // USER or ORGANIZATION
  location?: string;
  image?: string | null;
  description?: string;
  link?: string;
}

interface UserInfoProps {
  user: User;
  size?: string;
  direction?: GridDirection;
  border?: boolean;
  icon?: any;
}

interface StyleProps {
  description?: string;
  direction?: GridDirection;
  size: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  text: (props: StyleProps) => ({
    marginLeft:
      props.size === 'project' ? theme.spacing(3.5) : theme.spacing(4.8),
    textAlign: props.direction === 'column' ? 'center' : 'left',
    alignSelf: 'center',
  }),
  name: (props: StyleProps) => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: getFontSize(props.size).sm,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: getFontSize(props.size).xs,
    },
    fontFamily:
      props.size === 'xl'
        ? theme.typography.h1.fontFamily
        : theme.typography.fontFamily,
    fontWeight: props.size === 'xl' ? 900 : 'bold',
  }),
  link: {
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
    },
  },
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: getFontSize('medium').sm,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: getFontSize('medium').xs,
    },
    color: theme.palette.info.dark,
    paddingTop: theme.spacing(2.8),
  },
  place: {
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: getFontSize('small').sm,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: getFontSize('small').xs,
    },
    paddingTop: theme.spacing(1.6),
  },
}));

export default function UserInfo({
  user,
  size = 'big',
  direction,
  border = true,
  icon,
}: UserInfoProps): JSX.Element {
  const styles = useStyles({ description: user.description, direction, size });
  const name = <Typography className={styles.name}>{user.name}</Typography>;

  return (
    <Grid container direction={direction} wrap="nowrap">
      <Grid item>
        <UserAvatar
          alt={user.name}
          src={user.image}
          href={user.link}
          size={size}
          border={border}
          icon={
            !user.image && user.type === 'ORGANIZATION' ? (
              <OrganizationIcon />
            ) : (
              icon
            )
          }
        />
      </Grid>
      <Grid item className={styles.text}>
        {user.link ? (
          <a
            className={styles.link}
            href={user.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        ) : (
          name
        )}
        {user.location && (
          <Typography className={styles.place}>{user.location}</Typography>
        )}
        {user.description && (
          <Typography className={styles.description}>
            {user.description}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
