import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';

import Faq from '../components/Faq';
import { FAQProps } from 'web-components/lib/components/faq';
import { FaqPageQuery } from '../generated/graphql';
import { BlockContent } from 'web-components/lib/components/block-content';

const query = graphql`
  query faqPage {
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

const FAQPage = (props: PageProps): JSX.Element => {
  const { sanityFaqPage } = useStaticQuery<FaqPageQuery>(query);
  const categories = (sanityFaqPage?.categories || []).map(category => {
    return {
      header: category?.header,
      questions: (category?.questions || []).map(question => {
        return {
          question: question?.question || '',
          answer: <BlockContent padYMargin content={question?._rawAnswer} />,
        };
      }),
    } as FAQProps['categories'][0];
  });

  return <Faq categories={categories} {...props} />;
};

export default FAQPage;
