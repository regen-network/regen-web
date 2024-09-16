import {
  ChangeEvent,
  MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWatch } from 'react-hook-form';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { SellOrder } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { getCreditsAvailablePerCurrency } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.utils';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import Card from 'web-components/src/components/cards/Card';
import {
  CryptoCurrencies,
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Loading } from 'web-components/src/components/loading';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

import { CryptoOptions } from './ChooseCreditsForm.CryptoOptions';
import { PaymentOptions } from './ChooseCreditsForm.PaymentOptions';
import {
  ChooseCreditsFormSchemaType,
  createChooseCreditsFormSchema,
} from './ChooseCreditsForm.schema';
import { CardSellOrder } from './ChooseCreditsForm.types';
import { getFilteredCryptoSellOrders } from './ChooseCreditsForm.utils';

export type Props = {
  paymentOption: PaymentOptionsType;
  setPaymentOption: UseStateSetter<PaymentOptionsType>;
  retiring: boolean;
  setRetiring: UseStateSetter<boolean>;
  onSubmit: (values: ChooseCreditsFormSchemaType) => Promise<void>;
  cardSellOrders: Array<CardSellOrder>;
  cryptoSellOrders: Array<SellOrderInfo>;
  cardDisabled: boolean;
};

export function ChooseCreditsForm({
  paymentOption,
  setPaymentOption,
  retiring,
  setRetiring,
  onSubmit,
  cardSellOrders,
  cryptoSellOrders,
  cardDisabled,
}: Props) {
  const groupedCryptoSellOrders = useMemo(
    () =>
      cryptoSellOrders.reduce(
        (result: { [denom: string]: Array<SellOrderInfo> }, order) => {
          (result[order.askDenom] = result[order.askDenom] || []).push(order);
          return result;
        },
        {},
      ),
    [cryptoSellOrders],
  );
  // TODO make part of state?
  // in case retiring = false, not all crypto cur might be available
  const cryptoCurrencies = useMemo(
    () => Object.keys(groupedCryptoSellOrders),
    [groupedCryptoSellOrders],
  );

  const defaultCryptoCurrency = cryptoCurrencies[0] as CryptoCurrencies;
  const initCurrency =
    paymentOption === PAYMENT_OPTIONS.CARD
      ? CURRENCIES.usd
      : defaultCryptoCurrency;
  const [currency, setCurrency] = useState<Currency>(initCurrency);
  const [spendingCap, setSpendingCap] = useState(0);
  const [creditsAvailable, setCreditsAvailable] = useState(0);

  const chooseCreditsFormSchema = createChooseCreditsFormSchema({
    creditsAvailable,
    spendingCap,
  });

  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      [CURRENCY_AMOUNT]: 0,
      [CREDITS_AMOUNT]: 0,
    },
    mode: 'onChange',
  });

  const filteredCryptoSellOrders = useMemo(
    () =>
      getFilteredCryptoSellOrders(currency, groupedCryptoSellOrders, retiring),
    [currency, groupedCryptoSellOrders, retiring],
  );

  const handleCryptoPurchaseOptions = useCallback(() => {
    setRetiring(prev => !prev);

    // Reset amounts to 0 on retirement change
    form.setValue(CREDITS_AMOUNT, 0);
    form.setValue(CURRENCY_AMOUNT, 0);
  }, [form, setRetiring]);

  const handlePaymentOptions = useCallback(
    (option: string) => {
      setPaymentOption(option as PaymentOptionsType);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      setCurrency(
        option === PAYMENT_OPTIONS.CARD
          ? CURRENCIES.usd
          : defaultCryptoCurrency,
      );
    },
    [defaultCryptoCurrency, form, setPaymentOption],
  );

  // Advanced settings not enabled for MVP
  // const [advanceSettingsOpen, setAdvanceSettingsOpen] = useState(false);
  // const creditVintageOptions = useWatch({
  //   control: form.control,
  //   name: CREDIT_VINTAGE_OPTIONS,
  // });
  // useEffect(() => {
  //   if (!advanceSettingsOpen) {
  //     form.setValue(CREDIT_VINTAGE_OPTIONS, []);
  //   }
  // }, [advanceSettingsOpen, form]);

  // const handleCreditVintageOptions = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     const checked = e.target.checked;
  //     const currentValues = creditVintageOptions || [];
  //     const updatedValues = checked
  //       ? [...currentValues, value]
  //       : currentValues.filter(item => item !== value);

  //     form.setValue(CREDIT_VINTAGE_OPTIONS, updatedValues);
  //   },
  //   [creditVintageOptions, form],
  // );
  // const toggleAdvancedSettings = useCallback((e: MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   setAdvanceSettingsOpen(prev => !prev);
  // }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
        <Form form={form} onSubmit={onSubmit} data-testid="choose-credits-form">
          <PaymentOptions
            setPaymentOption={handlePaymentOptions}
            cardDisabled={cardDisabled}
          />
          <CreditsAmount
            paymentOption={paymentOption}
            currency={currency}
            setCurrency={setCurrency}
            spendingCap={spendingCap}
            setSpendingCap={setSpendingCap}
            creditsAvailable={creditsAvailable}
            setCreditsAvailable={setCreditsAvailable}
            filteredCryptoSellOrders={filteredCryptoSellOrders}
            cardSellOrders={cardSellOrders}
            defaultCryptoCurrency={defaultCryptoCurrency}
          />
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <CryptoOptions
              retiring={retiring}
              handleCryptoPurchaseOptions={handleCryptoPurchaseOptions}
            />
          )}
          {/* Advanced settings not enabled for MVP */}
          {/* <AdvanceSettings
            creditVintages={creditVintages}
            advanceSettingsOpen={advanceSettingsOpen}
            toggleAdvancedSettings={toggleAdvancedSettings}
            handleCreditVintageOptions={handleCreditVintageOptions}
          /> */}
        </Form>
      </Card>
    </Suspense>
  );
}
