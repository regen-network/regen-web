import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';

const TopSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "community-header.png" }) {
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
  const imageData = data?.desktop?.childImageSharp?.fluid;
  const content = data?.text?.topSection;
  return (
    <>
      <BackgroundSection
        linearGradient="none" // gradient applied in image
        linearGradientMobile="none"
        header={content.header}
        body={content.body}
        imageData={imageData}
      ></BackgroundSection>
    </>
  );
};

export default TopSection;
