import { useState } from 'react';
import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { CoinBalance } from 'pages/Dashboard/MyEcocredits/hooks/useFetchCoins';
import DenomIcon from 'components/molecules/DenomIcon';
import DenomLabel from 'components/molecules/DenomLabel';

import { CoinsTableBuyModal } from './CoinsTable.BuyModal';

type CoinsTableProps = {
  coinBalances: CoinBalance[];
};

export const CoinsTable = ({ coinBalances }: CoinsTableProps) => {
  const [isCoinTableOpen, setIsCoinTableOpen] = useState(false);
  const [selectedBaseDenom, setSelectedBaseDenom] = useState('');

  return (
    <>
      <ActionsTable
        tableLabel="baskets table"
        renderActionButtons={index => (
          <ContainedButton
            onClick={() => {
              setIsCoinTableOpen(true);
              setSelectedBaseDenom(coinBalances[index].baseDenom);
            }}
          >
            {'Buy'}
          </ContainedButton>
        )}
        headerRows={[
          /* eslint-disable react/jsx-key */
          <Box
            sx={{
              minWidth: {
                xs: 'auto',
                sm: '11rem',
                lg: '13rem',
              },
            }}
          >
            Asset
          </Box>,
          'Amount available',
        ]}
        rows={coinBalances.map((coinBalance, i) => {
          return [
            <Box
              sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}
            >
              <DenomIcon
                denom={coinBalance.baseDenom}
                sx={{ mr: 2.5, display: 'flex', alignItems: 'center' }}
                iconSx={{ fontSize: '30px' }}
              />
              <DenomLabel
                denom={coinBalance.bankDenom}
                size="sm"
                sx={{
                  fontSize: { xs: '1rem' },
                  color: 'info.main',
                  fontWeight: 400,
                  fontFamily: 'Lato',
                }}
              />
            </Box>,
            <Box>
              {formatNumber({
                num: microToDenom(coinBalance.amount),
                ...quantityFormatNumberOptions,
              })}
            </Box>,
          ];
        })}
      />
      <CoinsTableBuyModal
        open={isCoinTableOpen}
        selectedBaseDenom={selectedBaseDenom}
        onClose={() => setIsCoinTableOpen(false)}
      />
    </>
  );
};
