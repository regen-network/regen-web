import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, CardContent, Typography } from '@material-ui/core';
import Img, { FluidObject } from 'gatsby-image';

import Section from 'web-components/src/components/section';
import Title from 'web-components/src/components/title';
import Card from 'web-components/src/components/cards/Card';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {},
  },
  card: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '40%',
      maxHeight: '100%',
      '& picture img': {
        objectPosition: '8% !important',
      },
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      '& picture img': {
        objectPosition: '29% !important',
      },
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxHeight: theme.spacing(50),
      '& picture img': {
        objectPosition: 'center center',
      },
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
      '&:last-child': {
        paddingBottom: theme.spacing(12),
      },
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(10, 4.5),
    },
  },
  subtitle: {
    margin: theme.spacing(4, 0),
    color: theme.palette.info.main,
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
}));

type QueryData = {
  text: {
    infoSection: {
      title: string;
      subtitle: string;
      body: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
};

const InfoSection = (): JSX.Element => {
  const styles = useStyles();

  const {
    text: {
      infoSection: { image, title, subtitle, body },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        infoSection {
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          title
          subtitle
          body
        }
      }
    }
  `);

  return (
    <Section className={styles.root}>
      <Card className={styles.card}>
        <Img className={styles.image} fluid={image?.childImageSharp?.fluid} title="Bird" alt="Bird" />
        <CardContent className={styles.cardContent}>
          <Title variant="h3">{title}</Title>
          <Typography className={styles.subtitle}>{subtitle}</Typography>
          <Description>{body}</Description>
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoSection;
