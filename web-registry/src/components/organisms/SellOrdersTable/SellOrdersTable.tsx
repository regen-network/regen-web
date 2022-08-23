import EmptyState from 'web-components/lib/components/empty-state';
import EmptyCartIcon from 'web-components/lib/components/icons/EmptyCartIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
} from 'web-components/lib/components/table/ActionsTable';

import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { SELL_ORDERS_ROW } from './SellOrdersTable.config';
import getSellOrdersTableRow from './SellOrdersTable.Row';

type Props = {
  sellOrders: NormalizedSellOrder[];
  renderActionButtonsFunc?: RenderActionButtonsFunc;
};

const SellOrdersTable = ({
  sellOrders,
  renderActionButtonsFunc = i => void 0,
}: Props): JSX.Element => {
  const hasSellOrders = sellOrders.length > 0;
  return (
    <>
      {hasSellOrders && (
        <ActionsTable
          tableLabel="Sell orders"
          headerRows={SELL_ORDERS_ROW}
          rows={sellOrders.map(sellOrder =>
            getSellOrdersTableRow({ sellOrder }),
          )}
          renderActionButtons={renderActionButtonsFunc}
        />
      )}
      {!hasSellOrders && (
        <EmptyState
          message={'No sell orders found'}
          icon={<EmptyCartIcon sx={{ fontSize: 84, fill: 'none' }} />}
        />
      )}
    </>
  );
};

export default SellOrdersTable;
