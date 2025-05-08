import { useLingui } from '@lingui/react';
import { Box, CardMedia } from '@mui/material';

import { ProgramImageChildren } from 'web-components/src/components/cards/ProjectCard/ProjectCard.ImageChildren';
import EcologicalCreditCard from 'web-components/src/components/molecules/EcologicalCreditCard';
import Section from 'web-components/src/components/organisms/Section';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';
import { SKIPPED_CLASS_ID } from 'lib/env';

import { useCreditClasses } from 'legacy-pages/Home/hooks/useCreditClasses';
import { Link } from 'components/atoms';

import { normalizeEcologicalCreditCards } from './normalizers/normalizeEcologicalCreditCards';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['ecologicalCreditCardsSection'];
}

const BuyersEcologicalCreditCardsSection: React.FC<
  React.PropsWithChildren<Props>
> = ({ content }) => {
  const { _ } = useLingui();
  const { creditClasses, creditClassesPrograms } = useCreditClasses({
    skippedClassId: SKIPPED_CLASS_ID,
  });
  const cards = normalizeEcologicalCreditCards({
    content,
    creditClasses,
    creditClassesPrograms,
    _,
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
          <Box
            sx={{
              position: 'relative',
              height: { xs: 216, md: '100%' },
              width: { xs: '100%', md: 400 },
            }}
          >
            <CardMedia
              src={card.image.src}
              component="img"
              alt={card.image.alt}
              sx={{
                height: '100%',
                width: '100%',
              }}
            />
            <ProgramImageChildren program={card.program} />
          </Box>
        </EcologicalCreditCard>
      ))}
    </Section>
  );
};

export { BuyersEcologicalCreditCardsSection };
