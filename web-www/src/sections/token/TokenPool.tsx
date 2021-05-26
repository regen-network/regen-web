import React from 'react';
import { Theme, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(24),
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    margin: theme.spacing(4, 0, 8),
  },
  image: {
    width: '100%',
  },
}));

type QueryData = {
  text: {
    tokenPool: {
      title: string;
      subtitle: string;
      imageAltText: string;
      imageTitle: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      mobileImage: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
};

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    text: {
      tokenPool: { title, subtitle, image, mobileImage, imageAltText, imageTitle },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        tokenPool {
          title
          subtitle
          imageAltText
          imageTitle
          subtitle
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          mobileImage {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);

  return isMobile ? (
    <div className={styles.root}>
      <Img
        className={styles.image}
        fluid={mobileImage.childImageSharp.fluid}
        title={imageTitle}
        alt={imageAltText}
      />
    </div>
  ) : (
    <Section className={clsx(styles.root, styles.center)} title={title} titleVariant="h3">
      <Description className={clsx(styles.content, styles.center)}>{subtitle}</Description>
      <Img
        className={styles.image}
        fluid={image.childImageSharp.fluid}
        title={imageTitle}
        alt={imageAltText}
      />
    </Section>
  );
};
export default TokenEconomics;
