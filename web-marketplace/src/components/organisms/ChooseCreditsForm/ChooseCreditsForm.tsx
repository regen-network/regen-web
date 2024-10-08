import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';
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
import {
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';
import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from 'pages/Projects/AllProjects/AllProjects.types';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { getCurrencyAmount } from 'components/molecules/CreditsAmount/CreditsAmount.utils';
import { AllowedDenoms } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { OrderSummaryCard } from 'components/molecules/OrderSummaryCard/OrderSummaryCard';

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
  isConnected: boolean;
  setupWalletModal: () => void;
  paymentOptionCryptoClicked: boolean;
  setPaymentOptionCryptoClicked: UseStateSetter<boolean>;
  initialPaymentOption?: PaymentOptionsType;
  project?: ProjectWithOrderData;
  cardDetails?: CardDetails;
  goToPaymentInfo: () => void;
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
  isConnected,
  setupWalletModal,
  paymentOptionCryptoClicked,
  setPaymentOptionCryptoClicked,
  initialPaymentOption,
  project,
  cardDetails,
  goToPaymentInfo,
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
      askDenom: USD_DENOM,
      askBaseDenom: USD_DENOM,
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
  const creditsAmount = useWatch({
    control: form.control,
    name: CREDITS_AMOUNT,
  });
  const currencyAmount = useWatch({
    control: form.control,
    name: CURRENCY_AMOUNT,
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
  }, [setRetiring]);

  const handlePaymentOptions = useCallback(
    (option: string) => {
      setPaymentOption(option as PaymentOptionsType);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      form.setValue(
        CURRENCY,
        option === PAYMENT_OPTIONS.CARD ? cardCurrency : defaultCryptoCurrency,
      );
    },
    [setPaymentOption, form, cardCurrency, defaultCryptoCurrency],
  );

  useEffect(() => {
    // If there are some sell orders available for fiat purchase, default to 'card' option
    if (cardSellOrders.length > 0 && !initialPaymentOption) {
      setPaymentOption(PAYMENT_OPTIONS.CARD);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      form.setValue(CURRENCY, cardCurrency);
    }
  }, [cardSellOrders.length, initialPaymentOption]); // just run this once

  useEffect(() => {
    if (paymentOptionCryptoClicked && isConnected) {
      handlePaymentOptions(PAYMENT_OPTIONS.CRYPTO);
      setPaymentOptionCryptoClicked(false);
    }
  }, [
    setPaymentOptionCryptoClicked,
    isConnected,
    paymentOptionCryptoClicked,
    handlePaymentOptions,
  ]);

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

  return (
    <Suspense fallback={<Loading />}>
      <Form form={form} onSubmit={onSubmit} data-testid="choose-credits-form">
        <div className="flex gap-10 sm:gap-50 flex-col-reverse lg:flex-row items-center lg:items-start">
          <div>
            <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300 sm:w-[560px]">
              <PaymentOptions
                paymentOption={paymentOption}
                setPaymentOption={handlePaymentOptions}
                cardDisabled={cardDisabled}
                isConnected={isConnected}
                setupWalletModal={setupWalletModal}
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
                  cryptoCurrencies={cryptoCurrencies}
                  allowedDenoms={allowedDenoms}
                  creditTypePrecision={creditTypePrecision}
                  currency={currency}
                  card={card}
                  orderedSellOrders={orderedSellOrders}
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
          </div>
          {project && allowedDenoms && (
            // We need to put this inside the form itself
            // so we can display amounts updates in real time
            <OrderSummaryCard
              order={{
                projectName: project.name,
                prefinanceProject: false, // TODO APP-367
                pricePerCredit: currencyAmount / creditsAmount,
                credits: creditsAmount,
                currency,
                image: project.imgSrc,
                currencyAmount,
              }}
              cardDetails={cardDetails}
              imageAltText={project.name}
              paymentOption={paymentOption}
              allowedDenoms={allowedDenoms}
              onClickEditCard={goToPaymentInfo}
              setCreditsAmount={(value: number) => {
                form.setValue(CREDITS_AMOUNT, value);
                const { currencyAmount, sellOrders } = getCurrencyAmount({
                  currentCreditsAmount: value,
                  card,
                  orderedSellOrders,
                  creditTypePrecision,
                });
                form.setValue(CURRENCY_AMOUNT, currencyAmount, {
                  shouldValidate: true,
                });
                form.setValue(SELL_ORDERS, sellOrders);
              }}
            />
          )}
        </div>
      </Form>
    </Suspense>
  );
}
