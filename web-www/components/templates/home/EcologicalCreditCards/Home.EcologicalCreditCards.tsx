import Image from 'next/image';

import EcologicalCreditCard from 'web-components/src/components/molecules/EcologicalCreditCard';
import Section from 'web-components/src/components/organisms/Section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';

import { useEcologicalCreditCardsStyles } from './Home.ecologicalCreditCards.styles';

import ForwardedLink from '@/components/atoms/ForwardedLink/ForwardedLink';
import { HomeEcologicalCreditCardsSectionFieldsFragment } from '@/generated/sanity-graphql';
import { normalizeEcologicalCreditCards } from '@/lib/utils/normalizers/normalizeEcologicalCreditCards';

type Props = {
  ecologicalCreditCardsData?: HomeEcologicalCreditCardsSectionFieldsFragment['homeWebEcologicalCreditCardsSection'];
};

const EcologicalCreditCardsSection = ({ ecologicalCreditCardsData }: Props) => {
  const cards = normalizeEcologicalCreditCards({
    ecologicalCreditCardsData: ecologicalCreditCardsData?.cards,
  });
  const { classes } = useEcologicalCreditCardsStyles();

  return (
    <Section
      title={ecologicalCreditCardsData?.title ?? ''}
      sx={{
        section: {
          py: { xs: 0, lg: 0 },
        },
        title: { mb: 10 },
        children: { mt: { xs: 0, sm: 0 } },
      }}
    >
      <ResponsiveSlider
        items={cards.map(card => {
          return (
            <EcologicalCreditCard
              key={card.title}
              linkComponent={ForwardedLink}
              sx={{ mb: { xs: 5, sm: 7.5 } }}
              {...card}
            >
              <Image
                src={card.image.src}
                alt={String(card.title)}
                width={400}
                height={492}
                className={classes.image}
              />
            </EcologicalCreditCard>
          );
        })}
        slidesToShow={1}
        adaptiveHeight
        dots
        mobileItemWidth="100%"
        classes={classes}
      />
    </Section>
  );
};

export default EcologicalCreditCardsSection;
