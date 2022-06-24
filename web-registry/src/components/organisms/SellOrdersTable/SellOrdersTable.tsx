import React from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';
import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { SELL_ORDERS_ROW } from './SellOrdersTable.config';
import getSellOrdersTableRow from './SellOrdersTable.Row';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { useTheme } from '@mui/material';

type Props = {
  sellOrders: NormalizedSellOrder[];
  renderActionButtonsFunc?: RenderActionButtonsFunc;
};

const SellOrdersTable = ({ sellOrders }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <ActionsTable
      tableLabel="Sell orders"
      headerRows={SELL_ORDERS_ROW}
      rows={sellOrders.map(sellOrder => getSellOrdersTableRow({ sellOrder }))}
      renderActionButtons={i => (
        <OutlinedButton
          startIcon={<CreditsIcon color={theme.palette.secondary.main} />}
          size="small"
        >
          BUY
        </OutlinedButton>
      )}
    />
  );
};

export default SellOrdersTable;
