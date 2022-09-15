import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';

import { BuyCreditsProject, BuyCreditsValues } from '..';

type GetSellOrderLabelParams = {
  sellOrder: UISellOrderInfo;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};
export const getSellOrderLabel = ({
  sellOrder,
  allowedDenomsData,
}: GetSellOrderLabelParams): string => {
  const { id, askAmount, askDenom, quantity } = {
    ...sellOrder,
  };
  const price = microToDenom(askAmount);
  const displayDenom = findDisplayDenom({
    allowedDenomsData,
    denom: askDenom,
  });
  return `${id} (${price} ${displayDenom}/credit: ${quantity} credit(s) available)`;
};

type GetOptionsParams = {
  project: BuyCreditsProject;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};
export const getOptions = ({
  project,
  allowedDenomsData,
}: GetOptionsParams): Option[] => {
  if (!project?.sellOrders?.length) return [];

  const sellOrderOptions = project?.sellOrders.map(sellOrder => {
    return {
      label: getSellOrderLabel({ sellOrder, allowedDenomsData }),
      value: sellOrder.id,
    };
  });
  return sellOrderOptions.length > 1
    ? [{ label: 'Choose a sell order', value: '' }, ...sellOrderOptions]
    : sellOrderOptions;
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
