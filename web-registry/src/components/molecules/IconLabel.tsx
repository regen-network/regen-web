import React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import cx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Description from 'web-components/lib/components/description';
import { Title } from 'web-components/lib/components/typography';
import { BlockContent } from 'web-components/lib/components/block-content';
import { Maybe, Scalars } from '../../generated/sanity-graphql';

export interface IconLabelProps {
  className?: string;
  icon: JSX.Element;
  label: string;
  href: string;
  descriptionRaw?: Maybe<Scalars['JSON']>;
  small?: boolean;
}

interface StyleProps {
  small?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 4),
      fontSize: theme.typography.pxToRem(18),
      width: theme.typography.pxToRem(374),
    },
  },
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: 900,
    textAlign: 'center',
    lineHeight: '145%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  iconContainer: props => ({
    backgroundColor: theme.palette.secondary.main,
    textDecoration: 'none',
    width: theme.spacing(30),
    height: theme.spacing(30),
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '& svg': {
      color: 'transparent',
      width: '100%',
      height: '100%',
      [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
        padding: props.small ? theme.spacing(6) : 0,
      },
      [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
        padding: props.small ? theme.spacing(3) : 0,
      },
    },
  }),
  icon: {
    color: 'transparent',
    width: '100%',
    height: '100%',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  linkDescription: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      paddingTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(16),
      paddingTop: theme.spacing(4),
    },
  },
}));

const IconLabel = ({
  className,
  icon,
  label,
  href,
  descriptionRaw,
  small = false,
}: IconLabelProps): JSX.Element => {
  const styles = useStyles({ small });
  return (
    <div className={cx(styles.root, className)}>
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={styles.link}
      >
        <Avatar className={styles.iconContainer}>{icon}</Avatar>
      </a>
      <div className={styles.textContainer}>
        <Title className={styles.label} variant="h4">
          {label}
        </Title>
        {descriptionRaw && (
          <Description className={styles.linkDescription} align="center">
            {BlockContent(descriptionRaw)}
          </Description>
        )}
      </div>
    </div>
  );
};

export { IconLabel };
