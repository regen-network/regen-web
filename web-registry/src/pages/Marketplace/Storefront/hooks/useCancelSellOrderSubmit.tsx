import { Box } from '@mui/material';
import { useCallback } from 'react';
import { RegenTokenIcon } from 'web-components/lib/components/icons/RegenTokenIcon';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { getFormattedNumber } from 'web-components/lib/utils/format';
import { useStateSetter } from '../../../../types/react/use-state';
import { NormalizedSellOrder } from '../Storefront.types';
import { MsgCancelSellOrder } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/tx';
import { SignAndBroadcastType } from '../../../../hooks/useMsgClient';

type Props = {
  accountAddress?: string;
  signAndBroadcast: SignAndBroadcastType;
  selectedSellOrder: NormalizedSellOrder;
  setCardItems: useStateSetter<Item[] | undefined>;
  setTxModalTitle: useStateSetter<string>;
  setTxModalHeader: useStateSetter<string>;
  setTxButtonTitle: useStateSetter<string>;
  setSelectedSellOrder: useStateSetter<number | null>;
  setIsProcessingModalOpen: useStateSetter<boolean>;
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

    await new Promise(resolve => setTimeout(resolve, 3000));
    // signAndBroadcast(tx, () => setSelectedSellOrder(null));
    setIsProcessingModalOpen(false);

    setCardItems([
      {
        label: 'batch denom',
        value: { name: batchDenom, url: `/credit-batches/${batchDenom}` },
      },
      {
        label: 'price per credits',
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
    setTxModalHeader('Your sell order was cancelled');
    setTxModalTitle(`Sell Order #${id}`);
    setTxButtonTitle('View your sell orders');
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
