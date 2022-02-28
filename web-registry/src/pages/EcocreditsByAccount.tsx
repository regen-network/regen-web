import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';

import Section from 'web-components/lib/components/section';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import { getEcocreditsForAccount } from '../lib/ecocredit';
import { ledgerRestUri } from '../ledger';
import { truncate } from '../lib/wallet';
import { getAccountUrl } from '../lib/block-explorer';
import { EcocreditsTable } from '../components/organisms';

import type { EcocreditTableData } from '../types/ledger';

export const EcocreditsByAccount: React.FC = () => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const [credits, setCredits] = useState<EcocreditTableData[]>([]);

  useEffect(() => {
    if (!ledgerRestUri || !accountAddress) return;
    const fetchData = async (): Promise<void> => {
      const credits = await getEcocreditsForAccount(accountAddress);
      setCredits(credits);
    };
    fetchData();
  }, [accountAddress]);

  const theme = useTheme();
  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="Ecocredits" titleVariant="h3" titleAlign="left">
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
        <Box
          sx={{
            border: 1,
            borderColor: 'info.light',
            borderRadius: '8px',
            marginTop: 8,
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          <EcocreditsTable credits={credits} />
        </Box>
      </Section>
    </Box>
  );
};
