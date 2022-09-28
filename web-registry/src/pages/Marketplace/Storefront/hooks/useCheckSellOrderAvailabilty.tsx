import { MutableRefObject, useEffect } from 'react';
import { ERRORS, errorsMapping } from 'config/errors';

import { Item } from 'web-components/lib/components/modal/TxModal';

import { UseStateSetter } from 'types/react/use-state';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { checkIsBuyOrderInvalid } from '../Storefront.utils';

type Props = {
  setError: (error: string | undefined) => void;
  selectedSellOrderIdRef: MutableRefObject<number | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  sellOrders?: SellOrderInfoExtented[];
};

export const useCheckSellOrderAvailabilty = ({
  setError,
  selectedSellOrderIdRef,
  setTxModalTitle,
  setCardItems,
  setTxModalHeader,
  sellOrders,
}: Props): void => {
  useEffect(() => {
    const selectedSellOrderId = selectedSellOrderIdRef.current;
    const sellOrderId = selectedSellOrderId
      ? String(selectedSellOrderId)
      : undefined;
    const { isBuyOrderInvalid, quantityAfterOrder } = checkIsBuyOrderInvalid({
      sellOrderId,
      sellOrders,
    });

    if (isBuyOrderInvalid) {
      setError(errorsMapping[ERRORS.SELL_ORDER_PURCHASED].code);
      setTxModalHeader('Sorry, someone has purchased this sell order!');
      setTxModalTitle(`Sell order #${sellOrderId}`);
      setCardItems([
        {
          label: 'AMOUNT AVAILABLE',
          value: { name: Math.max(quantityAfterOrder, 0) },
        },
      ]);
    }
  }, [
    selectedSellOrderIdRef,
    setError,
    setTxModalTitle,
    sellOrders,
    setCardItems,
    setTxModalHeader,
  ]);
};
