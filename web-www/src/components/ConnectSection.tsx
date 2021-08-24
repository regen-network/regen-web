import React from 'react';
import { Theme, makeStyles, TypographyVariant } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { FluidObject } from 'gatsby-image';

import BackgroundSection from './BackgroundSection';

interface StyleProps {
  small?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      paddingBottom: theme.spacing(15.5),
    },
  },
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: 900,
    textAlign: 'center',
    lineHeight: '145%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(6),
      paddingTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(1.5),
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
    [theme.breakpoints.down('xs')]: {
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
  titleVariant?: TypographyVariant;
  className?: string;
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const IconLabel = ({ icon, label, subLabel, href, small = false }: IconLabelProps): JSX.Element => {
  const classes = useStyles({ small });
  return (
    <div>
      <a href={href} rel="noopener noreferrer" target="_blank" className={classes.link}>
        <div className={classes.iconContainer}>{icon}</div>
      </a>
      <div className={classes.label}>{label}</div>
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
      <Grid container spacing={4} justify="space-between">
        {icons.map((item, i) => (
          <Grid item xs={4} sm={3} className={itemClassName} key={i}>
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
