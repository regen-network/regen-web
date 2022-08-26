import { Option } from 'web-components/lib/components/inputs/SelectTextField';

import { formatDenomText, microToDenom } from 'lib/denom.utils';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';

import { BuyCreditsProject, BuyCreditsValues } from '..';

export const getSellOrderLabel = (sellOrder: UISellOrderInfo): string => {
  const { id, askAmount, askDenom = '', quantity } = { ...sellOrder };
  const denom = formatDenomText(askDenom);
  const price = microToDenom(askAmount);
  return `${id} (${price} ${denom}/credit: ${quantity} credit(s) available)`;
};

export const getOptions = (project: BuyCreditsProject): Option[] => {
  if (!project?.sellOrders?.length) return [];

  const sellOrderOptions = project?.sellOrders.map(sellOrder => {
    return {
      label: getSellOrderLabel(sellOrder),
      value: sellOrder.id,
    };
  });
  return [{ label: 'Choose a sell order', value: '' }, ...sellOrderOptions];
};

export const handleBuyCreditsSubmit = async (
  values: BuyCreditsValues,
  onSubmit?: (values: BuyCreditsValues) => Promise<void>,
  selectedSellOrder?: UISellOrderInfo,
): Promise<void> => {
  if (!onSubmit || !selectedSellOrder) {
    throw new Error('onSubmit and selectedSellOrder are required');
  }
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
