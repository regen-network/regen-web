import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { UseStateSetter } from 'types/react/use-state';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { BuyCreditsValues } from './BuyCreditsModal';

type Props = {
  sellOrders: UISellOrderInfo[] | undefined;
  selectedSellOrder: UISellOrderInfo | undefined;
  setSelectedSellOrder: UseStateSetter<UISellOrderInfo | undefined>;
};
export const SetSelectedSellOrderElement = ({
  sellOrders,
  selectedSellOrder,
  setSelectedSellOrder,
}: Props): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<BuyCreditsValues>();

  useEffect(() => {
    if (!selectedSellOrder && sellOrders?.length === 1) {
      setSelectedSellOrder(sellOrders?.[0]);
    }
  }, [sellOrders, selectedSellOrder, setSelectedSellOrder]);

  useEffect(() => {
    if (values.sellOrderId && selectedSellOrder?.id !== values.sellOrderId) {
      const _selectedSellOrder = sellOrders?.find(
        sellOrder => sellOrder.id === values?.sellOrderId,
      );

      setSelectedSellOrder(_selectedSellOrder);
    }
  }, [
    sellOrders,
    setFieldValue,
    values.retirementAction,
    values.sellOrderId,
    selectedSellOrder,
    setSelectedSellOrder,
  ]);

  useEffect(() => {
    if (
      selectedSellOrder &&
      !selectedSellOrder?.disableAutoRetire &&
      values.retirementAction !== 'autoretire'
    ) {
      setFieldValue('retirementAction', 'autoretire');
    }
  }, [selectedSellOrder, setFieldValue, values.retirementAction]);

  return <></>;
};
