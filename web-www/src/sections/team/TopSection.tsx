import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { TeamTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query teamTopSection {
    background: file(relativePath: { eq: "people-walking-outline.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    backgroundMobile: file(relativePath: { eq: "people-walking-outline.jpg" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityTeamPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)';
  const { background, backgroundMobile, sanityTeamPage } =
    useStaticQuery<TeamTopSectionQuery>(query);
  const data = sanityTeamPage?.topSection;
  return (
    <BackgroundSection
      linearGradient={gradient}
      header={data?.title}
      body={data?.body}
      imageData={background?.childImageSharp?.fluid}
      imageDataMobile={backgroundMobile?.childImageSharp?.fluid}
    />
  );
};

export default TopSection;
