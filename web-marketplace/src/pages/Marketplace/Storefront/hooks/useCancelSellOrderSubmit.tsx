import { useCallback } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { MsgCancelSellOrder } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { getDenomtrace } from 'utils/ibc/getDenomTrace';

import { Item } from 'web-components/src/components/modal/TxModal';
import {
  formatNumber,
  getFormattedNumber,
} from 'web-components/src/utils/format';

import { UseStateSetter } from 'types/react/use-state';
import { microToDenom } from 'lib/denom.utils';

import DenomIcon from 'components/molecules/DenomIcon';
import { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  CANCEL_SELL_ORDER_BUTTON,
  CANCEL_SELL_ORDER_HEADER,
  CANCEL_SELL_ORDER_TITLE,
} from '../Storefront.constants';
import { NormalizedSellOrder } from '../Storefront.types';

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

  const cancelSellOrderSubmit = useCallback(async (): Promise<void> => {
    if (!accountAddress) return Promise.reject();

    const { batchDenom, amountAvailable, askAmount, id, askDenom } =
      selectedSellOrder;
    setIsProcessingModalOpen(true);
    setSelectedSellOrder(null);

    const msgCancelSellOrder = MsgCancelSellOrder.fromPartial({
      seller: accountAddress,
      sellOrderId: selectedSellOrder.id,
    });

    const tx = {
      msgs: [msgCancelSellOrder],
      fee: undefined,
      memo: undefined,
    };

    signAndBroadcast(tx, () => setSelectedSellOrder(null));
    setIsProcessingModalOpen(false);

    const baseDenom = await getDenomtrace({ denom: askDenom });

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
              <DenomIcon baseDenom={baseDenom} sx={{ display: 'flex' }} />
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
  }, [
    accountAddress,
    selectedSellOrder,
    _,
    setIsProcessingModalOpen,
    setSelectedSellOrder,
    signAndBroadcast,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
    setTxButtonTitle,
  ]);

  return cancelSellOrderSubmit;
};

export default useCancelSellOrderSubmit;
