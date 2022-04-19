import React from 'react';
import { Box, SxProps } from '@mui/material';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import Section from 'web-components/lib/components/section';
import { ButtonText } from 'web-components/lib/components/typography';
import { RenderActionButtonsFunc } from 'web-components/lib/components/table/ActionsTable';

import { EcocreditsTable, BasketsTable } from '../../components/organisms';
import useQueryBaskets from '../../hooks/useQueryBaskets';
import type { BatchInfoWithBalance } from '../../types/ledger/ecocredit';
import { BasketTokens } from '../../hooks/useBasketTokens';

interface PortfolioTemplateProps {
  credits?: BatchInfoWithBalance[];
  basketTokens: BasketTokens[];
  renderCreditActionButtons?: RenderActionButtonsFunc;
  renderBasketActionButtons?: RenderActionButtonsFunc;
}

const sxs = {
  title: {
    color: 'info.dark',
    mb: { xs: 4.25, sm: 8.5 },
  } as SxProps,
};

export const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({
  credits,
  basketTokens,
  children,
  renderCreditActionButtons,
  renderBasketActionButtons,
}) => {
  return (
    <Box sx={{ backgroundColor: 'grey.50', pb: { xs: 21.25, sm: 28.28 } }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        {children}
        <Box sx={{ pt: { xs: 9.25, sm: 8.5 } }}>
          <ButtonText sx={sxs.title}>basket tokens</ButtonText>
          <BasketsTable
            basketTokens={basketTokens}
            renderActionButtons={renderBasketActionButtons}
          />
        </Box>
        <Box sx={{ pt: 12.75 }}>
          <ButtonText sx={sxs.title}>ecocredits</ButtonText>
          <EcocreditsTable
            credits={credits}
            renderActionButtons={renderCreditActionButtons}
          />
        </Box>
      </Section>
    </Box>
  );
};

export interface WithBasketsProps {
  baskets?: QueryBasketsResponse;
}

export function withBaskets<P>(
  WrappedComponent: React.ComponentType<P & WithBasketsProps>,
): React.FC<P & WithBasketsProps> {
  const ComponentWithBaskets: React.FC<P> = (props: P) => {
    const baskets = useQueryBaskets();
    return <WrappedComponent {...props} baskets={baskets} />;
  };
  return ComponentWithBaskets;
}
