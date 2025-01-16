import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
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

import { warningBannerTextAtom } from 'lib/atoms/banner.atoms';

import {
  paymentOptionAtom,
  spendingCapAtom,
} from 'pages/BuyCredits/BuyCredits.atoms';
import {
  INSUFFICIENT_BALANCE,
  NEXT,
  PAYMENT_OPTIONS,
} from 'pages/BuyCredits/BuyCredits.constants';
import {
  BuyCreditsSchemaTypes,
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';
import {
  getCreditsAvailableBannerText,
  getCryptoCurrencies,
  updateMultiStepCurrencyAndPaymentOption,
} from 'pages/BuyCredits/BuyCredits.utils';
import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from 'pages/Projects/AllProjects/AllProjects.types';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { getCurrencyAmount } from 'components/molecules/CreditsAmount/CreditsAmount.utils';
import {
  AllowedDenoms,
  findDisplayDenom,
} from 'components/molecules/DenomLabel/DenomLabel.utils';
import { OrderSummaryCard } from 'components/molecules/OrderSummaryCard/OrderSummaryCard';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { NOT_ENOUGH_BALANCE } from './ChooseCreditsForm.constants';
import { CryptoOptions } from './ChooseCreditsForm.CryptoOptions';
import { PaymentOptions } from './ChooseCreditsForm.PaymentOptions';
import {
  ChooseCreditsFormSchemaType,
  createChooseCreditsFormSchema,
} from './ChooseCreditsForm.schema';
import { CardSellOrder } from './ChooseCreditsForm.types';
import { getFilteredCryptoSellOrders } from './ChooseCreditsForm.utils';

export type Props = {
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
  card: boolean;
  isUserBalanceLoading: boolean;
  userBalance: number;
};

export const ChooseCreditsForm = React.memo(
  ({
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
    card,
    isUserBalanceLoading,
    userBalance,
  }: Props) => {
    const { _ } = useLingui();
    const setWarningBannerTextAtom = useSetAtom(warningBannerTextAtom);
    const { data, handleSave, activeStep } =
      useMultiStep<BuyCreditsSchemaTypes>();
    const [paymentOption, setPaymentOption] = useAtom(paymentOptionAtom);

    const cryptoCurrencies = useMemo(
      () => getCryptoCurrencies(cryptoSellOrders),
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

    const spendingCap = useAtomValue(spendingCapAtom);
    const [creditsAvailable, setCreditsAvailable] = useState(0);
    const form = useZodForm({
      schema: createChooseCreditsFormSchema({
        creditsAvailable,
        spendingCap,
        userBalance,
        paymentOption,
      }),
      defaultValues: {
        [CURRENCY_AMOUNT]: initialValues?.[CURRENCY_AMOUNT] || 0,
        [CREDITS_AMOUNT]: initialValues?.[CREDITS_AMOUNT] || 0,
        [SELL_ORDERS]: initialValues?.[SELL_ORDERS] || [],
        [CREDIT_VINTAGE_OPTIONS]: initialValues?.[CREDIT_VINTAGE_OPTIONS] || [],
        [CURRENCY]: initialValues?.[CURRENCY]?.askDenom
          ? initialValues?.[CURRENCY]
          : card
          ? cardCurrency
          : defaultCryptoCurrency,
      },
      mode: 'onChange',
    });
    const { errors, isSubmitting } = useFormState({
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

    useEffect(() => {
      if (currency && currency.askDenom !== USD_DENOM) {
        form.trigger(CURRENCY_AMOUNT);
      }
    }, [userBalance, form, currency]);

    const filteredCryptoSellOrders = useMemo(
      () =>
        getFilteredCryptoSellOrders({
          askDenom: currency?.askDenom,
          cryptoSellOrders,
          retiring,
        }),
      [cryptoSellOrders, currency?.askDenom, retiring],
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

    const handleCryptoPurchaseOptions = useCallback(() => {
      setRetiring(prev => !prev);
    }, [setRetiring]);

    const handlePaymentOptions = useCallback(
      (option: string) => {
        startTransition(() => {
          setPaymentOption(option as PaymentOptionsType);
        });
        const currency =
          option === PAYMENT_OPTIONS.CARD
            ? cardCurrency
            : defaultCryptoCurrency;
        form.reset({
          ...form.getValues(),
          [CREDIT_VINTAGE_OPTIONS]: [],
          [CURRENCY]: currency,
        });
        updateMultiStepCurrencyAndPaymentOption(
          handleSave,
          data,
          currency,
          activeStep,
          option,
        );
      },
      [
        form,
        cardCurrency,
        defaultCryptoCurrency,
        handleSave,
        data,
        activeStep,
        setPaymentOption,
      ],
    );

    useEffect(() => {
      // If there are some sell orders available for fiat purchase, default to 'card' option
      if (cardSellOrders.length > 0 && !initialPaymentOption) {
        setPaymentOption(PAYMENT_OPTIONS.CARD);
        form.setValue(CREDIT_VINTAGE_OPTIONS, []);
        form.setValue(CURRENCY, cardCurrency);
        updateMultiStepCurrencyAndPaymentOption(
          handleSave,
          data,
          cardCurrency,
          activeStep,
          PAYMENT_OPTIONS.CARD,
        );
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

    useEffect(() => {
      if (spendingCap && creditsAvailable) {
        form.trigger();
      }
    }, [form, form.trigger, creditsAvailable, spendingCap]);

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
      <Form form={form} onSubmit={onSubmit} data-testid="choose-credits-form">
        <div className="flex gap-10 sm:gap-50 flex-col-reverse lg:flex-row items-center lg:items-start">
          <div>
            <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300 sm:w-[560px]">
              {isUserBalanceLoading ? (
                <Loading />
              ) : (
                <>
                  <PaymentOptions
                    handlePaymentOptions={handlePaymentOptions}
                    cardDisabled={cardDisabled}
                    isConnected={isConnected}
                    setupWalletModal={setupWalletModal}
                  />
                  {currency && (
                    <CreditsAmount
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
                </>
              )}
            </Card>
            <div className="float-right pt-40">
              <PrevNextButtons
                saveDisabled={Object.entries(errors).length > 0 || isSubmitting}
                saveText={
                  errors[CURRENCY_AMOUNT]?.message === _(NOT_ENOUGH_BALANCE)
                    ? _(INSUFFICIENT_BALANCE)
                    : _(NEXT)
                }
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
                pricePerCredit: parseFloat(
                  (currencyAmount / creditsAmount).toFixed(6),
                ),
                credits: creditsAmount,
                currency,
                image: project.imgSrc,
                currencyAmount,
              }}
              cardDetails={cardDetails}
              imageAltText={project.name}
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
              creditsAvailable={creditsAvailable}
              onInvalidCredits={() => {
                const displayDenom = findDisplayDenom({
                  allowedDenoms,
                  bankDenom: currency.askDenom,
                  baseDenom: currency.askBaseDenom,
                });
                setWarningBannerTextAtom(
                  getCreditsAvailableBannerText(creditsAvailable, displayDenom),
                );
              }}
              userBalance={userBalance}
            />
          )}
        </div>
      </Form>
    );
  },
);
