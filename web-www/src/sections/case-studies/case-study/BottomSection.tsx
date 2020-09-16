import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { graphql, StaticQuery } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import Img, { FluidObject } from 'gatsby-image';
import clsx from 'clsx';

import BackgroundSection from '../../../components/BackgroundSection';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

interface BottomSectionProps {
  quote: string;
  person: {
    name: string;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    role: string;
  };
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(19.5),
      paddingBottom: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(41),
      paddingBottom: theme.spacing(30),
    },
  },
  title: {
    color: theme.palette.primary.main,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5.5),
      lineHeight: '150%',
    },
    [theme.breakpoints.up('sm')]: {
      lineHeight: '140%',
    },
  },
  image: {
    borderRadius: '50%',
    border: `1px solid ${theme.palette.info.dark}`,
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(15.5),
      width: theme.spacing(15),
      // paddingTop: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(19.75),
      width: theme.spacing(18),
    },
  },
  quotes: {
    color: theme.palette.secondary.main,
    lineHeight: 0,
    zIndex: 0,
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(15),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(25),
    },
  },
  textQuote: {
    position: 'relative',
    zIndex: 1,
  },
  firstQuote: {
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(4),
      left: theme.spacing(-1.75),
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(6),
      left: theme.spacing(-8.75),
    },
  },
  secondQuote: {
    bottom: theme.spacing(2.5),
    marginLeft: theme.spacing(-2),
  },
  name: {
    color: theme.palette.secondary.contrastText,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 800,
  },
  role: {
    color: theme.palette.primary.main,
    lineHeight: '150%',
    paddingTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(5),
    },
  },
  person: {
    paddingTop: theme.spacing(10),
  },
}));

const BottomSection = ({ background, quote, person }: BottomSectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <BackgroundSection
      topSection={false}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.5) 12.63%, rgba(125, 201, 191, 0.5) 44.03%, rgba(81, 93, 137, 0.5) 75.43%)"
      imageData={background.childImageSharp.fluid}
      className={classes.root}
    >
      <Title variant="h3" className={classes.title}>
        <span className={clsx(classes.firstQuote, classes.quotes)}>“</span>
        <span className={classes.textQuote}>{quote}</span>
        <span className={clsx(classes.secondQuote, classes.quotes)}>”</span>
      </Title>
      <Grid className={classes.person} container alignItems="center">
        <Img className={classes.image} fluid={person.image.childImageSharp.fluid} />
        <div className={classes.text}>
          <Title variant="h5" className={classes.name}>
            {person.name}
          </Title>
          <div className={classes.role}>{person.role}</div>
        </div>
      </Grid>
    </BackgroundSection>
  );
};

export default BottomSection;
