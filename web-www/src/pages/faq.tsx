import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import Faq from '../components/Faq';

const FAQPage = (props: PageProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      faqYaml {
        categories {
          header
          questions {
            question
            answer
          }
        }
      }
    }
  `);

  return <Faq categories={data.faqYaml.categories} {...props} />;
};

export default FAQPage;
