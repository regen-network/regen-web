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

  const [questionId, setQuestionId] = useState<string | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.substr(1);
      if (hash) {
        setQuestionId(hash);
      }
    }
  }, []);

  return (
    <>
      <Faq
        header={props.pageContext.header}
        questionId={questionId}
        categories={data.faqYaml.categories}
        {...props}
      />
    </>
  );
};

export default FAQPage;
