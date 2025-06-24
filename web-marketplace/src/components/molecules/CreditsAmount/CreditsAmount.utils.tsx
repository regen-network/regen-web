import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { denomToMicro, microToDenom } from 'lib/denom.utils';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { CURRENCY_AMOUNT } from './CreditsAmount.constants';

export const getCreditsAvailablePerCurrency = (
  paymentOption: PaymentOptionsType,
  filteredCryptoSellOrders: Array<UISellOrderInfo> | undefined,
  cardSellOrders: Array<CardSellOrder>,
  creditTypePrecision?: number | null,
) => {
  return paymentOption === PAYMENT_OPTIONS.CARD
    ? cardSellOrders.reduce((prev, cur) => prev + Number(cur.quantity), 0)
    : filteredCryptoSellOrders?.reduce((prev, cur) => {
        return parseFloat(
          (prev + Number(cur.quantity)).toFixed(creditTypePrecision || 6),
        );
      }, 0) || 0;
};

export function getSpendingCap(
  paymentOption: PaymentOptionsType,
  filteredCryptoSellOrders: Array<UISellOrderInfo> | undefined,
  cardSellOrders: Array<CardSellOrder>,
) {
  return paymentOption === PAYMENT_OPTIONS.CARD
    ? cardSellOrders.reduce((prev, cur) => {
        return formatCurrencyAmount(
          prev + Number(cur.quantity) * cur.price,
          true,
        );
      }, 0)
    : microToDenom(
        filteredCryptoSellOrders?.reduce(
          (prev, cur) => prev + Number(cur.quantity) * Number(cur.askAmount),
          0,
        ) || 0,
      );
}

type GetCreditsAmountParams = {
  value: number;
  card: boolean;
  orderedSellOrders: UISellOrderInfo[];
  creditTypePrecision?: number | null;
};
export const getCreditsAmount = ({
  value,
  card,
  orderedSellOrders,
  creditTypePrecision,
}: GetCreditsAmountParams) => {
  const currentCurrencyAmount = card
    ? formatCurrencyAmount(value, true)
    : denomToMicro(value);
  let currentCreditsAmount = 0;
  let currencyAmountLeft = currentCurrencyAmount;
  const sellOrders = [];
  const creditPrecision = creditTypePrecision || 6;

  for (const order of orderedSellOrders) {
    const pricePerCredit = getSellOrderPrice({ order, card });
    const totalCreditsAvailable = Number(order.quantity);
    const totalOrderPrice = totalCreditsAvailable * pricePerCredit;

    if (currencyAmountLeft >= totalOrderPrice) {
      currencyAmountLeft = card
        ? formatCurrencyAmount(currencyAmountLeft - totalOrderPrice)
        : parseFloat((currencyAmountLeft - totalOrderPrice).toFixed(6));
      currentCreditsAmount += totalCreditsAvailable;
      sellOrders.push(formatSellOrder({ order, card, price: pricePerCredit }));
      if (currencyAmountLeft === 0) break;
    } else {
      currentCreditsAmount += currencyAmountLeft / pricePerCredit;
      sellOrders.push(
        formatSellOrder({
          order,
          card,
          price: pricePerCredit,
          quantity: (currencyAmountLeft / pricePerCredit).toFixed(
            creditPrecision,
          ),
        }),
      );
      break;
    }
  }
  return {
    currentCreditsAmount: parseFloat(
      currentCreditsAmount.toFixed(creditPrecision),
    ),
    sellOrders,
  };
};

