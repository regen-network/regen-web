import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@mui/material/';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05))',
    },
  },
}));

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%), linear-gradient(235.95deg, rgba(250, 235, 209, 0.7) 22.17%, rgba(125, 201, 191, 0.7) 46.11%, rgba(81, 93, 137, 0.7) 70.05%)';
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "science.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          backgroundMobile: file(relativePath: { eq: "science-mobile.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: scienceYaml {
            topSection {
              header
              body
            }
          }
        }
      `}
      render={data => {
        return (
          <>
            <BackgroundSection
              linearGradient={gradient}
              header={data.text.topSection.header}
              body={data.text.topSection.body}
              className={classes.section}
              imageData={data.background.childImageSharp.fluid}
              imageDataMobile={data.backgroundMobile.childImageSharp.fluid}
            />
          </>
        );
      }}
    />
  );
};

export default TopSection;
