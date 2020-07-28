import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import ImageGrid from 'web-components/lib/components/image-grid';

const ImageGridSection = () => {
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "image-grid-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: buyersYaml {
        imageGridSection {
          items {
            image {
              childImageSharp {
                fluid(quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            header
            description
          }
        }
      }
    }
  `);
  const content = data.text.imageGridSection;
  return (
    <div>
      {content.items.map(({ image, header, description }, index) => (
        <BackgroundImage Tag="div" fluid={data.bg.childImageSharp.fluid} key={index}>
          <ImageGrid
            img={<Img fluid={image.childImageSharp.fluid} />}
            title={header}
            description={description}
            even={index % 2 === 0}
          />
        </BackgroundImage>
      ))}
    </div>
  );
};

export default ImageGridSection;
