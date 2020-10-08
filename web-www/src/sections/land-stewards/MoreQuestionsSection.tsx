import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import FAQSection from '../shared/FAQSection';

const MoreQuestionsSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "more-questions-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: landStewardsYaml {
        moreQuestionsSection {
          header
        }
      }
    }
  `);
  const content = data.text.moreQuestionsSection;
  const imageData = data.background.childImageSharp.fluid;

  return <FAQSection header={content.header} category="carbonplus credits" imageData={imageData} />;
};

export default MoreQuestionsSection;
