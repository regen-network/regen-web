import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { formatNumber } from 'web-components/lib/utils/format';

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

export const getCreditCountValidation =
  (creditAvailable: number) => (creditCount: number) => {
    let error;
    if (creditCount > creditAvailable) {
      error = `Must be less than or equal to the max credit(s) available (${creditAvailable}).`;
    }
    return error;
  };

type AmountToSpendParams = {
  creditCount: number;
  askAmount: number;
};

export const amountToSpend = ({
  creditCount,
  askAmount,
}: AmountToSpendParams): String =>
  formatNumber({
    num: creditCount * microToDenom(askAmount),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) ?? '-';
