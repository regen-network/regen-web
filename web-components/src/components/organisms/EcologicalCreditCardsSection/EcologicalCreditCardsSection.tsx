import { SxProps } from '@mui/material';
import Section from 'web-components/lib/components/section';
import { Theme } from 'web-components/lib/theme/muiTheme';

import EcologicalCreditCard from '../../molecules/EcologicalCreditCard';
import { EcologicalCreditCardProps } from '../../molecules/EcologicalCreditCard/EcologicalCreditCard';

export interface EcologicalCreditCardsSectionProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  cards?: EcologicalCreditCardProps[];
  sx?: SxProps<Theme>;
}

const EcologicalCreditCardsSection = ({
  title,
  description,
  cards = [],
  sx,
}: EcologicalCreditCardsSectionProps) => {
  return (
    <Section
      withSlider
      title={title}
      description={description}
      sx={{
        root: sx,
        description: {
          mb: { xs: 10, sm: 14 },
          fontSize: { xs: 16, sm: 22 },
          maxWidth: { xs: '100%', sm: 790 },
          marginX: 'auto',
        },
      }}
    >
      {cards.map(({ sx, ...cardProps }) => (
        <EcologicalCreditCard
          key={cardProps.title}
          {...cardProps}
          sx={{ mb: { xs: 5, sm: 7.5 } }}
        />
      ))}
    </Section>
  );
};

export { EcologicalCreditCardsSection };
