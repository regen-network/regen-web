import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import type { Variant } from '@mui/material/styles/createTypography';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';

interface Props {
  className?: string;
  titleClassName?: string;
  titleVariant?: Variant;
  body?: React.ReactNode;
  header?: React.ReactNode;
  linearGradient?: string;
  linearGradientMobile?: string;
  children?: React.ReactNode;
  imageData: any;
  imageDataMobile?: any;
  topSection?: boolean;
}

interface StyleProps {
  linearGradient?: string;
  linearGradientMobile?: string;
  topSection?: boolean;
  titleVariant?: Variant;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingTop: props.topSection ? theme.spacing(70) : theme.spacing(17.75),
      paddingBottom: theme.spacing(13),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: props.topSection ? theme.spacing(80) : theme.spacing(21.5),
      paddingBottom: theme.spacing(27.5),
    },
    backgroundSize: 'cover',
  }),
  backgroundGradient: props => ({
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      background:
        props.linearGradient ||
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    [theme.breakpoints.down('sm')]: {
      background:
        props.linearGradientMobile ||
        props.linearGradient ||
        'linear-gradient(180deg, rgba(255, 249, 238, 0.74) 0%, rgba(255, 249, 238, 0) 27.6%), linear-gradient(194.2deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%)',
    },
    opacity: 0.8,
  }),
  text: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      '& h1': {
        maxWidth: theme.spacing(220),
      },
      '& div': {
        [theme.breakpoints.up('sm')]: {
          maxWidth: theme.spacing(167.5),
        },
      },
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    position: 'relative',
  },
  children: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    zIndex: 1,
    position: 'relative',
  },
}));

const BackgroundSection = ({
  className,
  titleClassName,
  titleVariant = 'h1',
  imageData,
  imageDataMobile,
  linearGradient,
  linearGradientMobile,
  body,
  header,
  children,
  topSection = true,
}: Props): JSX.Element => {
  const classes = useStyles({
    titleVariant,
    linearGradientMobile,
    linearGradient,
    topSection,
  });
  let headerJSX: JSX.Element | null = null;
  let bodyJSX: JSX.Element | null = null;
  let textJSX: JSX.Element | null = null;
  // Tried to use && operator, but it doesn't seem to play nicely with passing in dynamic props to the object
  if (header) {
    headerJSX = (
      <Title
        as="div"
        color="primary"
        variant={titleVariant}
        className={titleClassName}
      >
        {header}
      </Title>
    );
  }
  if (body) {
    bodyJSX = (
      <Body as="div" size="xl" sx={{ color: 'primary.main', pt: [3, 3.75] }}>
        {body}
      </Body>
    );
  }
  if (body || header) {
    textJSX = (
      <div className={classes.text}>
        {headerJSX}
        {bodyJSX}
      </div>
    );
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BackgroundImage
      Tag="section"
      className={clsx(className, classes.root)}
      fluid={imageDataMobile && isMobile ? imageDataMobile : imageData}
      backgroundColor="transparent"
    >
      {linearGradient !== 'unset' && (
        <div className={classes.backgroundGradient} />
      )}
      {textJSX}
      <div className={classes.children}>{children}</div>
    </BackgroundImage>
  );
};

export default BackgroundSection;
