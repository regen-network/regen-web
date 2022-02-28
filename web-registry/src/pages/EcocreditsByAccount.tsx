import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';

import { PortfolioTemplate } from '../components/templates';
import { truncate } from '../lib/wallet';
import { getAccountUrl } from '../lib/block-explorer';

export const EcocreditsByAccount: React.FC = () => {
  const theme = useTheme<Theme>();
  const { accountAddress } = useParams<{ accountAddress: string }>();

  return (
    <PortfolioTemplate accountAddress={accountAddress}>
      <Box sx={{ mt: 4 }}>
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
            <ArrowDownIcon
              direction="next"
              fontSize="medium"
              sx={{ ml: 2 }}
              color={theme.palette.secondary.main}
            />
          </a>
        </Typography>
      </Box>
    </PortfolioTemplate>
  );
};
