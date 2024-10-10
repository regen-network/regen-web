import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { i18n } from '@lingui/core';
import { msg, plural, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import { microToDenom } from 'lib/denom.utils';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import { findDisplayDenom } from '../DenomLabel/DenomLabel.utils';
import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from './CreditsAmount.constants';
import { CreditsAmountHeader } from './CreditsAmount.Header';
import { CreditsAmountProps } from './CreditsAmount.types';
import {
  formatSellOrder,
  getCreditsAmount,
  getCreditsAvailablePerCurrency,
  getCurrencyAmount,
  getSellOrderPrice,
  getSpendingCap,
} from './CreditsAmount.utils';
import { CreditsInput } from './CreditsInput';
import { CurrencyInput } from './CurrencyInput';

export const CreditsAmount = ({
  currency,
  paymentOption,
  creditsAvailable,
  setCreditsAvailable,
  filteredCryptoSellOrders,
  cardSellOrders,
  spendingCap,
  setSpendingCap,
  cryptoCurrencies,
  allowedDenoms,
  creditTypePrecision,
}: CreditsAmountProps) => {
  const { _ } = useLingui();

  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const { setValue, trigger, getValues } =
    useFormContext<ChooseCreditsFormSchemaType>();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
  );
  const orderedSellOrders = useMemo(
    () =>
      card
        ? cardSellOrders.sort((a, b) => a.usdPrice - b.usdPrice)
        : filteredCryptoSellOrders?.sort(
            (a, b) => Number(a.askAmount) - Number(b.askAmount),
          ) || [],

    [card, cardSellOrders, filteredCryptoSellOrders],
  );

  const setInitialCreditsAmount = useCallback(async () => {
    if (getValues(CREDITS_AMOUNT) === 0) {
      const _creditsAvailable = getCreditsAvailablePerCurrency(
        paymentOption,
        filteredCryptoSellOrders,
        cardSellOrders,
        creditTypePrecision,
      );
      const creditsAmount = Math.min(_creditsAvailable, 1);
      await setValue(CREDITS_AMOUNT, creditsAmount);

      const { currencyAmount, sellOrders } = getCurrencyAmount({
        currentCreditsAmount: creditsAmount,
        card,
        orderedSellOrders,
        creditTypePrecision,
      });
      await setValue(CURRENCY_AMOUNT, currencyAmount);
      await setValue(SELL_ORDERS, sellOrders);
      trigger();
    }
  }, [
    card,
    cardSellOrders,
    creditTypePrecision,
    filteredCryptoSellOrders,
    getValues,
    orderedSellOrders,
    paymentOption,
    setValue,
    trigger,
  ]);

  useEffect(() => {
    // Set initial credits amount to min(1, creditsAvailable)
    setInitialCreditsAmount();
  }, [setInitialCreditsAmount]);

  useEffect(() => {
    const _spendingCap = getSpendingCap(
      paymentOption,
      filteredCryptoSellOrders,
      cardSellOrders,
    );
    setSpendingCap(_spendingCap);
    const _creditsAvailable = getCreditsAvailablePerCurrency(
      paymentOption,
      filteredCryptoSellOrders,
      cardSellOrders,
      creditTypePrecision,
    );
    setCreditsAvailable(_creditsAvailable);

    // This can happen when the user switches payment option, currency,
    // or to only buy tradable credits,
    // but the amount set is above the amount of newly available credits
    const currentCreditsAmount = getValues(CREDITS_AMOUNT);
    if (currentCreditsAmount > _creditsAvailable) {
      setValue(CREDITS_AMOUNT, _creditsAvailable);
      setValue(CURRENCY_AMOUNT, _spendingCap);
      setValue(
        SELL_ORDERS,
        orderedSellOrders.map(order => {
          const price = getSellOrderPrice({ order, card });
          return formatSellOrder({ order, card, price });
        }),
      );
      const formattedCreditsAvailable = i18n.number(_creditsAvailable);
      setErrorBannerTextAtom(
        plural(_creditsAvailable, {
          one: `Only ${formattedCreditsAvailable} credit available with those paramaters, order quantity changed`,
          other: `Only ${formattedCreditsAvailable} credits available with those paramaters, order quantity changed`,
        }),
      );
    } else {
      // Else we keep the same amount of credits
      // but we still need to update currency amount and sell orders
      // (because pricing and sell orders can be different)
      const { currencyAmount, sellOrders } = getCurrencyAmount({
        currentCreditsAmount,
        card,
        orderedSellOrders,
        creditTypePrecision,
      });
      setValue(CURRENCY_AMOUNT, currencyAmount);
      setValue(SELL_ORDERS, sellOrders);
    }
  }, [
    cardSellOrders,
    filteredCryptoSellOrders,
    paymentOption,
    setCreditsAvailable,
    setSpendingCap,
    creditTypePrecision,
    getValues,
    setValue,
    orderedSellOrders,
    card,
    setErrorBannerTextAtom,
    _,
  ]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      setValue(CREDITS_AMOUNT, creditsAvailable, { shouldValidate: true });
      setValue(
        CURRENCY_AMOUNT,
        paymentOption === PAYMENT_OPTIONS.CARD
          ? spendingCap
          : microToDenom(spendingCap),
        { shouldValidate: true },
      );
      setValue(
        SELL_ORDERS,
        orderedSellOrders.map(order => {
          const price = getSellOrderPrice({ order, card });
          return formatSellOrder({ order, card, price });
        }),
      );
      setMaxCreditsSelected(false);
    }
  }, [
    card,
    creditsAvailable,
    maxCreditsSelected,
    orderedSellOrders,
    paymentOption,
    setValue,
    spendingCap,
  ]);

  // Credits amount change
  const handleCreditsAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Set currency amount according to credits quantity,
      // selecting the cheapest credits first
      const currentCreditsAmount = e.target.valueAsNumber;
      const { currencyAmount, sellOrders } = getCurrencyAmount({
        currentCreditsAmount,
        card,
        orderedSellOrders,
        creditTypePrecision,
      });
      setValue(CURRENCY_AMOUNT, currencyAmount, { shouldValidate: true });
      setValue(SELL_ORDERS, sellOrders);
    },
    [card, orderedSellOrders, setValue, creditTypePrecision],
  );

  // Currency amount change
  const handleCurrencyAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Set credits quantity according to currency amount,
      // selecting the cheapest credits first
      const value = e.target.valueAsNumber;
      const { currentCreditsAmount, sellOrders } = getCreditsAmount({
        value,
        card,
        orderedSellOrders,
        creditTypePrecision,
      });
      setValue(CREDITS_AMOUNT, currentCreditsAmount, { shouldValidate: true });
      setValue(SELL_ORDERS, sellOrders);
    },
    [card, orderedSellOrders, setValue, creditTypePrecision],
  );

  const displayDenom = findDisplayDenom({
    allowedDenoms,
    bankDenom: currency.askDenom,
    baseDenom: currency.askBaseDenom,
  });

  return (
    <div className={`grid min-h-min`} style={{ gridAutoRows: 'min-content' }}>
      <CreditsAmountHeader
        displayDenom={displayDenom}
        baseDenom={currency.askBaseDenom}
        creditsAvailable={creditsAvailable}
        setMaxCreditsSelected={setMaxCreditsSelected}
        paymentOption={paymentOption}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10 sm:gap-0 items-start">
        <CurrencyInput
          maxCurrencyAmount={spendingCap}
          paymentOption={paymentOption}
          selectPlaceholderAriaLabel={_(msg`Select option`)}
          selectAriaLabel={_(msg`Select option`)}
          handleCurrencyAmountChange={handleCurrencyAmountChange}
          cryptoCurrencies={cryptoCurrencies}
          displayDenom={displayDenom}
          allowedDenoms={allowedDenoms}
        />
        <span className="p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailable}
          handleCreditsAmountChange={handleCreditsAmountChange}
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
