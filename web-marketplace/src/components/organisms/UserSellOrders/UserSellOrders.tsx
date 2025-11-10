import { useRef } from 'react';
import { useLingui } from '@lingui/react';
import { useDashboardContext } from 'legacy-pages/Dashboard/Dashboard.context';
import { safeLazy } from 'utils/safeLazy';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import { Loading } from 'web-components/src/components/loading';

import { useWallet } from 'lib/wallet/wallet';

import { CANCEL_SELL_ORDER_ACTION } from 'features/marketplace/CancelSellOrderFlow/CancelSellOrderFlow.constants';
import { useNormalizedSellOrders } from 'components/organisms/UserSellOrders/hooks/useNormalizedSellOrders';

import { CancelSellOrderFlow } from '../../../features/marketplace/CancelSellOrderFlow/CancelSellOrderFlow';
import { NoUserSellOrdersCard } from './UserSellOrders.NoOrdersCard';
import { UserSellOrdersToolbar } from './UserSellOrders.Toolbar';

const SellOrdersTable = safeLazy(
  () => import('components/organisms/SellOrdersTable/SellOrdersTable'),
);

type UserSellOrdersProps = {
  canManageActions?: boolean;
};

export const UserSellOrders = ({
  canManageActions = true,
}: UserSellOrdersProps) => {
  const { wallet } = useWallet();
  const { _ } = useLingui();
  const { selectedAccountAddress } = useDashboardContext();
  const accountAddress = selectedAccountAddress ?? wallet?.address;
  const openCancelModalRef = useRef<((index: number) => void) | null>(null);

  const {
    normalizedSellOrders,
    isLoadingSellOrders,
    refetchSellOrders,
    setPaginationParams,
    sortCallbacks,
    totalSellOrders,
    paginationParams,
  } = useNormalizedSellOrders({ sellerAddress: accountAddress });

  const userSellOrders = normalizedSellOrders?.filter(
    (sellOrder: any) => sellOrder.seller === accountAddress,
  );

  // Callback to store the openCancelModal function from the child component
  const handleOpenCancelModal = (
    onOpenCancelModalFunc: (index: number) => void,
  ) => {
    openCancelModalRef.current = onOpenCancelModalFunc;
  };

  if (isLoadingSellOrders) {
    return <Loading />;
  }

  if (!userSellOrders?.length) {
    return (
      <NoUserSellOrdersCard
        refetchSellOrders={refetchSellOrders}
        canManageSellOrders={canManageActions}
        accountAddress={accountAddress}
      />
    );
  }

  return (
    <section className="min-w-full bg-transparent">
      <SellOrdersTable
        sellOrders={userSellOrders}
        sortCallbacks={sortCallbacks}
        onTableChange={setPaginationParams}
        renderActionButtonsFunc={
          canManageActions
            ? (i: number) => (
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
              )
            : undefined
        }
        renderToolbarContentFunc={() => (
          <UserSellOrdersToolbar
            refetchSellOrders={refetchSellOrders}
            canManageSellOrders={canManageActions}
            accountAddress={accountAddress}
          />
        )}
        totalSellOrders={totalSellOrders}
        paginationParams={paginationParams}
      />
      {canManageActions && (
        <CancelSellOrderFlow
          normalizedSellOrders={userSellOrders || []}
          refetchSellOrders={refetchSellOrders}
          onOpenCancelModal={handleOpenCancelModal}
        />
      )}
    </section>
  );
};
