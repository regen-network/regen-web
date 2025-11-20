import { useCallback } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { regen } from '@regen-network/api';
import { useQueryClient } from '@tanstack/react-query';
import { useDashboardContext } from 'legacy-pages/Dashboard/Dashboard.context';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';
import {
  cancelSellOrderAction,
  getRoleAuthorizationIds,
  wrapRbamActions,
} from 'web-marketplace/src/utils/rbam.utils';

import { Item } from 'web-components/src/components/modal/TxModal';
import {
  formatNumber,
  getFormattedNumber,
} from 'web-components/src/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import { microToDenom } from 'lib/denom.utils';
import { SELL_ORDERS_EXTENTED_KEY } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.constants';
import { useWallet } from 'lib/wallet/wallet';

import DenomIcon from 'components/molecules/DenomIcon';
import { NormalizedSellOrder } from 'components/organisms/UserSellOrders/hooks/useNormalizedSellOrders';
import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  CANCEL_SELL_ORDER_BUTTON,
  CANCEL_SELL_ORDER_HEADER,
  CANCEL_SELL_ORDER_TITLE,
} from '../CancelSellOrderFlow.constants';

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  selectedSellOrder: NormalizedSellOrder;
  setCardItems: UseStateSetter<Item[] | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setTxButtonTitle: UseStateSetter<string>;
  setSelectedSellOrder: UseStateSetter<number | null>;
  setIsProcessingModalOpen: UseStateSetter<boolean>;
};

type Return = () => Promise<void>;

const useCancelSellOrderSubmit = ({
  signAndBroadcast,
  accountAddress,
  selectedSellOrder,
  setTxModalHeader,
  setCardItems,
  setTxModalTitle,
  setTxButtonTitle,
  setSelectedSellOrder,
  setIsProcessingModalOpen,
}: Props): Return => {
  const { _ } = useLingui();
  const { queryClient } = useLedger();
  const { wallet } = useWallet();
  const reactQueryClient = useQueryClient();
  const {
    isOrganizationDashboard,
    organizationRole,
    organizationRbamAddress,
    organizationDaoAddress,
    feeGranter,
  } = useDashboardContext();

  const { roleId, authorizationId: manageSellOrdersAuthId } =
    getRoleAuthorizationIds({
      type: 'organization',
      currentUserRole: organizationRole,
      authorizationName: 'can_manage_sell_orders',
    });

  const cancelSellOrderSubmit = useCallback(async (): Promise<void> => {
    if (!accountAddress) return Promise.reject();

    const { batchDenom, amountAvailable, askAmount, id, askDenom } =
      selectedSellOrder;
    setIsProcessingModalOpen(true);
    setSelectedSellOrder(null);

    let finalMsg;

    if (
      isOrganizationDashboard &&
      roleId &&
      manageSellOrdersAuthId &&
      organizationRbamAddress &&
      wallet?.address
    ) {
      const action = cancelSellOrderAction({
        roleId,
        authorizationId: manageSellOrdersAuthId,
        seller: accountAddress, // DAO address
        sellOrderId: BigInt(selectedSellOrder.id),
      });

      finalMsg = wrapRbamActions({
        walletAddress: wallet.address,
        rbamAddress: organizationRbamAddress,
        actions: [action],
      });
    } else {
      finalMsg =
        regen.ecocredit.marketplace.v1.MessageComposer.withTypeUrl.cancelSellOrder(
          {
            seller: accountAddress,
            sellOrderId: BigInt(selectedSellOrder.id),
          },
        );
    }

    const tx = {
      msgs: [finalMsg],
      fee: isOrganizationDashboard ? ('auto' as const) : undefined,
      feeGranter,
    };

    try {
      const result = await signAndBroadcast(tx);
      if (!result || typeof result === 'string') {
        setIsProcessingModalOpen(false);
        throw new Error(
          typeof result === 'string'
            ? result
            : _(msg`Transaction signing failed`),
        );
      }

      setIsProcessingModalOpen(false);

      reactQueryClient.invalidateQueries({
        queryKey: [SELL_ORDERS_EXTENTED_KEY],
      });

      const baseDenom = await getDenomtrace({ denom: askDenom, queryClient });

      const projectId =
        selectedSellOrder.project?.id ??
        batchDenom.substring(0, batchDenom.indexOf('-', 4));

      setCardItems([
        {
          label: _(msg`price per credit`),
          value: {
            name: formatNumber({
              num: microToDenom(askAmount),
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }),
            icon: (
              <Box
                sx={{
                  mr: '4px',
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                }}
              >
                <DenomIcon
                  baseDenom={baseDenom}
                  bankDenom={askDenom}
                  sx={{ display: 'flex' }}
                />
              </Box>
            ),
          },
        },
        {
          label: _(msg`project`),
          value: {
            name: selectedSellOrder.project?.name || projectId,
            url: `/project/${projectId}`,
          },
        },
        {
          label: _(msg`credit batch id`),
          value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
        },
        {
          label: _(msg`amount`),
          value: { name: getFormattedNumber(Number(amountAvailable)) },
        },
      ]);
      setTxModalHeader(_(CANCEL_SELL_ORDER_HEADER));
      setTxModalTitle(_(CANCEL_SELL_ORDER_TITLE) + id);
      setTxButtonTitle(_(CANCEL_SELL_ORDER_BUTTON));
    } catch (error) {
      setIsProcessingModalOpen(false);
      throw error;
    }
  }, [
    accountAddress,
    selectedSellOrder,
    setIsProcessingModalOpen,
    setSelectedSellOrder,
    isOrganizationDashboard,
    roleId,
    manageSellOrdersAuthId,
    organizationRbamAddress,
    wallet?.address,
    feeGranter,
    signAndBroadcast,
    reactQueryClient,
    queryClient,
    setCardItems,
    _,
    setTxModalHeader,
    setTxModalTitle,
    setTxButtonTitle,
  ]);

  return cancelSellOrderSubmit;
};

export default useCancelSellOrderSubmit;
