import { CardMedia } from '@mui/material';
import Link from 'next/link';

import EcologicalCreditCard from 'web-components/lib/components/molecules/EcologicalCreditCard';
import Section from 'web-components/lib/components/organisms/Section';

import { AllBuyersPageQuery } from '@/generated/sanity-graphql';
import { normalizeEcologicalCreditCards } from '@/lib/utils/normalizers/normalizeEcologicalCreditCards';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['ecologicalCreditCardsSection'];
}

const BuyersEcologicalCreditCardsSection: React.FC<
  React.PropsWithChildren<Props>
> = ({ content }) => {
  const cards = normalizeEcologicalCreditCards({
    ecologicalCreditCardsData: content?.cards,
  });

  return (
    <Section title={content?.title ?? ''} description={content?.descriptionRaw}>
      {cards.map(card => (
        <EcologicalCreditCard
          key={card.title}
          linkComponent={Link}
          sx={{ mb: { xs: 5, sm: 7.5 } }}
          {...card}
        >
          <CardMedia
            src={card.image.src}
            component="img"
            alt={card.image.alt}
            sx={{
              height: { xs: 216, md: '100%' },
              width: { xs: '100%', md: 400 },
            }}
          />
        </EcologicalCreditCard>
      ))}
    </Section>
  );
};

export { BuyersEcologicalCreditCardsSection };
