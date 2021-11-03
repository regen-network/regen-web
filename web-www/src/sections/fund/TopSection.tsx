import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles<Theme>(theme => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  },
}));

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "waterfall.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: fundYaml {
        topSection {
          header
          body
        }
      }
    }
  `);
  const content = data?.text?.topSection;
  const imageData = data?.background?.childImageSharp?.fluid;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={content.header}
      body={ReactHtmlParser(content?.body)}
      imageData={imageData}
    />
  );
};

export default TopSection;
