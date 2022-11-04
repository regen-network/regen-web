import React from 'react';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import { FAQProps } from '@regen-network/web-components/lib/components/faq';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import Faq from '../components/Faq';
import { FaqPageQuery } from '../generated/graphql';

interface Props extends PageProps {
  pageContext: {
    header: string;
  };
}

// This should match the query in /pages/faq for types to work correctly
const query = graphql`
  query {
    sanityFaqPage {
      categories {
        header
        questions {
          question
          _rawAnswer
        }
      }
    }
  }
`;

const FAQPage = (props: Props): JSX.Element => {
  const { sanityFaqPage } = useStaticQuery<FaqPageQuery>(query);
  const categories = (sanityFaqPage?.categories || []).map(category => {
    return {
      header: category?.header,
      questions: (category?.questions || []).map(question => {
        return {
          question: question?.question || '',
          answer: <BlockContent content={question?._rawAnswer} />,
        };
      }),
    } as FAQProps['categories'][0];
  });

  return (
    <>
      <Faq
        header={props.pageContext.header}
        categories={categories}
        {...props}
      />
    </>
  );
};

export default FAQPage;
