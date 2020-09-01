import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core/';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(42.75),
    },
  },
}));

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(211.73deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 25.06%)';
  const classes = useStyles();
  /**
   * Tried using background position to make the mobile background-image correct, but it's actually a totally different image in the mockup, not just a different position. Wired up BackgroundSection to take an imageDataMobile prop.
   */
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "resources-top-image.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          backgroundMobile: file(relativePath: { eq: "resources-top-image-mobile.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: resourcesYaml {
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
