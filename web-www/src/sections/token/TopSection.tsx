import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { Theme, makeStyles } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';
import Title from 'web-components/lib/components/title';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  token: {
    width: 70,
    height: 70,
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
    },
  },
}));

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "token-aurora.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: tokenYaml {
        topSection {
          header
          body
          image {
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
  const content = data?.text?.topSection;
  const imageData = data?.background?.childImageSharp?.fluid;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(180deg, #000000 6.73%, rgba(0, 0, 0, 0) 30.65%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={
        <div className={styles.header}>
          <Img
            className={styles.token}
            fluid={content?.image?.childImageSharp?.fluid}
            alt="Regen Token"
            title="REGEN Token"
          />
          <Title color="primary" variant="h1">
            {content.header}
          </Title>
        </div>
      }
      body={content?.body}
      imageData={imageData}
    />
  );
};

export default TopSection;
