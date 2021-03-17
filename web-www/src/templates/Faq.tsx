import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import Faq from '../components/Faq';

interface Props extends PageProps {
  pageContext: {
    header: string;
  };
}

const FAQPage = (props: Props): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      faqYaml: faqYaml {
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

  return (
    <>
      <Faq header={props.pageContext.header} categories={data.faqYaml.categories} {...props} />
    </>
  );
};

export default FAQPage;
