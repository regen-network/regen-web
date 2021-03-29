import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

import BackgroundSection from '../../components/BackgroundSection';

interface props {
  location: Location;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    filter: `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05))`,
  },
}));

const TopSection = ({ location }: props): JSX.Element => {
  const classes = useStyles({});
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "community-header-sm.jpg" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: communityYaml {
        topSection {
          header
          body
        }
      }
    }
  `);
  const imageData = data.desktop.childImageSharp.fluid;
  const content = data.text.topSection;
  return (
    <>
      <BackgroundSection
        className={classes.section}
        linearGradient="linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%);"
        linearGradientMobile="linear-gradient(220.67deg, rgba(250, 235, 209, 0.6) 21.4%, rgba(125, 201, 191, 0.6) 46.63%, rgba(81, 93, 137, 0.6) 71.86%), linear-gradient(180deg, rgba(0, 0, 0, 0.684) 0%, rgba(0, 0, 0, 0) 97.78%)"
        header={content.header}
        body={content.body}
        imageData={imageData}
      ></BackgroundSection>
    </>
  );
};

export default TopSection;
