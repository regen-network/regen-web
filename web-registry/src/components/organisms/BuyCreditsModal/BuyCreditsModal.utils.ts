import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import {
  formatDenomText,
  microToDenom,
} from 'pages/Marketplace/Marketplace.utils';
import { ISellOrderInfo } from 'pages/Marketplace/Projects/Projects.types';

import { BuyCreditsProject, BuyCreditsValues } from '..';

export const getSellOrderLabel = (sellOrder: ISellOrderInfo): string => {
  const { id, askAmount, askDenom = '', quantity } = { ...sellOrder };
  const denom = formatDenomText(askDenom);
  const price = microToDenom(askAmount);
  return `${id} (${price} ${denom}/credit: ${quantity} credit(s) available)`;
};

export const getOptions = (project: BuyCreditsProject): Option[] => {
  if (project?.sellOrders?.length) {
    const sellOrderOptions = project?.sellOrders.map(sellOrder => {
      return {
        label: getSellOrderLabel(sellOrder),
        value: sellOrder.id,
      };
    });
    return [{ label: 'Choose a sell order', value: '' }, ...sellOrderOptions];
  }

  return [];
};

export const handleBuyCreditsSubmit = async (
  values: BuyCreditsValues,
  onSubmit?: (values: BuyCreditsValues) => Promise<void>,
  selectedSellOrder?: ISellOrderInfo,
): Promise<void> => {
  if (!onSubmit || !selectedSellOrder) return Promise.reject();
  const { country, postalCode, stateProvince, retirementAction } = values;

  const fullValues: BuyCreditsValues = {
    ...values,
    price: Number(selectedSellOrder.askAmount),
    batchDenom: selectedSellOrder.batchDenom,
    sellOrderId: selectedSellOrder.id,
    country: retirementAction === 'autoretire' ? country : '',
    postalCode: retirementAction === 'autoretire' ? postalCode : '',
    stateProvince: retirementAction === 'autoretire' ? stateProvince : '',
  };
  await onSubmit(fullValues);
};
