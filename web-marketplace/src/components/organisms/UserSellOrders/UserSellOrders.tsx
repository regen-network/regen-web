import { useRef } from 'react';
import { useLingui } from '@lingui/react';
import { safeLazy } from 'utils/safeLazy';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import { Loading } from 'web-components/src/components/loading';

import { useWallet } from 'lib/wallet/wallet';

import { useNormalizedSellOrders } from 'pages/Marketplace/Storefront/hooks/useNormalizedSellOrders';
import { CANCEL_SELL_ORDER_ACTION } from 'pages/Marketplace/Storefront/Storefront.constants';

import { CancelSellOrderFlow } from '../../../features/marketplace/CancelSellOrderFlow/CancelSellOrderFlow';
import { NoUserSellOrdersCard } from './UserSellOrders.NoOrdersCard';
import { UserSellOrdersToolbar } from './UserSellOrders.Toolbar';

const SellOrdersTable = safeLazy(
  () => import('components/organisms/SellOrdersTable/SellOrdersTable'),
);

export const UserSellOrders = () => {
  const { wallet } = useWallet();
  const { _ } = useLingui();
  const openCancelModalRef = useRef<((index: number) => void) | null>(null);

  const {
    normalizedSellOrders,
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

  // Callback to store the openCancelModal function from the child component
  const handleOpenCancelModal = (openFunc: (index: number) => void) => {
    openCancelModalRef.current = openFunc;
  };

  if (isLoadingSellOrders) {
    return <Loading />;
  }

  if (!userSellOrders?.length) {
    return <NoUserSellOrdersCard />;
  }

  return (
    <section className="min-w-full bg-transparent">
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
                  if (openCancelModalRef.current) {
                    openCancelModalRef.current(i);
                  }
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
      <CancelSellOrderFlow
        normalizedSellOrders={userSellOrders || []}
        refetchSellOrders={refetchSellOrders}
        onOpenCancelModal={handleOpenCancelModal}
      />
    </section>
  );
};
