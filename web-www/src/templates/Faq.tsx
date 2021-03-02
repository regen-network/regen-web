import React, { useState, useEffect } from 'react';
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

  const [question, setQuestion] = useState<number | undefined>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams) {
        const question = urlParams.get('question');
        if (question) {
          setQuestion(parseInt(question));
        }
      }
    }
  }, []);

  return (
    <Faq
      header={props.pageContext.header}
      question={question}
      categories={data.faqYaml.categories}
      {...props}
    />
  );
};

export default FAQPage;
