import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { CreditsAmountHeader } from './CreditsAmount.Header';
import { CreditsAmountProps } from './CreditsAmount.types';
import {
  getCreditsAvailablePerCurrency,
  getSpendingCap,
} from './CreditsAmount.utils';
import { CreditsInput } from './CreditsInput';
import { CurrencyInput } from './CurrencyInput';

export const CreditsAmount = ({
  paymentOption,
  currency,
  setCurrency,
  creditsAvailable,
  setCreditsAvailable,
  filteredCryptoSellOrders,
  cardSellOrders,
  spendingCap,
  setSpendingCap,
  defaultCryptoCurrency,
}: CreditsAmountProps) => {
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const { setValue } = useFormContext<ChooseCreditsFormSchemaType>();

  const card = paymentOption === PAYMENT_OPTIONS.CARD;
  const orderedSellOrders = useMemo(
    () =>
      card
        ? cardSellOrders.sort((a, b) => a.usdPrice - b.usdPrice)
        : filteredCryptoSellOrders?.sort(
            (a, b) => Number(a.askAmount) - Number(b.askAmount),
          ) || [],

    [card, cardSellOrders, filteredCryptoSellOrders],
  );

  useEffect(() => {
    // Reset amounts to 0 on currency change
    setValue(CREDITS_AMOUNT, 0);
    setValue(CURRENCY_AMOUNT, 0);
  }, [currency, setValue]);

  useEffect(() => {
    setSpendingCap(
      getSpendingCap(paymentOption, filteredCryptoSellOrders, cardSellOrders),
    );
    setCreditsAvailable(
      getCreditsAvailablePerCurrency(
        paymentOption,
        filteredCryptoSellOrders,
        cardSellOrders,
      ),
    );
  }, [
    cardSellOrders,
    filteredCryptoSellOrders,
    paymentOption,
    setCreditsAvailable,
    setSpendingCap,
  ]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      setValue(CREDITS_AMOUNT, creditsAvailable);
      setValue(CURRENCY_AMOUNT, spendingCap);
      setMaxCreditsSelected(false);
    }
  }, [creditsAvailable, maxCreditsSelected, setValue, spendingCap]);

  // Credits amount change
  const handleCreditsAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Set currency amount according to credits quantity,
      // selecting the cheapest credits first
      const currentCreditsAmount = e.target.valueAsNumber;
      let currentCurrencyAmount = 0;
      let creditsAmountLeft = currentCreditsAmount;
      const sellOrders = [];

      for (let i = 0; i < orderedSellOrders.length; i++) {
        const order = orderedSellOrders[i];
        const price = card
          ? (order as CardSellOrder).usdPrice
          : Number(order.askAmount);
        const quantity = Number(order.quantity);

        // Take all credits from this sell order
        if (creditsAmountLeft >= quantity) {
          creditsAmountLeft -= quantity;
          currentCurrencyAmount += quantity * price;
          sellOrders.push({
            sellOrderId: order.id,
            quantity: order.quantity,
            bidPrice: !card
              ? { amount: String(price), denom: order.askDenom }
              : undefined,
            price: card ? price : undefined,
          });
          if (creditsAmountLeft === 0) break;
        } else {
          // Take only remaining credits
          currentCurrencyAmount += creditsAmountLeft * price;
          sellOrders.push({
            sellOrderId: order.id,
            quantity: String(creditsAmountLeft),
            bidPrice: !card
              ? { amount: String(price), denom: order.askDenom }
              : undefined,
            price: card ? price : undefined,
          });
          break;
        }
      }
      setValue(CURRENCY_AMOUNT, currentCurrencyAmount);
    },
    [card, orderedSellOrders, setValue],
  );

  // Currency amount change
  const handleCurrencyAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Set credits quantity according to currency amount,
      // selecting the cheapest credits first
      const currentCurrencyAmount = e.target.valueAsNumber;
      let currentCreditsAmount = 0;
      let currencyAmountLeft = currentCurrencyAmount;
      const sellOrders = [];

      for (let i = 0; i < orderedSellOrders.length; i++) {
        const order = orderedSellOrders[i];
        const price = card
          ? (order as CardSellOrder).usdPrice
          : Number(order.askAmount);
        const quantity = Number(order.quantity);
        const orderTotalAmount = quantity * price;

        if (currencyAmountLeft >= orderTotalAmount) {
          currencyAmountLeft -= orderTotalAmount;
          currentCreditsAmount += quantity;
          sellOrders.push({
            sellOrderId: order.id,
            quantity: order.quantity,
            bidPrice: !card
              ? { amount: String(price), denom: order.askDenom }
              : undefined,
            price: card ? price : undefined,
          });
          if (currencyAmountLeft === 0) break;
        } else {
          currentCreditsAmount += currencyAmountLeft / price;
          sellOrders.push({
            sellOrderId: order.id,
            quantity: currencyAmountLeft / price,
            bidPrice: !card
              ? { amount: String(price), denom: order.askDenom }
              : undefined,
            price: card ? price : undefined,
          });
          break;
        }
      }
      setValue(CREDITS_AMOUNT, currentCreditsAmount);
    },
    [card, orderedSellOrders, setValue],
  );

  return (
    <div className={`grid min-h-min`} style={{ gridAutoRows: 'min-content' }}>
      <CreditsAmountHeader
        currency={currency}
        creditsAvailable={creditsAvailable}
        setMaxCreditsSelected={setMaxCreditsSelected}
        paymentOption={paymentOption}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10 items-start">
        <CurrencyInput
          maxCurrencyAmount={spendingCap}
          paymentOption={paymentOption}
          defaultCryptoCurrency={defaultCryptoCurrency}
          currency={currency}
          setCurrency={setCurrency}
          handleCurrencyAmountChange={handleCurrencyAmountChange}
        />
        <span className="p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailable}
          handleCreditsAmountChange={handleCreditsAmountChange}
          paymentOption={paymentOption}
        />
      </div>
      {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
        <em className="italic text-xs m-0 py-20 self-start justify-self-start  sm:mb-20">
          <Trans>
            Credit prices vary. By default the lowest priced credits will be
            purchased first.
          </Trans>
        </em>
      )}
    </div>
  );
};
