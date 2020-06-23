import React from 'react';
import BackgroundImage from 'gatsby-background-image';
import clsx from 'clsx';
import { graphql, StaticQuery, useStaticQuery } from 'gatsby';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { makeStyles, Theme } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import Img from 'gatsby-image';

let useStyles = makeStyles((theme: Theme) => ({
  section: {
    height: 'min-content',
    'font-size': theme.typography.body2.fontSize,
    'padding-top': theme.spacing(30),
    'padding-bottom': theme.spacing(45),
    'text-align': 'center',
    '& p': {
      'max-width': theme.spacing(100),
      'text-align': 'left',
    },
  },
  img: {
    'min-width': 'fit-content',
    'margin-right': theme.spacing(10),
  },
  grid: {
    width: 'auto',
    display: 'inline-flex',
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
  green: {
    color: theme.palette.secondary.main,
  },
}));

interface Props {
  className?: string;
}

const HomeLedger = ({ className }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "farm-background.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      ledger: file(relativePath: { eq: "ledger.png" }) {
        childImageSharp {
          fixed(quality: 90, width: 300) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `);
  let classes = useStyles();
  return (
    <BackgroundImage
      Tag="section"
      className={clsx(classes.section, className)}
      fluid={data.bg.childImageSharp.fluid}
    >
      <Grid className={classes.grid} wrap="nowrap" container spacing={3}>
        <Grid className={classes.img} item sm={4}>
          <Img fixed={data.ledger.childImageSharp.fixed}></Img>
        </Grid>
        <Grid item sm={6} md={8}>
          <Title align="left" variant="h2">
            The <span className={classes.green}>Regen Ledger</span> powers our work
          </Title>
          <p>
            Regen Ledger is a public, proof of stake (POS) blockchain developed with the Cosmos Software
            Development Kit (SDK) built for verification of claims, agreements & data related to ecological
            state. Regen Ledger enables multiple registries to communicate and transact with each other
            producing a public ecological accounting system. Get involved with our community of developers.
          </p>
          <ContainedButton className={classes.button}>Learn More</ContainedButton>
        </Grid>
      </Grid>
    </BackgroundImage>
  );
};

export default HomeLedger;
