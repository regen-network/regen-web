import React from 'react';
import { Box, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { Center } from '@regen-network/web-components/lib/components/box';
import clsx from 'clsx';
import { FluidObject } from 'gatsby-image';

import BackgroundSection from './BackgroundSection';

interface StyleProps {
  small?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(28.5),
    },
  },
}));

export interface IconLabelProps {
  icon: JSX.Element;
  label: string;
  subLabel?: string;
  href: string;
  isCompact?: boolean;
  smallSvg?: boolean;
}

interface ConnectSectionProps {
  header: string;
  icons: IconLabelProps[];
  itemClassName?: string;
  /** removes `label` and `subLabel on items, presents in a more compact form */
  isCompact?: boolean;
  titleClassName?: string;
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
  isCompact = false,
  smallSvg = false,
}: IconLabelProps): JSX.Element => {
  const mobileSize = isCompact ? 20 : 30;
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
            background:
              'linear-gradient(201.8deg, #4FB573 14.67%, #B9E1C7 97.14%);',
            borderRadius: '50%',
            transition: 'all 200ms ease-in-out',
            width: {
              xs: theme.spacing(15),
              tablet: theme.spacing(mobileSize),
            },
            height: {
              xs: theme.spacing(15),
              tablet: theme.spacing(mobileSize),
            },
            ':hover': {
              color: 'secondary.light',
              background: theme.palette.secondary.light,
              bgcolor: 'secondary.light',
            },
            '& svg': {
              color: 'transparent',
              width: '100%',
              height: '100%',
              p: {
                xs: smallSvg ? 3 : 0,
                tablet: smallSvg ? 6 : 0,
              },
            },
          })}
        >
          {icon}
        </Box>
      </Link>
      {!isCompact && (
        <>
          <Title
            color="primary"
            align="center"
            variant="h5"
            sx={{ pt: [1.5, 5.25] }}
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
        </>
      )}
    </div>
  );
};

const ConnectSection = ({
  header,
  titleClassName,
  className,
  background,
  isCompact,
  icons,
  itemClassName,
}: ConnectSectionProps): JSX.Element => {
  const classes = useStyles({});
  return (
    <BackgroundSection
      className={clsx(className, classes.root)}
      linearGradient="unset"
      topSection={false}
      imageData={background.childImageSharp.fluid}
    >
      <Center
        col
        sx={theme => ({
          maxWidth: isCompact ? theme.spacing(185) : 'auto',
          margin: '0 auto',
        })}
      >
        <Title
          className={titleClassName}
          variant="h2"
          mobileVariant="h3"
          align="center"
          color="primary.main"
        >
          {header}
        </Title>
        <Grid
          container
          spacing={4}
          justifyContent={['space-around', 'center']}
          rowGap={8}
          columnGap={1}
          sx={{ mt: [8, 10] }}
        >
          {icons.map((item, i) => (
            <Grid item xs={3} md={2} className={itemClassName} key={i}>
              <IconLabel
                href={item.href}
                icon={item.icon}
                smallSvg={item.smallSvg}
                label={item.label}
                isCompact={isCompact}
                subLabel={item.subLabel}
              />
            </Grid>
          ))}
        </Grid>
      </Center>
    </BackgroundSection>
  );
};

export default ConnectSection;
