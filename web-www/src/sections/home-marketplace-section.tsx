import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(200),
    color: theme.palette.primary.contrastText,
    'background-color': theme.palette.primary.main,
    'font-family': theme.typography.h1.fontFamily,
    'text-align': 'center',
    'padding-top': theme.spacing(45),
    '& h2': {
      width: '70%',
      'font-family': 'Muli',
      margin: '0 auto',
      'line-height': '150%',
      'padding-bottom': theme.spacing(10),
      'margin-bottom': theme.spacing(2),
      'font-weight': 900,
    },
    '& h3': {
      'line-height': '140%',
      'margin-bottom': theme.spacing(1),
    },
    '& p': {
      'margin-bottom': '0px',
      'line-height': '150%',
      'font-family': 'Lato',
    },
    '& .MuiGrid-item.MuiGrid-root': {
      padding: theme.spacing(1),
      'padding-left': theme.spacing(3),
      'padding-right': theme.spacing(3),
      '& p': {
        color: theme.palette.info.dark,
        'margin-bottom': theme.spacing(3),
      },
    },
  },
  bgdiv: {
    'margin-bottom': theme.spacing(4),
  },
  buttonpad: {
    padding: '0px',
  },
  inner: {
    'max-width': '85%',
    margin: '0 auto',
  },
  smallTag: {
    'text-transform': 'uppercase',
    'font-family': 'Muli',
    color: theme.palette.grey[100],
    'margin-bottom': theme.spacing(5),
  },
  smallTitle: {
    color: theme.palette.info.main,
  },
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  container: {
    'padding-right': theme.spacing(40),
    'padding-left': theme.spacing(40),
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(2)} ${theme.spacing(8.5)}`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

const MarketplaceSection = () => {
  const data = useStaticQuery(graphql`
    query {
      farmer: file(relativePath: { eq: "farmer.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      buyers: file(relativePath: { eq: "buyers.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      ellipse: file(relativePath: { eq: "green-ellipse.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 120) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);

  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.smallTag}>The Marketplace for Climate Solutions</div>
        <h2>
          The Regen Registry allows land stewards to sell their ecosystem services directly to buyers around
          the world.
        </h2>
        <Grid className={classes.container} container spacing={3}>
          <Grid item xs>
            <BackgroundImage className={classes.bgdiv} Tag="div" fixed={data.ellipse.childImageSharp.fixed}>
              <Img fixed={data.farmer.childImageSharp.fixed} className={classes.icon} />
            </BackgroundImage>
            <div className={classes.smallTitle}>Land Stewards</div>
            <h3>Register a project</h3>
            <p>
              Get paid for your ecological practices, such as cover cropping, crop rotation, agroforestry,
              rotational grazing, and more.
            </p>
            <ContainedButton className={classes.button}>List Your Project</ContainedButton>
          </Grid>
          <Grid item xs>
            <BackgroundImage className={classes.bgdiv} Tag="div" fixed={data.ellipse.childImageSharp.fixed}>
              <Img fixed={data.buyers.childImageSharp.fixed} className={classes.icon} />
            </BackgroundImage>
            <div className={classes.smallTitle}>Buyers</div>
            <h3>Purchase credits</h3>
            <p>
              Whether you are an individual or a business looking to take climate action, we make it easy to
              sponsor ecological practices.
            </p>
            <ContainedButton className={classes.button}>Browse Projects</ContainedButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MarketplaceSection;
