import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import FAQSection from '../shared/FAQSection';

const BuyersFAQSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      text: buyersYaml {
        faqSection {
          header
          image {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);
  const content = data.text.faqSection;
  const imageData = content.image.childImageSharp.fluid;

  return <FAQSection header={content.header} category="carbonplus credits" imageData={imageData} />;
};

export default BuyersFAQSection;
