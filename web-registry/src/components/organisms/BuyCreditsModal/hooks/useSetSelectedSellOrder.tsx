import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';

import { BuyCreditsProject, BuyCreditsValues } from '../..';

export const useSetSelectedSellOrder = (
  project: BuyCreditsProject,
): {
  selectedSellOrder: UISellOrderInfo | undefined;
  SetSelectedSellOrderElement: React.FC;
} => {
  const [selectedSellOrder, setSelectedSellOrder] = useState<
    UISellOrderInfo | undefined
  >(undefined);

  const SetSelectedSellOrderElement: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<BuyCreditsValues>();
    useEffect(() => {
      if (selectedSellOrder?.id !== values.sellOrderId) {
        const _selectedSellOrder = project?.sellOrders?.find(
          sellOrder => sellOrder.id === values?.sellOrderId,
        );

        setSelectedSellOrder(_selectedSellOrder);

        if (
          !_selectedSellOrder?.disableAutoRetire &&
          values.retirementAction !== 'autoretire'
        ) {
          setFieldValue('retirementAction', 'autoretire');
        }
      }
    }, [setFieldValue, values.retirementAction, values.sellOrderId]);

    return <></>;
  };

  return { selectedSellOrder, SetSelectedSellOrderElement };
};
