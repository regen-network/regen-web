import { Box, SxProps } from '@mui/material';
import ReactHtmlParser from 'html-react-parser';

import { BlockContent } from '../../../components/block-content';
import { EcologicalCreditCardType } from '../../../components/molecules/EcologicalCreditCard/EcologicalCreditCard.types';
import { LinkComponentProp } from '../../../components/tabs/IconTabs';
import { Body, Title } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { sxToArray } from '../../../utils/mui/sxToArray';
import EcologicalCreditCard from '../../molecules/EcologicalCreditCard';

export interface EcologicalCreditCardsSectionProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  cards?: EcologicalCreditCardType[];
  linkComponent?: LinkComponentProp;
  sx?: SxProps<Theme>;
}

const EcologicalCreditCardsSection = ({
  title,
  description,
  cards = [],
  linkComponent,
  sx,
}: EcologicalCreditCardsSectionProps) => {
  return (
    <Box
      sx={[
        {
          maxWidth: theme => theme.breakpoints.values.lg,
          margin: '0 auto',
          py: { xs: 20, lg: 25 },
          px: { xs: 3.75, lg: 0 },
        },
        ...sxToArray(sx),
      ]}
    >
      <Box>
        <Title variant="h2" sx={{ textAlign: 'center' }}>
          {title}
        </Title>
        {description && (
          <Body
            size="xl"
            mobileSize="lg"
            as="p"
            textAlign="center"
            sx={{
              pt: [3.25, 7.75],
              mb: { xs: 10, sm: 14 },
              fontSize: { xs: 16, sm: 22 },
              maxWidth: { xs: '100%', sm: 790 },
              marginX: 'auto',
            }}
          >
            {typeof description === 'string' ? (
              ReactHtmlParser(description)
            ) : (
              <BlockContent content={description} />
            )}
          </Body>
        )}
      </Box>
      {cards.map(card => (
        <EcologicalCreditCard
          key={card.title}
          {...card}
          linkComponent={linkComponent}
          sx={{ mb: { xs: 5, sm: 7.5 } }}
        />
      ))}
    </Box>
  );
};

export { EcologicalCreditCardsSection };
