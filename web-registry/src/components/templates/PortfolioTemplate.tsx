import React from 'react';
import { Box } from '@mui/material';
import { QueryBasketsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import Section from 'web-components/lib/components/section';

import { Portfolio, PortfolioProps } from '../../components/organisms';
import useQueryBaskets from '../../hooks/useQueryBaskets';

export const PortfolioTemplate: React.FC<PortfolioProps> = ({
  children,
  credits,
  basketTokens,
  renderCreditActionButtons,
  renderBasketActionButtons,
}) => {
  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Portfolio" titleVariant="h2" titleAlign="left">
        {children}
        <Portfolio
          credits={credits}
          basketTokens={basketTokens}
          renderCreditActionButtons={renderCreditActionButtons}
          renderBasketActionButtons={renderBasketActionButtons}
        />
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
