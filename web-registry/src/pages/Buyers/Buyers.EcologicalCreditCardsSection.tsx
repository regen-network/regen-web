import EcologicalCreditCard from 'web-components/lib/components/molecules/EcologicalCreditCard';
import Section from 'web-components/lib/components/organisms/Section';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';

import { Link } from 'components/atoms';

import { normalizeEcologicalCreditCards } from './normalizers/normalizeEcologicalCreditCards';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['ecologicalCreditCardsSection'];
}

const BuyersEcologicalCreditCardsSection: React.FC<
  React.PropsWithChildren<Props>
> = ({ content }) => {
  const cards = normalizeEcologicalCreditCards({ content });

  return (
    <Section title={content?.title ?? ''} description={content?.descriptionRaw}>
      {cards.map(card => (
        <EcologicalCreditCard
          key={card.title}
          linkComponent={Link}
          sx={{ mb: { xs: 5, sm: 7.5 } }}
          {...card}
        />
      ))}
    </Section>
  );
};

export { BuyersEcologicalCreditCardsSection };
