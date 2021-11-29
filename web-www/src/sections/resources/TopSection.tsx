import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';

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
      query={graphql`{
  background: file(relativePath: {eq: "resources-top-image.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  backgroundMobile: file(relativePath: {eq: "resources-top-image-mobile.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
        return <>
          <BackgroundSection
            linearGradient={gradient}
            header={data.text.topSection.header}
            body={data.text.topSection.body}
            imageData={data.background.childImageSharp.gatsbyImageData}
            imageDataMobile={data.backgroundMobile.childImageSharp.gatsbyImageData}
          />
        </>;
      }}
    />
  );
};

export default TopSection;
