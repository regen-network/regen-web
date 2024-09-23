import { Suspense, useCallback, useMemo, useState } from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import Card from 'web-components/src/components/cards/Card';
import { Loading } from 'web-components/src/components/loading';
import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { NEXT, PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { CURRENCIES } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { AllowedDenoms } from 'components/molecules/DenomLabel/DenomLabel.utils';

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
  cryptoSellOrders: Array<UISellOrderInfo>;
  cardDisabled: boolean;
  allowedDenoms?: AllowedDenoms;
  creditTypePrecision?: number | null;
  initialValues?: DefaultValues<ChooseCreditsFormSchemaType>;
  onPrev: () => void;
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
  allowedDenoms,
  creditTypePrecision,
  initialValues,
  onPrev,
}: Props) {
  const { _ } = useLingui();
  const cryptoCurrencies = useMemo(
    () =>
      cryptoSellOrders
        .map(order => ({
          askDenom: order.askDenom,
          askBaseDenom: order.askBaseDenom,
        }))
        .filter(
          (obj1, i, arr) =>
            arr.findIndex(obj2 => obj2.askDenom === obj1.askDenom) === i,
        ),
    [cryptoSellOrders],
  );

  const defaultCryptoCurrency: Currency | undefined = cryptoCurrencies[0];

  const cardCurrency = useMemo(
    () => ({
      askDenom: CURRENCIES.usd,
      askBaseDenom: CURRENCIES.usd,
    }),
    [],
  );

  const [spendingCap, setSpendingCap] = useState(0);
  const [creditsAvailable, setCreditsAvailable] = useState(0);

  const form = useZodForm({
    schema: createChooseCreditsFormSchema({
      creditsAvailable,
      spendingCap,
    }),
    defaultValues: {
      [CURRENCY_AMOUNT]: initialValues?.[CURRENCY_AMOUNT] || 0,
      [CREDITS_AMOUNT]: initialValues?.[CREDITS_AMOUNT] || 0,
      [SELL_ORDERS]: initialValues?.[SELL_ORDERS] || [],
      [CREDIT_VINTAGE_OPTIONS]: initialValues?.[CREDIT_VINTAGE_OPTIONS] || [],
      [CURRENCY]: initialValues?.[CURRENCY]?.askDenom
        ? initialValues?.[CURRENCY]
        : paymentOption === PAYMENT_OPTIONS.CARD
        ? cardCurrency
        : defaultCryptoCurrency,
    },
    mode: 'onChange',
  });
  const { isValid, isSubmitting } = useFormState({
    control: form.control,
  });

  const currency = useWatch({
    control: form.control,
    name: CURRENCY,
  });

  const filteredCryptoSellOrders = useMemo(
    () =>
      getFilteredCryptoSellOrders({
        askDenom: currency?.askDenom,
        cryptoSellOrders,
        retiring,
      }),
    [cryptoSellOrders, currency?.askDenom, retiring],
  );

  const handleCryptoPurchaseOptions = useCallback(() => {
    setRetiring(prev => !prev);

    // Reset amounts to 0 on retirement change
    form.setValue(CREDITS_AMOUNT, 0);
    form.setValue(CURRENCY_AMOUNT, 0);
    form.trigger(); // trigger validation
  }, [form, setRetiring]);

  const handlePaymentOptions = useCallback(
    (option: string) => {
      setPaymentOption(option as PaymentOptionsType);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      form.setValue(
        CURRENCY,
        option === PAYMENT_OPTIONS.CARD ? cardCurrency : defaultCryptoCurrency,
      );
      form.setValue(CREDITS_AMOUNT, 0);
      form.setValue(CURRENCY_AMOUNT, 0);
      form.trigger();
    },
    [cardCurrency, defaultCryptoCurrency, form, setPaymentOption],
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
      <Form form={form} onSubmit={onSubmit} data-testid="choose-credits-form">
        <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300 sm:w-[560px]">
          <PaymentOptions
            paymentOption={paymentOption}
            setPaymentOption={handlePaymentOptions}
            cardDisabled={cardDisabled}
          />
          {currency && (
            <CreditsAmount
              paymentOption={paymentOption}
              spendingCap={spendingCap}
              setSpendingCap={setSpendingCap}
              creditsAvailable={creditsAvailable}
              setCreditsAvailable={setCreditsAvailable}
              filteredCryptoSellOrders={filteredCryptoSellOrders}
              cardSellOrders={cardSellOrders}
              defaultCryptoCurrency={defaultCryptoCurrency}
              cryptoCurrencies={cryptoCurrencies}
              allowedDenoms={allowedDenoms}
              creditTypePrecision={creditTypePrecision}
            />
          )}
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <CryptoOptions
              retiring={retiring}
              handleCryptoPurchaseOptions={handleCryptoPurchaseOptions}
              tradableDisabled={cryptoSellOrders.every(
                order => order.disableAutoRetire === false,
              )}
            />
          )}
          {/* Advanced settings not enabled for MVP */}
          {/* <AdvanceSettings
            creditVintages={creditVintages}
            advanceSettingsOpen={advanceSettingsOpen}
            toggleAdvancedSettings={toggleAdvancedSettings}
            handleCreditVintageOptions={handleCreditVintageOptions}
          /> */}
        </Card>
        <div className="float-right pt-40">
          <PrevNextButtons
            saveDisabled={!isValid || isSubmitting}
            saveText={_(NEXT)}
            onPrev={onPrev}
          />
        </div>
      </Form>
    </Suspense>
  );
}
