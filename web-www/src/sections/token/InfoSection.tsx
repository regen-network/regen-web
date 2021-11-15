import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, CardContent, Typography } from '@mui/material';
import Img, { FluidObject } from 'gatsby-image';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import Title from 'web-components/src/components/title';
import Card from 'web-components/src/components/cards/Card';
import Description from 'web-components/src/components/description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
    },
    [theme.breakpoints.between('xs', 834)]: {
      '& picture img': {
        objectPosition: '71% !important',
      },
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxHeight: theme.spacing(50),
      '& picture img': {
        objectPosition: 'center 27% !important',
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
  body: {
    color: theme.palette.info.dark,
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(22),
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
      signupText: string;
      imageAltText: string;
      imageTitle: string;
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
      infoSection: { image, title, subtitle, body, signupText, imageAltText, imageTitle },
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
          signupText
          imageAltText
          imageTitle
        }
      }
    }
  `);

  const scrollToSignup = (): void => {
    const signup = document.getElementById('newsletter-signup');
    signup?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <Card className={styles.card}>
        <Img
          className={styles.image}
          fluid={image?.childImageSharp?.fluid}
          title={imageTitle}
          alt={imageAltText}
        />
        <CardContent className={styles.cardContent}>
          <Title variant="h3">{title}</Title>
          <Typography className={styles.subtitle}>{subtitle}</Typography>
          <Description className={styles.body}>{ReactHtmlParser(body)}</Description>
          <Description className={styles.body}>
            <div onClick={() => scrollToSignup()}>{ReactHtmlParser(signupText)}</div>
          </Description>
        </CardContent>
      </Card>
    </Section>
  );
};

export default InfoSection;
