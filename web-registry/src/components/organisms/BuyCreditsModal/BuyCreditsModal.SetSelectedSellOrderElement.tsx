import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { UseStateSetter } from 'types/react/use-state';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';

import { BuyCreditsProject, BuyCreditsValues } from './BuyCreditsModal';

type Props = {
  project: BuyCreditsProject;
  selectedSellOrder: UISellOrderInfo | undefined;
  setSelectedSellOrder: UseStateSetter<UISellOrderInfo | undefined>;
};
export const SetSelectedSellOrderElement = ({
  project,
  selectedSellOrder,
  setSelectedSellOrder,
}: Props): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<BuyCreditsValues>();

  useEffect(() => {
    if (!selectedSellOrder && project.sellOrders?.length === 1) {
      setSelectedSellOrder(project?.sellOrders?.[0]);
    }
  }, [project, selectedSellOrder, setSelectedSellOrder]);

  useEffect(() => {
    if (values.sellOrderId && selectedSellOrder?.id !== values.sellOrderId) {
      const _selectedSellOrder = project?.sellOrders?.find(
        sellOrder => sellOrder.id === values?.sellOrderId,
      );

      setSelectedSellOrder(_selectedSellOrder);
    }
  }, [
    project,
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
