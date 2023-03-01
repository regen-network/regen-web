import { Box } from '@mui/material';
import { quantityFormatNumberOptions } from 'config/decimals';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { ActionsTable } from 'web-components/lib/components/table/ActionsTable';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { CoinBalance } from 'pages/Dashboard/MyEcocredits/hooks/useFetchCoins';
import DenomIcon from 'components/molecules/DenomIcon';
import DenomLabel from 'components/molecules/DenomLabel';

type CoinsTableProps = {
  coinBalances: CoinBalance[];
};

export const CoinsTable = ({ coinBalances }: CoinsTableProps) => {
  return (
    <ActionsTable
      tableLabel="baskets table"
      renderActionButtons={() => <ContainedButton>{'Buy'}</ContainedButton>}
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
          <Box sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <DenomIcon
              denom={coinBalance.denom}
              sx={{ mr: 2.5, display: 'flex', alignItems: 'center' }}
              iconSx={{ fontSize: '30px' }}
            />
            <DenomLabel
              denom={coinBalance.denom}
              size="sm"
              sx={{
                fontSize: { xs: '1rem' },
                color: 'info.main',
                fontWeight: 400,
                fontFamily: 'Lato',
              }}
            />
          </Box>,
          <Box sx={{ textAlign: 'right' }}>
            {formatNumber({
              num: microToDenom(coinBalance.amount),
              ...quantityFormatNumberOptions,
            })}
          </Box>,
        ];
      })}
    />
  );
};
