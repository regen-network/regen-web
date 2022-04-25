import React from 'react';
import { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from '@mui/styles';

import Grid from '@mui/material/Grid';
import clsx from 'clsx';
import { FluidObject } from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import BackgroundSection from './BackgroundSection';

interface StyleProps {
  small?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.5),
    },
  },
  title: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(18),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5),
      paddingBottom: theme.spacing(15.5),
    },
  },
  iconContainer: props => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'block',
    textDecoration: 'none',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
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
  followerCount: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
      paddingTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(14),
      paddingTop: theme.spacing(1.5),
    },
  },
}));

export interface IconLabelProps {
  icon: JSX.Element;
  label: string;
  subLabel?: string;
  href: string;
  small?: boolean;
}

interface ConnectSectionProps {
  header: string;
  icons: IconLabelProps[];
  itemClassName?: string;
  titleClassName?: string;
  titleVariant?: Variant;
  className?: string;
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const IconLabel = ({
  icon,
  label,
  subLabel,
  href,
  small = false,
}: IconLabelProps): JSX.Element => {
  const classes = useStyles({ small });
  return (
    <div>
      <a
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.link}
      >
        <div className={classes.iconContainer}>{icon}</div>
      </a>
      <Title
        color="primary"
        align="center"
        sx={{
          fontSize: theme => [14, theme.typography.h4.fontSize],
          pt: [1.5, 5.25],
        }}
      >
        {label}
      </Title>
      {subLabel && <div className={classes.followerCount}>{subLabel}</div>}
    </div>
  );
};

const ConnectSection = ({
  header,
  titleClassName,
  className,
  background,
  icons,
  itemClassName,
  titleVariant = 'h2',
}: ConnectSectionProps): JSX.Element => {
  const classes = useStyles({});
  return (
    <BackgroundSection
      className={clsx(className, classes.root)}
      linearGradient="unset"
      topSection={false}
      imageData={background.childImageSharp.fluid}
      header={header}
      titleClassName={clsx(titleClassName, classes.title)}
      titleVariant={titleVariant}
    >
      <Grid container spacing={4} justifyContent="center">
        {icons.map((item, i) => (
          <Grid item xs={4} sm={2} className={itemClassName} key={i}>
            <IconLabel
              href={item.href}
              icon={item.icon}
              small={item.small}
              label={item.label}
              subLabel={item.subLabel}
            />
          </Grid>
        ))}
      </Grid>
    </BackgroundSection>
  );
};

export default ConnectSection;
