import { EcologicalCreditCardsSectionQuery } from '@/generated/sanity-graphql';
import { ApolloQueryResult } from '@apollo/client';
import { Link } from '@mui/material';
import EcologicalCreditCard from 'web-components/lib/components/molecules/EcologicalCreditCard';
import Section from 'web-components/lib/components/organisms/Section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { useEcologicalCreditCardsStyles } from './Home.ecologicalCreditCards.styles';
import { normalizeEcologicalCreditCards } from '@/lib/utils/normalizers/normalizeEcologicalCreditCards';
import ForwardedLink from '@/components/atoms/ForwardLink/ForwardedLink';

type Props = {
  ecologicalCreditCardsData?: ApolloQueryResult<EcologicalCreditCardsSectionQuery>;
};

const EcologicalCreditCardsSection = ({ ecologicalCreditCardsData }: Props) => {
  const content =
    ecologicalCreditCardsData?.data.allHomePageWeb[0]
      .homeWebEcologicalCreditCardsSection;
  const cards = normalizeEcologicalCreditCards({ content });
  const { classes } = useEcologicalCreditCardsStyles();

  return (
    <Section
      title={content?.title ?? ''}
      sx={{
        section: {
          py: { xs: 0, lg: 0 },
        },
        title: { mb: 10 },
        children: { mt: { xs: 0, sm: 0 } },
      }}
    >
      <ResponsiveSlider
        items={cards.map(card => (
          <EcologicalCreditCard
            key={card.title}
            linkComponent={ForwardedLink}
            sx={{ mb: { xs: 5, sm: 7.5 } }}
            {...card}
          />
        ))}
        slidesToShow={1}
        adaptiveHeight
        dots
        itemWidth="100%"
        classes={classes}
      />
    </Section>
  );
};

export default EcologicalCreditCardsSection;
