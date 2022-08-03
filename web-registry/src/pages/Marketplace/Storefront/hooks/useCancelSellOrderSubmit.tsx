import { useCallback } from 'react';
import { Box } from '@mui/material';
import { MsgCancelSellOrder } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';

import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';

import { UseStateSetter } from 'types/react/use-state';

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

type ReturnType = () => Promise<void>;

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
}: Props): ReturnType => {
  const cancelSellOrderSubmit = useCallback(async (): Promise<void> => {
    if (!accountAddress) return Promise.reject();

    const { batchDenom, amountAvailable, askAmount, id } = selectedSellOrder;
    setIsProcessingModalOpen(true);
    setSelectedSellOrder(null);

    const msg = MsgCancelSellOrder.fromPartial({
      seller: accountAddress,
      sellOrderId: selectedSellOrder.id,
    });

    const tx = {
      msgs: [msg],
      fee: undefined,
      memo: undefined,
    };

    signAndBroadcast(tx, () => setSelectedSellOrder(null));
    setIsProcessingModalOpen(false);

    setCardItems([
      {
        label: 'batch denom',
        value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
      },
      {
        label: 'price per credit',
        value: {
          name: askAmount,
          icon: (
            <Box
              sx={{
                mr: '4px',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              <RegenTokenIcon />
            </Box>
          ),
        },
      },
      {
        label: 'number of credits',
        value: { name: getFormattedNumber(Number(amountAvailable)) },
      },
    ]);
    setTxModalHeader(CANCEL_SELL_ORDER_HEADER);
    setTxModalTitle(CANCEL_SELL_ORDER_TITLE + id);
    setTxButtonTitle(CANCEL_SELL_ORDER_BUTTON);
  }, [
    setCardItems,
    setTxModalTitle,
    setTxModalHeader,
    setSelectedSellOrder,
    setTxButtonTitle,
    setIsProcessingModalOpen,
    selectedSellOrder,
    accountAddress,
    signAndBroadcast,
  ]);

  return cancelSellOrderSubmit;
};

export default useCancelSellOrderSubmit;
