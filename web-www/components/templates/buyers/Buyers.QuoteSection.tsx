import { QuoteSection } from 'web-components/src/components/organisms/QuoteSection/QuoteSection';

import { AllBuyersPageQuery } from '@/generated/sanity-graphql';

type Props = {
  content: AllBuyersPageQuery['allBuyersPage'][0]['quoteSection'];
};

export const BuyersQuoteSection = ({ content }: Props) => (
  <QuoteSection
    backgroundImage={{
      src: String(content?.backgroundImage?.image?.asset?.url),
      alt: String(content?.backgroundImage?.imageAlt),
    }}
    logo={{ src: String(content?.logo?.asset?.url) }}
    person={{
      name: String(content?.person?.name),
      role: String(content?.person?.role),
    }}
    quoteFirstPart={String(content?.quoteText?.quoteFirstPart)}
    quoteMiddlePart={String(content?.quoteText?.quoteMiddlePart)}
    quoteLastPart={String(content?.quoteText?.quoteLastPart)}
  />
);
