import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import {
  PortfolioTemplate,
  WithBasketsProps,
  withBaskets,
} from '../components/templates';
import { LinkWithArrow } from '../components/atoms';
import { truncate } from '../lib/wallet';
import { getAccountUrl } from '../lib/block-explorer';

const WrappedEcocreditsByAccount: React.FC<WithBasketsProps> = ({
  baskets,
}) => {
  const { accountAddress } = useParams<{ accountAddress: string }>();

  return (
    <PortfolioTemplate accountAddress={accountAddress} baskets={baskets}>
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
            link={getAccountUrl(accountAddress || '')}
            label={truncate(accountAddress || '')}
          />
        </Typography>
      </Box>
    </PortfolioTemplate>
  );
};

export const EcocreditsByAccount = withBaskets(WrappedEcocreditsByAccount);
