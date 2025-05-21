import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { safeLazy } from 'utils/safeLazy';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import { ConfirmModal as CancelConfirmModal } from 'web-components/src/components/modal/ConfirmModal';

import { useWallet } from 'lib/wallet/wallet';

import { useNormalizedSellOrders } from 'pages/Marketplace/Storefront/hooks/useNormalizedSellOrders';
import { CANCEL_SELL_ORDER_ACTION } from 'pages/Marketplace/Storefront/Storefront.constants';
import { getCancelCardItems } from 'pages/Marketplace/Storefront/Storefront.utils';
import { Link } from 'components/atoms';

import { NoUserSellOrdersCard } from './UserSellOrders.NoOrdersCard';
import { UserSellOrdersToolbar } from './UserSellOrders.toolbar';

const SellOrdersTable = safeLazy(
  () => import('components/organisms/SellOrdersTable/SellOrdersTable'),
);

export const UserSellOrders = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const { wallet } = useWallet();
  const { _ } = useLingui();

  const {
    normalizedSellOrders,
    uiSellOrdersInfo,
    isLoadingSellOrders,
    refetchSellOrders,
    setPaginationParams,
    sortCallbacks,
    totalSellOrders,
    paginationParams,
  } = useNormalizedSellOrders({ sellerAddress: wallet?.address });

  const userSellOrders = normalizedSellOrders?.filter(
    (sellOrder: any) => sellOrder.seller === wallet?.address,
  );

  if (userSellOrders?.length === 0) {
    return <NoUserSellOrdersCard />;
  }

  return (
    <div className="min-w-full bg-transparent">
      <SellOrdersTable
        sellOrders={userSellOrders}
        sortCallbacks={sortCallbacks}
        onTableChange={setPaginationParams}
        renderActionButtonsFunc={(i: number) => (
          <TableActionButtons
            buttons={[
              {
                label: _(CANCEL_SELL_ORDER_ACTION),
                onClick: () => {
                  console.log('Cancel order clicked');
                  setIsCancelModalOpen(true);
                  setSelectedSellOrder(i);
                },
              },
            ]}
            sx={{ width: '100%' }}
          />
        )}
        renderToolbarContentFunc={() => <UserSellOrdersToolbar />}
        totalSellOrders={totalSellOrders}
        paginationParams={paginationParams}
      />
      <CancelConfirmModal
        open={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        linkComponent={Link}
        onConfirm={() => {}}
        onConfirmTitle={_(msg`Yes, cancel sell order`)}
        onCancelTitle={_(msg`WHOOPS, EXIT`)}
        title={_(msg`Are you sure you want to cancel this sell order?`)}
        cardItems={getCancelCardItems({
          sellOrder: normalizedSellOrders[selectedSellOrder ?? 0] ?? {},
          _,
        })}
      />
    </div>
  );
};
