import React from 'react';
import Img, { FluidObject } from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import ImageGrid from 'web-components/lib/components/image-grid';

type Image = {
  childImageSharp: {
    fluid: FluidObject;
  };
};

type Item = {
  header: string;
  description: string;
  image: Image;
};

type QueryData = {
  bg: any;
  text: {
    imageGridSection: {
      items: Item[];
    };
  };
};

const ImageGridSection: React.FC = () => {
  const data = useStaticQuery<QueryData>(graphql`
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
