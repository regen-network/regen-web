import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { PresskitTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query presskitTopSection {
    background: file(relativePath: { eq: "press-kit-top-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityPresskitPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const { sanityPresskitPage: data, background } =
    useStaticQuery<PresskitTopSectionQuery>(query);
  const content = data?.topSection;
  const imageData = background?.childImageSharp?.fluid;
  return (
    <BackgroundSection
      linearGradient="linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)"
      header={content?.title}
      body={content?.body}
      imageData={imageData}
    />
  );
};

export default TopSection;
