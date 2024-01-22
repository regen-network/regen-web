import { BlockContent } from 'web-components/src/components/block-content';
import { FAQProps } from 'web-components/src/components/faq';

import { FaqPageQuery } from '@/generated/sanity-graphql';

type Params = {
  categories: FaqPageQuery['allFaqPage'][0]['categories'];
};

export const normalizeFaqCategories = ({
  categories,
}: Params): FAQProps['categories'] =>
  (categories ?? []).map(category => {
    return {
      header: category?.header ?? '',
      questions: (category?.questions || []).map(question => {
        return {
          question: question?.question ?? '',
          answer: <BlockContent content={question?.answerRaw} />,
        };
      }),
    };
  });
