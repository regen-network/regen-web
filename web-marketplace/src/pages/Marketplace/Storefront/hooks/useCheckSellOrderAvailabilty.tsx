import { MutableRefObject, useEffect } from 'react';
import { useLingui } from '@lingui/react';
import { ERRORS, errorsMapping } from 'config/errors';

import { Item } from 'web-components/src/components/modal/TxModal';

import { UseStateSetter } from 'types/react/use-state';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { checkIsBuyOrderInvalid } from '../Storefront.utils';

type Props = {
  setError: (error: string | undefined) => void;
  selectedSellOrderIdRef: MutableRefObject<number | undefined>;
  submittedQuantityRef: MutableRefObject<number | undefined>;
  setTxModalTitle: UseStateSetter<string>;
  setTxModalHeader: UseStateSetter<string>;
  setCardItems: UseStateSetter<Item[] | undefined>;
  sellOrders?: UISellOrderInfo[];
};

export const useCheckSellOrderAvailabilty = ({
  setError,
  selectedSellOrderIdRef,
  submittedQuantityRef,
  setTxModalTitle,
  setCardItems,
  setTxModalHeader,
  sellOrders,
}: Props): void => {
  const { _ } = useLingui();
  useEffect(() => {
    const selectedSellOrderId = selectedSellOrderIdRef.current;
    const sellOrderId = selectedSellOrderId
      ? String(selectedSellOrderId)
      : undefined;
    const { isBuyOrderInvalid, amountAvailable } = checkIsBuyOrderInvalid({
      sellOrderId,
      sellOrders,
      creditCount: submittedQuantityRef.current,
    });

    if (isBuyOrderInvalid) {
      setError(ERRORS.SELL_ORDER_PURCHASED);
      setTxModalHeader(_(errorsMapping[ERRORS.SELL_ORDER_PURCHASED].title));
      setTxModalTitle(`Sell order #${sellOrderId}`);
      setCardItems([
        {
          label: 'AMOUNT AVAILABLE',
          value: { name: amountAvailable },
        },
      ]);
    }
  }, [
    sellOrders,
    selectedSellOrderIdRef,
    submittedQuantityRef,
    setError,
    setTxModalTitle,
    setCardItems,
    setTxModalHeader,
    _,
  ]);
};
