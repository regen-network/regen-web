import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
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
  projectHref: string;
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
  projectHref,
}: Props) {
  const { _ } = useLingui();
  const navigate = useNavigate();

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

  const [currency, setCurrency] = useState<Currency | undefined>(undefined);
  useEffect(
    () =>
      setCurrency(
        prev =>
          prev ||
          (paymentOption === PAYMENT_OPTIONS.CARD
            ? cardCurrency
            : defaultCryptoCurrency),
      ),
    [cardCurrency, defaultCryptoCurrency, paymentOption],
  );

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
      [SELL_ORDERS]: [],
      [CREDIT_VINTAGE_OPTIONS]: [],
    },
    mode: 'onChange',
  });
  // const { isValid, isSubmitting, errors } = useFormState({
  //   control: form.control,
  // });
  // console.log('values', form.getValues());
  // console.log('isValid', isValid);
  // console.log('errors', errors);

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
  }, [form, setRetiring]);

  const handlePaymentOptions = useCallback(
    (option: string) => {
      setPaymentOption(option as PaymentOptionsType);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      setCurrency(
        option === PAYMENT_OPTIONS.CARD ? cardCurrency : defaultCryptoCurrency,
      );
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
              currency={currency}
              setCurrency={setCurrency}
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
            saveDisabled={false} // use isValid
            saveText={_(NEXT)}
            onPrev={() => {
              navigate(projectHref);
            }}
          />
        </div>
      </Form>
    </Suspense>
  );
}
