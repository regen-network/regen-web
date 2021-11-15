import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';

import BackgroundSection from '../../components/BackgroundSection';
import { FluidObject } from 'gatsby-image';
import GreenTopIconCard from 'web-components/src/components/cards/GreenTopIconCard';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 900,
    margin: theme.spacing(7, 0, 4),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(10),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
  description: {
    color: 'white',
    textAlign: 'center',
    maxWidth: theme.spacing(150),
    fontSize: theme.spacing(5),
    margin: theme.spacing(5, 0),
  },
  itemWrap: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },
}));

type InfoItem = {
  title: string;
  description: string;
  gitLink: string;
  icon: {
    publicURL: string;
  };
};

type QueryData = {
  background: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  text: {
    whatsNextSection: {
      title: string;
      description: string;
      infoItems: InfoItem[];
    };
  };
};

const WhatsNextSection: React.FC = () => {
  const {
    background: { childImageSharp },
    text: {
      whatsNextSection: { title, description, infoItems },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      background: file(relativePath: { eq: "mainnet-whats-next.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: mainnetYaml {
        whatsNextSection {
          title
          description
          infoItems {
            title
            description
            gitLink
            icon {
              extension
              publicURL
            }
          }
        }
      }
    }
  `);
  const classes = useStyles();
  return (
    <BackgroundSection
      className={classes.root}
      linearGradient="linear-gradient(209.5deg, rgba(250, 235, 209, 0.8) 12.63%, rgba(125, 201, 191, 0.8) 44.03%, rgba(81, 93, 137, 0.8) 75.43%);"
      imageData={childImageSharp.fluid}
    >
      <Grid container direction="column" alignItems="center">
        <Typography variant="h1" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
        <Grid container direction="row" justify="center">
          {infoItems.map(({ description, title, gitLink, icon }, i) => (
            <GreenTopIconCard
              key={i}
              description={description}
              title={title}
              linkURL={gitLink}
              imgSrc={icon.publicURL}
            />
          ))}
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default WhatsNextSection;
