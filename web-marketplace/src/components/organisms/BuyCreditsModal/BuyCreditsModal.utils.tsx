import { Box } from '@mui/material';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { quantityFormatNumberOptions } from 'config/decimals';
import { floorFloatNumber } from 'utils/number/format/format';

import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { formatNumber } from 'web-components/src/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { UISellOrderInfo } from 'pages/Projects/Projects.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';

import { BuyCreditsValues } from '..';

/* getProjectFromBatchDenom */

const getProjectFromBatchDenom = (batchDenom: string): string => {
  const parts = batchDenom.split('-');
  return `${parts[0]}-${parts[1]}`;
};

/* prepareSellOrderSupplementaryData */

interface SellOrderSupplementaryDataInput {
  sellOrderId: string;
  batchDenom: string;
  withProject: boolean;
}
const prepareSellOrderSupplementaryData = ({
  sellOrderId,
  batchDenom,
  withProject = false,
}: SellOrderSupplementaryDataInput): string => {
  return withProject
    ? `(#${sellOrderId}, ${getProjectFromBatchDenom(batchDenom)})`
    : `(#${sellOrderId})`;
};

/* sortBySellOrderId */

const sortBySellOrderId = (
  sellOrderA: UISellOrderInfo,
  sellOrderB: UISellOrderInfo,
): number => {
  if (sellOrderA.id && sellOrderB.id) {
    return Number(sellOrderA.id) < Number(sellOrderB.id) ? 1 : -1;
  }

  return 0;
};

/* getSellOrderLabel */

type GetSellOrderLabelParams = {
  sellOrder: UISellOrderInfo;
  allowedDenomsData?: QueryAllowedDenomsResponse;
  setSelectedProjectById?: (projectId: string) => void;
};
export const getSellOrderLabel = ({
  sellOrder,
  allowedDenomsData,
  setSelectedProjectById,
}: GetSellOrderLabelParams): JSX.Element => {
  const { id, askAmount, askDenom, askBaseDenom, quantity, batchDenom } = {
    ...sellOrder,
  };
  const price = microToDenom(askAmount);
  const displayDenom = findDisplayDenom({
    allowedDenomsData,
    bankDenom: askDenom,
    baseDenom: askBaseDenom,
  });
  const truncatedQuantity = floorFloatNumber(parseFloat(quantity));

  const clickHandler = setSelectedProjectById
    ? () => setSelectedProjectById(getProjectFromBatchDenom(batchDenom))
    : () => {};

  return (
    <Box onClick={clickHandler} sx={{ ml: 4 }}>
      <Box
        sx={{ display: 'inline', fontWeight: 700 }}
      >{`${price} ${displayDenom}/credit: `}</Box>
      <Box
        sx={{ display: 'inline', mr: 1 }}
      >{`${truncatedQuantity} credit(s) available`}</Box>
      <Box sx={{ display: 'inline', color: 'info.main' }}>
        {prepareSellOrderSupplementaryData({
          sellOrderId: id,
          batchDenom,
          withProject: Boolean(setSelectedProjectById),
        })}
      </Box>
    </Box>
  );
};

/* getSellOrdersOptions */

type GetSellOrdersOptionsParams = {
  sellOrders: UISellOrderInfo[];
  allowedDenomsData?: QueryAllowedDenomsResponse;
  setSelectedProjectById?: (projectId: string) => void;
};
const getSellOrdersOptions = ({
  sellOrders,
  allowedDenomsData,
  setSelectedProjectById,
}: GetSellOrdersOptionsParams): Option[] => {
  return sellOrders.map(sellOrder => ({
    label: getSellOrderLabel({
      sellOrder,
      allowedDenomsData,
      setSelectedProjectById,
    }),
    value: sellOrder.id,
  }));
};

/* getOptions */

type GetOptionsParams = {
  sellOrders?: UISellOrderInfo[];
  allowedDenomsData?: QueryAllowedDenomsResponse;
  setSelectedProjectById?: (projectId: string) => void;
};
export const getOptions = ({
  sellOrders,
  allowedDenomsData,
  setSelectedProjectById,
}: GetOptionsParams): Option[] => {
  if (!sellOrders?.length) return [{ label: '', value: '' }];

  const retirableSellOrders = sellOrders
    .filter(sellOrder => !sellOrder.disableAutoRetire)
    .sort(sortBySellOrderId);
  const retirableAndTradableSellOrders = sellOrders
    .filter(sellOrder => sellOrder.disableAutoRetire)
    .sort(sortBySellOrderId);

  const retirableOptions = getSellOrdersOptions({
    sellOrders: retirableSellOrders,
    allowedDenomsData,
    setSelectedProjectById,
  });

  const retirableAndTradableOptions = getSellOrdersOptions({
    sellOrders: retirableAndTradableSellOrders,
    allowedDenomsData,
    setSelectedProjectById,
  });

  const allOptionsLength =
    retirableOptions.length + retirableAndTradableOptions.length;

  return allOptionsLength > 1
    ? [
        {
          label: <Box sx={{ color: 'info.main' }}>{'Choose a sell order'}</Box>,
          value: '',
          disabled: true,
        },
        {
          label: <Box sx={{ fontWeight: 700 }}>{'TRADABLE AND RETIRABLE'}</Box>,
          value: '',
          disabled: true,
        },
        ...retirableAndTradableOptions,
        {
          label: <Box sx={{ fontWeight: 700 }}>{'RETIRABLE ONLY'}</Box>,
          value: '',
          disabled: true,
        },
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
    askDenom: selectedSellOrder.askDenom,
    batchDenom: selectedSellOrder.batchDenom,
    sellOrderId: selectedSellOrder.id,
    country: retirementAction === 'autoretire' ? country : '',
    postalCode: retirementAction === 'autoretire' ? postalCode : '',
    stateProvince: retirementAction === 'autoretire' ? stateProvince : '',
  };
  await onSubmit(fullValues);
};

/* getCreditCountValidation */

interface GetCreditCountValidationProps {
  creditAvailable: number;
  userBalance: number;
  askAmount: number;
  displayDenom?: string;
}

export const getCreditCountValidation =
  ({
    creditAvailable,
    askAmount,
    displayDenom,
    userBalance,
  }: GetCreditCountValidationProps) =>
  (creditCount: number) => {
    let error;

    if (askAmount && userBalance < askAmount * creditCount) {
      error = `You don’t have enough ${displayDenom}.`;
    }
    if (creditCount > creditAvailable) {
      error = `Must be less than or equal to the max credit(s) available (${creditAvailable}).`;
    }
    return error;
  };

/* amountToSpend */

type AmountToSpendParams = {
  creditCount: number;
  askAmount?: string;
};

export const amountToSpend = ({
  creditCount,
  askAmount,
}: AmountToSpendParams): String =>
  formatNumber({
    num: creditCount * microToDenom(askAmount),
    ...quantityFormatNumberOptions,
  }) ?? '-';
