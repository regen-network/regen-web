import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Section from 'web-components/lib/components/section';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { getEcocreditsForAccount } from '../lib/ecocredit';
import { ledgerRestUri } from '../ledger';
import { EcocreditsTable } from '../components/organisms';
import { useWallet } from '../lib/wallet';
import type { EcocreditTableData } from '../types/ledger';

export const MyEcocredits: React.FC = () => {
  const walletContext = useWallet();
  const wallet = walletContext.wallet?.address;
  const [credits, setCredits] = useState<EcocreditTableData[]>([]);

  useEffect(() => {
    if (!ledgerRestUri || !wallet) return;
    const fetchData = async (): Promise<void> => {
      const credits = await getEcocreditsForAccount(wallet);
      setCredits(credits);
    };
    fetchData();
  }, [wallet]);

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section title="My Ecocredits" titleVariant="h3" titleAlign="left">
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
          <EcocreditsTable
            credits={credits}
            renderActionButtons={row => (
              <TableActionButtons
                buttons={[
                  {
                    label: 'sell',
                    onClick: () => `TODO sell credit for ${row}`,
                  },
                  {
                    label: 'Transfer',
                    onClick: () => 'TODO transfer credit',
                  },
                  {
                    label: 'Retire',
                    onClick: () => 'TODO retire credit',
                  },
                ]}
              />
            )}
          />
        </Box>
      </Section>
    </Box>
  );
};
