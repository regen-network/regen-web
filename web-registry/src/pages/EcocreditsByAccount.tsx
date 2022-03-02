import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';

import { PortfolioTemplate } from '../components/templates';
import { truncate } from '../lib/wallet';
import { getAccountUrl } from '../lib/block-explorer';

export const EcocreditsByAccount: React.FC = () => {
  const { accountAddress } = useParams<{ accountAddress: string }>();

  return (
    <PortfolioTemplate accountAddress={accountAddress}>
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
          <a
            href={getAccountUrl(accountAddress || '')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncate(accountAddress || '')}
            <SmallArrowIcon sx={{ ml: 1, mb: 0.5, height: 9, width: 13 }} />
          </a>
        </Typography>
      </Box>
    </PortfolioTemplate>
  );
};
