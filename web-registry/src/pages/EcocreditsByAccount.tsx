import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { truncate } from 'web-components/lib/utils/truncate';

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
        <Typography
          sx={{
            fontSize: 14,
            display: 'inline',
            color: 'black',
            fontFamily: 'Muli',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Account:
        </Typography>
        <Typography
          sx={{
            ml: 2,
            display: 'inline',
            '& a': {
              fontSize: 18,
              color: 'black',
              textDecoration: 'none',
            },
          }}
        >
          <LinkWithArrow
            href={getAccountUrl(accountAddress || '')}
            label={truncate(accountAddress || '')}
          />
        </Typography>
      </Box>
    </PortfolioTemplate>
  );
};

export const EcocreditsByAccount = withBaskets(WrappedEcocreditsByAccount);
