import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import type { QueryBalanceResponse } from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import ActionsTable, {
  renderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import type { Basket } from '../../types/ledger/ecocredit';

const useStyles = makeStyles(theme => ({}));

export interface TableBasket extends Basket, QueryBalanceResponse {}

export const BasketsTable: React.FC<{
  baskets: TableBasket[];
  renderActionButtons?: renderActionButtonsFunc;
}> = ({ baskets, renderActionButtons }) => {
  const styles = useStyles();
  return (
    <ActionsTable
      tableLabel="ecocredits table"
      renderActionButtons={renderActionButtons}
      headerRows={[
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
        'Balance',
      ]}
      rows={baskets.map((row, i) => {
        return [<>{row.name}</>, row.balance?.amount];
      })}
    />
  );
};
