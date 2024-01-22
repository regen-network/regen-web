import React from 'react';
import { ApolloQueryResult } from '@apollo/client';
import { Box } from '@mui/material';
import Image from 'next/image';

import CarouselSection from 'web-components/src/components/organisms/CarouselSection';

import { PartnersSectionQuery } from '@/generated/sanity-graphql';

type Props = {
  partnersData?: ApolloQueryResult<PartnersSectionQuery>;
};

const PartnersSection = ({ partnersData }: Props) => {
  const content = partnersData?.data.allHomePageWeb[0].homeWebPartnersSection;
  const partners = content?.partners ?? [];

  return (
    <CarouselSection
      settings={{ variableWidth: true }}
      title={content?.title ?? ''}
      sx={{ px: { xs: 0, lg: 0 }, pt: { xs: 0, lg: 0 } }}
    >
      {partners?.map((partner, index) => {
        return (
          <Box
            key={partner?.name}
            sx={{
              display: 'flex !important',
              alignItems: 'center',
              mr: 13.75,
              minHeight: 94,
            }}
          >
            <Image
              width={Number(partner?.logo?.asset?.metadata?.dimensions?.width)}
              height={Number(
                partner?.logo?.asset?.metadata?.dimensions?.height,
              )}
              src={partner?.logo?.asset?.url ?? ''}
              alt={partner?.name ?? ''}
            />
          </Box>
        );
      })}
    </CarouselSection>
  );
};

export default PartnersSection;
