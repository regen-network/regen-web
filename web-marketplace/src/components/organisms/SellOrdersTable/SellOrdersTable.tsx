import EmptyState from 'web-components/lib/components/empty-state';
import EmptyCartIcon from 'web-components/lib/components/icons/EmptyCartIcon';
import {
  ActionsTable,
  RenderActionButtonsFunc,
  SortCallbacksType,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';

import { UseStateSetter } from 'types/react/use-state';

import { NormalizedSellOrder } from '../../../pages/Marketplace/Storefront/Storefront.types';
import { SELL_ORDERS_ROW } from './SellOrdersTable.config';
import getSellOrdersTableRow from './SellOrdersTable.Row';

type Props = {
  sellOrders: NormalizedSellOrder[];
  sortCallbacks?: SortCallbacksType;
  renderActionButtonsFunc?: RenderActionButtonsFunc;
  onTableChange?: UseStateSetter<TablePaginationParams>;
};

const SellOrdersTable = ({
  sellOrders,
  sortCallbacks = [],
  renderActionButtonsFunc = i => void 0,
  onTableChange,
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
          sortCallbacks={sortCallbacks}
          renderActionButtons={renderActionButtonsFunc}
          onTableChange={onTableChange}
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
