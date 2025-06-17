import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  paymentOptionAtom,
  spendingCapAtom,
} from 'legacy-pages/BuyCredits/BuyCredits.atoms';
import { PAYMENT_OPTIONS } from 'legacy-pages/BuyCredits/BuyCredits.constants';
import { BuyCreditsSchemaTypes } from 'legacy-pages/BuyCredits/BuyCredits.types';
import {
  getCreditsAvailableBannerText,
  getOrderedSellOrders,
  resetCurrencyAndCredits,
} from 'legacy-pages/BuyCredits/BuyCredits.utils';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { warningBannerTextAtom } from 'lib/atoms/banner.atoms';

import { useMultiStep } from 'components/templates/MultiStepTemplate';

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
  creditsAvailable,
  setCreditsAvailable,
  filteredCryptoSellOrders,
  cardSellOrders,
  cryptoCurrencies,
  allowedDenoms,
  creditTypePrecision,
}: CreditsAmountProps) => {
  const { _ } = useLingui();

  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const { setValue, trigger, getValues } =
    useFormContext<ChooseCreditsFormSchemaType>();
  const setWarningBannerTextAtom = useSetAtom(warningBannerTextAtom);
  const [spendingCap, setSpendingCap] = useAtom(spendingCapAtom);
  const paymentOption = useAtomValue(paymentOptionAtom);
  const {
    data,
    handleSave: updateMultiStepData,
    activeStep,
  } = useMultiStep<BuyCreditsSchemaTypes>();

  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
  );
  const orderedSellOrders = useMemo(
    () => getOrderedSellOrders(card, cardSellOrders, filteredCryptoSellOrders),
    [card, cardSellOrders, filteredCryptoSellOrders],
  );

  const displayDenom = useMemo(
    () =>
      findDisplayDenom({
        allowedDenoms,
        bankDenom: currency.askDenom,
        baseDenom: currency.askBaseDenom,
      }),
    [allowedDenoms, currency.askDenom, currency.askBaseDenom],
  );

  useEffect(() => {
    // Set initial credits amount to min(1, creditsAvailable)
    if (
      ((filteredCryptoSellOrders &&
        filteredCryptoSellOrders.length > 0 &&
        !card) ||
        (cardSellOrders && cardSellOrders.length > 0 && card)) &&
      getValues(CREDITS_AMOUNT) === 0 &&
      creditsAvailable !== 0
    ) {
      const _creditsAvailable = getCreditsAvailablePerCurrency(
        paymentOption,
        filteredCryptoSellOrders,
        cardSellOrders,
        creditTypePrecision,
      );

      const creditsAmount = Math.min(_creditsAvailable, 1);
      setValue(CREDITS_AMOUNT, creditsAmount);

      const { currencyAmount, sellOrders } = getCurrencyAmount({
        currentCreditsAmount: creditsAmount,
        card,
        orderedSellOrders,
        creditTypePrecision,
      });
      setValue(CURRENCY_AMOUNT, currencyAmount);
      setValue(SELL_ORDERS, sellOrders);
      trigger();
    }
  }, [
    card,
    cardSellOrders,
    creditTypePrecision,
    creditsAvailable,
    filteredCryptoSellOrders,
    getValues,
    orderedSellOrders,
    paymentOption,
    setValue,
    trigger,
  ]);

  useEffect(() => {
    if (
      (filteredCryptoSellOrders &&
        filteredCryptoSellOrders.length > 0 &&
        !card) ||
      (cardSellOrders && cardSellOrders.length > 0 && card)
    ) {
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
      let currentCreditsAmount = getValues(CREDITS_AMOUNT);
      if (currentCreditsAmount > _creditsAvailable) {
        setWarningBannerTextAtom(
          getCreditsAvailableBannerText(_creditsAvailable, displayDenom),
        );
        resetCurrencyAndCredits(
          paymentOption,
          orderedSellOrders,
          creditTypePrecision,
          setValue,
          updateMultiStepData,
          data,
          activeStep,
          _creditsAvailable,
        );
      } else {
        // Else we keep the same amount of credits
        resetCurrencyAndCredits(
          paymentOption,
          orderedSellOrders,
          creditTypePrecision,
          setValue,
          updateMultiStepData,
          data,
          activeStep,
          currentCreditsAmount,
        );
      }
    }
    // Intentionally omit `updateMultiStepData` and `data` from the dependency array
    // because including them trigger unnecessary renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setWarningBannerTextAtom,
    _,
    activeStep,
    displayDenom,
  ]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected && spendingCap) {
      setValue(CREDITS_AMOUNT, creditsAvailable, { shouldValidate: true });
      setValue(CURRENCY_AMOUNT, spendingCap, {
        shouldValidate: true,
      });
      const sellOrders = orderedSellOrders.map(order => {
        const price = getSellOrderPrice({ order, card });
        return formatSellOrder({ order, card, price });
      });
      setValue(SELL_ORDERS, sellOrders);
      updateMultiStepData(
        {
          ...data,
          creditsAmount: creditsAvailable,
          currencyAmount: spendingCap,
          sellOrders: sellOrders,
        },
        activeStep,
      );
      setMaxCreditsSelected(false);
    }
  }, [
    activeStep,
    card,
    creditsAvailable,
    data,
    maxCreditsSelected,
    orderedSellOrders,
    paymentOption,
    setValue,
    spendingCap,
    updateMultiStepData,
  ]);

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
      updateMultiStepData(
        {
          ...data,
          creditsAmount: currentCreditsAmount,
          currencyAmount: currencyAmount,
          sellOrders,
        },
        activeStep,
      );
    },
    [
      card,
      orderedSellOrders,
      creditTypePrecision,
      setValue,
      updateMultiStepData,
      data,
      activeStep,
    ],
  );

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

      updateMultiStepData(
        {
          ...data,
          creditsAmount: currentCreditsAmount,
          currencyAmount: isNaN(value) ? 0 : value,
          sellOrders,
        },
        activeStep,
      );
      setValue(CREDITS_AMOUNT, currentCreditsAmount, { shouldValidate: true });
      setValue(SELL_ORDERS, sellOrders);
    },
    [
      card,
      orderedSellOrders,
      creditTypePrecision,
      updateMultiStepData,
      data,
      activeStep,
      setValue,
    ],
  );

  return (
    <div className={`grid min-h-min`} style={{ gridAutoRows: 'min-content' }}>
      <CreditsAmountHeader
        displayDenom={displayDenom}
        baseDenom={currency.askBaseDenom}
        bankDenom={currency.askDenom}
        creditsAvailable={creditsAvailable}
        setMaxCreditsSelected={setMaxCreditsSelected}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10 sm:gap-0 items-start">
        {spendingCap && (
          <CurrencyInput
            maxCurrencyAmount={spendingCap}
            selectPlaceholderAriaLabel={_(msg`Select option`)}
            selectAriaLabel={_(msg`Select option`)}
            handleCurrencyAmountChange={handleCurrencyAmountChange}
            cryptoCurrencies={cryptoCurrencies}
            displayDenom={displayDenom}
            allowedDenoms={allowedDenoms}
            orderedSellOrders={orderedSellOrders}
            creditTypePrecision={creditTypePrecision}
          />
        )}
        <span className="p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailable}
          handleCreditsAmountChange={handleCreditsAmountChange}
          orderedSellOrders={orderedSellOrders}
          creditTypePrecision={creditTypePrecision}
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
