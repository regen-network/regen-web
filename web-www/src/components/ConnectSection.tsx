import React from 'react';
import { Variant } from '@mui/material/styles/createTypography';
import { Box, Link, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FluidObject } from 'gatsby-image';

import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Body, Title } from 'web-components/lib/components/typography';
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
  return (
    <div>
      <Link
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Box
          sx={theme => ({
            bgcolor: 'secondary.main',
            borderRadius: '50%',
            transitionDuration: '200ms',
            transitionProperty: 'color, background-color',
            transitionTimingFunction: 'ease-in-out',
            width: {
              xs: theme.spacing(15),
              tablet: theme.spacing(30),
            },
            height: {
              xs: theme.spacing(15),
              tablet: theme.spacing(30),
            },
            ':hover': {
              bgcolor: 'secondary.light',
            },
            '& svg': {
              color: 'transparent',
              width: '100%',
              height: '100%',
              p: {
                xs: small ? 3 : 0,
                tablet: small ? 6 : 0,
              },
            },
          })}
        >
          {icon}
        </Box>
      </Link>
      <Title
        color="primary"
        align="center"
        sx={{
          fontSize: theme => [14, 16, theme.typography.h4.fontSize],
          pt: [1.5, 5.25],
        }}
      >
        {label}
      </Title>
      {subLabel && (
        <Body
          size="lg"
          mobileSize="sm"
          color="primary.main"
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            pt: [1.5, 5.25],
          }}
        >
          {subLabel}
        </Body>
      )}
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
      <Grid container spacing={4} justifyContent="center" rowGap={8}>
        {icons.map((item, i) => (
          <Grid item xs={4} md={2} className={itemClassName} key={i}>
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
