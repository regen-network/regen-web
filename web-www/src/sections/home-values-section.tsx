import React from 'react';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import BackgroundImage from 'gatsby-background-image';
import Title from 'web-components/lib/components/Title';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Img from 'gatsby-image';

interface Props {
  className?: string;
}

let useStyles = makeStyles((theme: Theme) => ({
  root: {},
  values: {},
  section: {
    '& .MuiGrid-item': {
      'max-width': theme.spacing(70),
    },
    '& h2': {
      'margin-bottom': theme.spacing(15),
      'line-height': '130%',
    },
    ' & p': {
      'font-family': 'Lato',
      'font-size': theme.typography.body2.fontSize,
      'line-height': '150%',
    },
    ' & h4': {
      'margin-bottom': theme.spacing(5),
    },
    'text-align': 'center',
    height: 'min-content',
    'padding-bottom': theme.spacing(15),
    'padding-top': theme.spacing(15),
  },
  ellipse: {},
  icon: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const HomeValues = ({ className }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "topography.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      shield: file(relativePath: { eq: "shield-icon.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      eye: file(relativePath: { eq: "eye.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      handshake: file(relativePath: { eq: "handshake.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 80) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      boxes: file(relativePath: { eq: "boxes.png" }) {
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

  const classes = useStyles();

  return (
    <BackgroundImage
      Tag="section"
      className={clsx(className, classes.section)}
      fluid={data.bg.childImageSharp.fluid}
    >
      <Title align="center" variant="h2">
        The values grounding our work
      </Title>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <BackgroundImage
            Tag="div"
            className={clsx(classes.ellipse)}
            fixed={data.ellipse.childImageSharp.fixed}
          >
            <Img
              fixed={data.eye.childImageSharp.fixed}
              style={{ position: 'absolute' }}
              className={classes.icon}
            ></Img>
          </BackgroundImage>
          <Title align="center" variant="h4">
            Transparency
          </Title>
          <p>
            We not only monitor ecological impact, we share our data and insights for the betterment of the
            whole system.
          </p>
        </Grid>
        <Grid item>
          <BackgroundImage
            Tag="div"
            className={clsx(classes.ellipse)}
            fixed={data.ellipse.childImageSharp.fixed}
          >
            <Img
              fixed={data.handshake.childImageSharp.fixed}
              style={{ position: 'absolute' }}
              className={classes.icon}
            ></Img>
          </BackgroundImage>
          <Title align="center" variant="h4">
            Trust
          </Title>
          <p>
            By tracking and verifying outcomes, we enable stakeholders to know that credits represent real
            impact.
          </p>
        </Grid>
        <Grid item>
          <BackgroundImage
            Tag="div"
            className={clsx(classes.ellipse)}
            fixed={data.ellipse.childImageSharp.fixed}
          >
            <Img
              fixed={data.shield.childImageSharp.fixed}
              style={{ position: 'absolute' }}
              className={classes.icon}
            ></Img>
          </BackgroundImage>
          <Title align="center" variant="h4">
            Accountability
          </Title>
          <p>
            Our fully auditable ecosystem services contracts ensure integrity and mutual responsibility
            between parties.
          </p>
        </Grid>
        <Grid item>
          <BackgroundImage
            Tag="div"
            className={clsx(classes.ellipse)}
            fixed={data.ellipse.childImageSharp.fixed}
          >
            <Img
              fixed={data.boxes.childImageSharp.fixed}
              style={{ position: 'absolute' }}
              className={classes.icon}
            ></Img>
          </BackgroundImage>
          <Title align="center" variant="h4">
            Decentralization
          </Title>
          <p>
            Our platform builds an empowered collective of actors, forgoing the expenses and inefficiencies of
            third parties
          </p>
        </Grid>
      </Grid>
    </BackgroundImage>
  );
};

export default HomeValues;
