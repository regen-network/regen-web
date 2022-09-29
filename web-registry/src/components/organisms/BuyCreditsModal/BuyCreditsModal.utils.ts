import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';

import { BuyCreditsProject, BuyCreditsValues } from '..';
import { getDenomCurrencyPrefix } from '../SellOrdersTable/SellOrdersTable.utils';

/* getSellOrderLabel */

type GetSellOrderLabelParams = {
  sellOrder: UISellOrderInfo;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};
export const getSellOrderLabel = ({
  sellOrder,
  allowedDenomsData,
}: GetSellOrderLabelParams): string => {
  const { id, askAmount, askDenom, quantity, askBaseDenom } = {
    ...sellOrder,
  };
  const price = microToDenom(askAmount);
  const displayDenom = findDisplayDenom({
    allowedDenomsData,
    denom: askDenom,
  });
  const denomPrefix = getDenomCurrencyPrefix({ baseDenom: askBaseDenom });
  return `${denomPrefix}${price} ${displayDenom}/credit: ${quantity} credit(s) available (#${id})`;
};

/* getSellOrdersOptions */

type GetSellOrdersOptionsParams = {
  sellOrders: UISellOrderInfo[];
  allowedDenomsData?: QueryAllowedDenomsResponse;
};
const getSellOrdersOptions = ({
  sellOrders,
  allowedDenomsData,
}: GetSellOrdersOptionsParams): Option[] => {
  return sellOrders.map(sellOrder => ({
    label: getSellOrderLabel({ sellOrder, allowedDenomsData }),
    value: sellOrder.id,
  }));
};

/* getOptions */

type GetOptionsParams = {
  project: BuyCreditsProject;
  allowedDenomsData?: QueryAllowedDenomsResponse;
};
export const getOptions = ({
  project,
  allowedDenomsData,
}: GetOptionsParams): Option[] => {
  if (!project?.sellOrders?.length) return [];

  const retirableSellOrders = project.sellOrders.filter(
    sellOrder => !sellOrder.disableAutoRetire,
  );
  const retirableAndTradableSellOrders = project.sellOrders.filter(
    sellOrder => sellOrder.disableAutoRetire,
  );

  const retirableOptions = getSellOrdersOptions({
    sellOrders: retirableSellOrders,
    allowedDenomsData,
  });

  const retirableAndTradableOptions = getSellOrdersOptions({
    sellOrders: retirableAndTradableSellOrders,
    allowedDenomsData,
  });

  const allOptionsLength =
    retirableOptions.length + retirableAndTradableOptions.length;

  return allOptionsLength > 1
    ? [
        { label: 'Choose a sell order', value: '', disabled: true },
        { label: 'TRADABLE AND RETIRABLE', value: '', disabled: true },
        ...retirableAndTradableOptions,
        { label: 'RETIRABLE ONLY', value: '', disabled: true },
        ...retirableOptions,
      ]
    : retirableOptions.concat(retirableAndTradableOptions);
};

/* handleBuyCreditsSubmit */

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

/* getCreditCountValidation */

export const getCreditCountValidation =
  (creditAvailable: number) => (creditCount: number) => {
    let error;
    if (creditCount > creditAvailable) {
      error = `Must be less than or equal to the max credit(s) available (${creditAvailable}).`;
    }
    return error;
  };

/* amountToSpend */

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
