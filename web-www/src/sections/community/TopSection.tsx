import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { CommunityTopSectionQuery } from '../../generated/graphql';

const query = graphql`
  query communityTopSection {
    desktop: file(relativePath: { eq: "community-header.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCommunityPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const data = useStaticQuery<CommunityTopSectionQuery>(query);
  const imageData = data?.desktop?.childImageSharp?.fluid;
  const content = data?.sanityCommunityPage?.topSection;
  return (
    <>
      <BackgroundSection
        linearGradient="none" // gradient applied in image
        linearGradientMobile="none"
        header={content?.title}
        body={content?.body}
        imageData={imageData}
      />
    </>
  );
};

export default TopSection;
