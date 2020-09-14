import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    // [theme.breakpoints.down('xs')]: {
    //   filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05))',
    // },
  },
}));

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)';
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "case-studies-top-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: caseStudiesYaml {
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
            />
          </>
        );
      }}
    />
  );
};

export default TopSection;
