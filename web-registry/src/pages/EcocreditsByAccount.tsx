import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { truncate } from 'web-components/lib/utils/truncate';
import { Body, ButtonText } from 'web-components/lib/components/typography';

import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';
import { LinkWithArrow } from '../components/atoms';
import { getAccountUrl } from '../lib/block-explorer';
import { useEcocredits, useBasketTokens } from '../hooks';

const WrappedEcocreditsByAccount: React.FC<WithBasketsProps> = ({
  baskets,
}) => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const { credits } = useEcocredits(accountAddress);
  const { basketTokens } = useBasketTokens(accountAddress, baskets);

  return (
    <PortfolioTemplate credits={credits} basketTokens={basketTokens}>
      <Box sx={{ mt: { xs: 1.25, sm: 3 } }}>
        <ButtonText size="sm" mobileSize="sm" sx={{ display: 'inline' }}>
          Account:
        </ButtonText>
        <Body
          size="lg"
          sx={{
            display: 'inline',
            mx: 2,
            '& a': {
              fontWeight: 'normal',
              color: 'black',
              textDecoration: 'none',
            },
          }}
        >
          <LinkWithArrow
            href={getAccountUrl(accountAddress || '')}
            label={truncate(accountAddress || '')}
          />
        </Body>
      </Box>
    </PortfolioTemplate>
  );
};

export const EcocreditsByAccount = withBaskets(WrappedEcocreditsByAccount);
