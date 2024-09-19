import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { denomToMicro, microToDenom } from 'lib/denom.utils';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { findDisplayDenom } from '../DenomLabel/DenomLabel.utils';
import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from './CreditsAmount.constants';
import { CreditsAmountHeader } from './CreditsAmount.Header';
import { CreditsAmountProps } from './CreditsAmount.types';
import {
  formatFullSellOrder,
  getCreditsAmount,
  getCreditsAvailablePerCurrency,
  getCurrencyAmount,
  getSellOrderPrice,
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
  cryptoCurrencies,
  allowedDenoms,
  creditTypePrecision,
}: CreditsAmountProps) => {
  const { _ } = useLingui();

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
  console.log('orderedSellOrders', orderedSellOrders);
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
        creditTypePrecision,
      ),
    );
  }, [
    cardSellOrders,
    filteredCryptoSellOrders,
    paymentOption,
    setCreditsAvailable,
    setSpendingCap,
    creditTypePrecision,
  ]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      setValue(CREDITS_AMOUNT, creditsAvailable);
      setValue(
        CURRENCY_AMOUNT,
        paymentOption === PAYMENT_OPTIONS.CARD
          ? spendingCap
          : microToDenom(spendingCap),
      );
      setValue(
        SELL_ORDERS,
        orderedSellOrders.map(order => {
          const price = getSellOrderPrice({ order, card });
          return formatFullSellOrder({ order, card, price });
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
      });
      setValue(CURRENCY_AMOUNT, currencyAmount);
      setValue(SELL_ORDERS, sellOrders);
    },
    [card, orderedSellOrders, setValue],
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
      });
      setValue(CREDITS_AMOUNT, currentCreditsAmount);
      setValue(SELL_ORDERS, sellOrders);
    },
    [card, orderedSellOrders, setValue],
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
          defaultCryptoCurrency={defaultCryptoCurrency}
          currency={currency}
          setCurrency={setCurrency}
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
