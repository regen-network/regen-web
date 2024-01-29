import { Box } from '@mui/material';

import CarouselSection from 'web-components/src/components/organisms/CarouselSection';

import { AllBuyersPageQuery } from 'generated/sanity-graphql';

interface Props {
  content: AllBuyersPageQuery['allBuyersPage'][0]['partnersSection'];
}

const BuyersPartnersSection = ({ content }: Props) => {
  return (
    <CarouselSection title={content?.title ?? ''}>
      {content?.partners?.map(partner => (
        <Box key={partner?.name}>
          <img
            src={partner?.logo?.asset?.url ?? ''}
            alt={partner?.name ?? ''}
          />
        </Box>
      ))}
    </CarouselSection>
  );
};

export { BuyersPartnersSection };
