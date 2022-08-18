import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';

import { ISellOrderInfo } from 'pages/Marketplace/Projects/Projects.types';

import { BuyCreditsProject, BuyCreditsValues } from '../..';

export const useSetSelectedSellOrder = (
  project: BuyCreditsProject,
): {
  selectedSellOrder: ISellOrderInfo | undefined;
  SetSelectedSellOrderElement: React.FC;
} => {
  const [selectedSellOrder, setSelectedSellOrder] = useState<
    ISellOrderInfo | undefined
  >(undefined);

  const SetSelectedSellOrderElement: React.FC = () => {
    const { values, setFieldValue } = useFormikContext<BuyCreditsValues>();
    useEffect(() => {
      if (selectedSellOrder?.id !== values.sellOrderId) {
        const _selectedSellOrder = project?.sellOrders?.find(
          sellOrder => sellOrder.id === values?.sellOrderId,
        );
        if (_selectedSellOrder) {
          setSelectedSellOrder(_selectedSellOrder);
          if (
            _selectedSellOrder.disableAutoRetire &&
            values.retirementAction !== 'manual'
          ) {
            setFieldValue('retirementAction', 'manual');
          }
        } else {
          setSelectedSellOrder(undefined);
        }
      }
    }, [setFieldValue, values.retirementAction, values.sellOrderId]);

    return <></>;
  };

  return { selectedSellOrder, SetSelectedSellOrderElement };
};