type GetCurrencyAmountParams = {
  currentCreditsAmount: number;
  card: boolean;
  orderedSellOrders: UISellOrderInfo[];
  creditTypePrecision?: number | null;
};
export const getCurrencyAmount = ({
  currentCreditsAmount,
  card,
  orderedSellOrders,
  creditTypePrecision,
}: GetCurrencyAmountParams) => {
  let currentCurrencyAmount = 0;
  let creditsAmountLeft = currentCreditsAmount;
  const sellOrders = [];

  for (const order of orderedSellOrders) {
    const price = getSellOrderPrice({ order, card });
    const quantity = Number(order.quantity);

    // Take all credits from this sell order
    if (creditsAmountLeft >= quantity) {
      creditsAmountLeft = parseFloat(
        (creditsAmountLeft - quantity).toFixed(creditTypePrecision || 6),
      );
      currentCurrencyAmount += quantity * price;
      sellOrders.push(formatSellOrder({ order, card, price }));

      if (creditsAmountLeft === 0) break;
    } else {
      // Take only remaining credits
      currentCurrencyAmount += creditsAmountLeft * price;
      sellOrders.push(
        formatSellOrder({
          order,
          card,
          price,
          quantity: String(creditsAmountLeft),
        }),
      );
      break;
    }
  }

  return {
    [CURRENCY_AMOUNT]: card
      ? formatCurrencyAmount(currentCurrencyAmount, true)
      : parseFloat(microToDenom(currentCurrencyAmount).toFixed(6)),
    sellOrders,
  };
};

type GetSellOrderPriceParams = {
  order: UISellOrderInfo;
  card: boolean;
};
export const getSellOrderPrice = ({ order, card }: GetSellOrderPriceParams) =>
  card ? (order as CardSellOrder).price : Number(order.askAmount);

type FormatSellOrderParams = {
  price: number;
  quantity?: string;
} & GetSellOrderPriceParams;
export const formatSellOrder = ({
  order,
  card,
  price,
  quantity,
}: FormatSellOrderParams) => {
  return {
    sellOrderId: order.id,
    batchDenom: order.batchDenom,
    quantity: quantity || order.quantity,
    bidPrice: !card
      ? { amount: String(price), denom: order.askDenom }
      : undefined,
    price: card ? parseFloat((price * 100).toFixed(2)) : undefined, // stripe amounts should be in the smallest currency unit (e.g., 100 cents to charge $1.00)
  };
};

/**
 * Formats a given value to a currency amount with max two decimals.
 *
 * @param value - The value to format. Can be a string or a number.
 * @param roundUpDecimal - Optional. If true, rounds the value up to the nearest two decimals. Defaults to false.
 * @returns The formatted currency amount as a number with two decimals.
 *
 */
export const formatCurrencyAmount = (
  value: string | number,
  roundUpDecimal = false,
) => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const stringValue = value.toString();
  const [integerPart, decimalPart] = stringValue.split('.');

  if (isNaN(numericValue)) {
    return 0;
  }

  // Round to two decimals, either returning the value with
  // the first two decimals only, if any, or rounding them up.
  const formattedValue = roundUpDecimal
    ? // JavaScript numbers are stored as 64-bit floating-point numbers.
      // These numbers have 52 bits for the fraction, which corresponds to about 15–17 decimal digits.
      // Using .toPrecision(15) reduces floating-point precision errors that occur when performing arithmetic operations like multiplication and division.
      +(Math.ceil(Number((numericValue * 100).toPrecision(15))) / 100).toFixed(
        decimalPart ? decimalPart.length : 2,
      )
    : decimalPart
    ? +`${integerPart}.${decimalPart.slice(0, 2)}`
    : +`${integerPart}`;

  return formattedValue;
};

export const shouldFormatValue = (
  decimalPart: string | undefined,
  paymentOption: string,
  value: string,
): boolean => {
  const isDecimalPartValid = decimalPart && decimalPart.length > 2;
  const startsWithZero = decimalPart && decimalPart.startsWith('00');
  const isCardPayment = paymentOption === PAYMENT_OPTIONS.CARD;

  const condition1 = isDecimalPartValid && startsWithZero && isCardPayment;
  const condition2 =
    (isDecimalPartValid && !startsWithZero && isCardPayment) ||
    /^0[0-9]/.test(value);

  return condition1 || condition2;
};
