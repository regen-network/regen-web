import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { ResourcesTopSectionQuery } from '../../generated/graphql';

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(211.73deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 25.06%)';
  /**
   * Tried using background position to make the mobile background-image correct,
   * but it's actually a totally different image in the mockup, not just a different position.
   * Wired up BackgroundSection to take an imageDataMobile prop.
   */
  return (
    <StaticQuery
      query={graphql`
        query resourcesTopSection {
          background: file(relativePath: { eq: "resources-top-image.jpg" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          backgroundMobile: file(
            relativePath: { eq: "resources-top-image-mobile.jpg" }
          ) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          sanityResourcesPage {
            topSection {
              title
              body
            }
          }
        }
      `}
      render={(data: ResourcesTopSectionQuery) => {
        const { background, backgroundMobile, sanityResourcesPage } = data;
        const content = sanityResourcesPage?.topSection;
        return (
          <>
            <BackgroundSection
              linearGradient={gradient}
              header={content?.title}
              body={content?.body}
              imageData={background?.childImageSharp?.fluid}
              imageDataMobile={backgroundMobile?.childImageSharp?.fluid}
            />
          </>
        );
      }}
    />
  );
};

export default TopSection;
