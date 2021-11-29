import React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';

const TopSection = (): JSX.Element => {
  const gradient =
    'linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)';

  return (
    <StaticQuery
      query={graphql`{
  background: file(relativePath: {eq: "gulls.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  backgroundMobile: file(relativePath: {eq: "gulls.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: teamYaml {
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
