import EcologicalCreditCardsSection from 'web-components/lib/components/organisms/EcologicalCreditCardsSection';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';

import { normalizeEcologicalCreditCards } from './normalizers/normalizeEcologicalCreditCards';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['ecologicalCreditCardsSection'];
}

const BuyersEcologicalCreditCardsSection: React.FC<
  React.PropsWithChildren<Props>
> = ({ content }) => {
  return (
    <EcologicalCreditCardsSection
      title={content?.title ?? ''}
      description={content?.descriptionRaw}
      cards={normalizeEcologicalCreditCards({ content })}
    />
  );
};

export { BuyersEcologicalCreditCardsSection };
