import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundSection from '../../components/BackgroundSection';

const RegistrySection = (): JSX.Element => {
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "image-grid-bg.png" }) {
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
            <BackgroundSection header="Regen Registry" imageData={data.background.childImageSharp.fluid} />
          </>
        );
      }}
    />
  );
};

export default RegistrySection;
