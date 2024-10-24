import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { useAtom, useSetAtom } from 'jotai';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { useWallet } from 'lib/wallet/wallet';

import {
  ProjectWithOrderData,
  UISellOrderInfo,
} from 'pages/Projects/AllProjects/AllProjects.types';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY,
  CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'components/molecules/CreditsAmount/CreditsAmount.constants';
import {
  getCreditsAvailablePerCurrency,
  getCurrencyAmount,
} from 'components/molecules/CreditsAmount/CreditsAmount.utils';
import { OrderSummaryCard } from 'components/molecules/OrderSummaryCard/OrderSummaryCard';
import { AgreePurchaseForm } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm';
import { AgreePurchaseFormSchemaType } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm.schema';
import { AgreePurchaseFormFiat } from 'components/organisms/AgreePurchaseForm/AgreePurchaseFormFiat';
import { MemoizedChooseCreditsForm as ChooseCreditsForm } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { getFilteredCryptoSellOrders } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.utils';
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { LoginFlow } from 'components/organisms/LoginFlow/LoginFlow';
import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { defaultStripeOptions } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.constants';
import { PaymentInfoFormSchemaType } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.schema';
import { PaymentInfoFormFiat } from 'components/organisms/PaymentInfoForm/PaymentInfoFormFiat';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { paymentOptionCryptoClickedAtom } from './BuyCredits.atoms';
import { PAYMENT_OPTIONS, stripeKey } from './BuyCredits.constants';
import {
  BuyCreditsSchemaTypes,
  CardDetails,
  PaymentOptionsType,
} from './BuyCredits.types';
import { getCreditsAvailableBannerText } from './BuyCredits.utils';
import { usePurchase } from './hooks/usePurchase';

type Props = {
  paymentOption: PaymentOptionsType;
  setPaymentOption: UseStateSetter<PaymentOptionsType>;
  retiring: boolean;
  setRetiring: UseStateSetter<boolean>;
  confirmationTokenId?: string;
  setConfirmationTokenId: UseStateSetter<string | undefined>;
  paymentMethodId?: string;
  setPaymentMethodId: UseStateSetter<string | undefined>;
  setCardDetails: UseStateSetter<CardDetails | undefined>;
  cardSellOrders: Array<CardSellOrder>;
  cryptoSellOrders: Array<UISellOrderInfo>;
  creditTypeAbbrev?: string;
  projectHref: string;
  cardDetails?: CardDetails;
  project?: ProjectWithOrderData;
};

const stripe = loadStripe(stripeKey);

export const BuyCreditsForm = ({
  paymentOption,
  setPaymentOption,
  retiring,
  setRetiring,
  confirmationTokenId,
  setConfirmationTokenId,
  paymentMethodId,
  setPaymentMethodId,
  setCardDetails,
  cardSellOrders,
  cryptoSellOrders,
  creditTypeAbbrev,
  projectHref,
  cardDetails,
  project,
}: Props) => {
  const { data, activeStep, handleSaveNext, handleSave, handleActiveStep } =
    useMultiStep<BuyCreditsSchemaTypes>();
  const { wallet, isConnected, activeWalletAddr } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({});
  const navigate = useNavigate();

  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const [paymentOptionCryptoClicked, setPaymentOptionCryptoClicked] = useAtom(
    paymentOptionCryptoClickedAtom,
  );

  const cardDisabled = cardSellOrders.length === 0;

  const { marketplaceClient, ecocreditClient } = useLedger();

  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: marketplaceClient,
      enabled: !!marketplaceClient,
    }),
  );

  const { data: creditTypeData } = useQuery(
    getCreditTypeQuery({
      client: ecocreditClient,
      request: {
        abbreviation: creditTypeAbbrev,
      },
      enabled: !!ecocreditClient && !!creditTypeAbbrev,
    }),
  );

  const { data: paymentMethodData } = useQuery(
    getPaymentMethodsQuery({
      enabled: !!activeAccount,
    }),
  );

  const stripeOptions = useMemo(
    () => ({
      amount: parseFloat(((data?.[CURRENCY_AMOUNT] || 0) * 100).toFixed(2)), // stripe amounts should be in the smallest currency unit (e.g., 100 cents to charge $1.00),
      currency: USD_DENOM,
      ...defaultStripeOptions,
    }),
    [data],
  );

  useEffect(() => {
    setRetiring(prev =>
      typeof data?.retiring === 'undefined' ? prev : data?.retiring,
    );
    setPaymentOption(prev => data?.paymentOption || prev);
  }, [data, setPaymentOption, setRetiring]);

  const paymentInfoFormSubmit = useCallback(
    async (values: PaymentInfoFormSchemaType) => {
      const { paymentMethodId, ...others } = values;
      // we don't store paymentMethodId in local storage for security reasons,
      // only in current state
      handleSaveNext({ ...data, ...others });
      setPaymentMethodId(paymentMethodId);
    },
    [data, handleSaveNext, setPaymentMethodId],
  );

  const purchase = usePurchase({ paymentOption, retiring });
  const agreePurchaseFormSubmit = useCallback(
    async (
      values: AgreePurchaseFormSchemaType,
      stripe?: Stripe | null,
      elements?: StripeElements | null,
    ) => {
      const { retirementReason, country, stateProvince, postalCode } = values;
      const {
        sellOrders: selectedSellOrders,
        email,
        name,
        savePaymentMethod,
        createAccount: createActiveAccount,
        creditsAmount,
        // subscribeNewsletter, TODO
        // followProject,
      } = data;

      if (selectedSellOrders && creditsAmount)
        purchase({
          paymentOption,
          selectedSellOrders,
          retiring,
          retirementReason,
          country,
          stateProvince,
          postalCode,
          email,
          name,
          savePaymentMethod,
          createActiveAccount,
          paymentMethodId,
          stripe,
          elements,
          confirmationTokenId,
          creditsAmount,
        });
    },
    [
      confirmationTokenId,
      data,
      paymentMethodId,
      paymentOption,
      purchase,
      retiring,
    ],
  );

  const goToPaymentInfo = useCallback(
    () => handleActiveStep(1),
    [handleActiveStep],
  );

  const allowedDenoms = useMemo(
    () => allowedDenomsData?.allowedDenoms,
    [allowedDenomsData?.allowedDenoms],
  );

  const currency = data?.[CURRENCY];
  const creditsAmount = data?.[CREDITS_AMOUNT];
  const currencyAmount = data?.[CURRENCY_AMOUNT];
  const creditTypePrecision = creditTypeData?.creditType?.precision;

  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
  );
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

  const creditsAvailable = useMemo(
    () =>
      getCreditsAvailablePerCurrency(
        paymentOption,
        filteredCryptoSellOrders,
        cardSellOrders,
        creditTypePrecision,
      ),
    [
      cardSellOrders,
      creditTypePrecision,
      filteredCryptoSellOrders,
      paymentOption,
    ],
  );

  return (
    <div
      className={
        activeStep !== 0
          ? 'flex mt-20 sm:mt-40 gap-10 sm:gap-50 flex-col-reverse lg:flex-row items-center lg:items-start'
          : 'mt-20 sm:mt-40'
      }
    >
      <div>
        {activeStep === 0 && (
          <ChooseCreditsForm
            setPaymentOption={setPaymentOption}
            paymentOption={paymentOption}
            retiring={retiring}
            setRetiring={setRetiring}
            cardDisabled={cardDisabled}
            cardSellOrders={cardSellOrders}
            cryptoSellOrders={cryptoSellOrders}
            onSubmit={async (values: ChooseCreditsFormSchemaType) => {
              handleSaveNext({
                ...data,
                ...values,
                retiring,
                paymentOption,
              });
            }}
            allowedDenoms={allowedDenoms}
            creditTypePrecision={creditTypePrecision}
            onPrev={() => navigate(projectHref)}
            initialValues={{
              [CURRENCY_AMOUNT]: data?.[CURRENCY_AMOUNT],
              [CREDITS_AMOUNT]: data?.[CREDITS_AMOUNT],
              [SELL_ORDERS]: data?.[SELL_ORDERS],
              [CREDIT_VINTAGE_OPTIONS]: data?.[CREDIT_VINTAGE_OPTIONS],
              [CURRENCY]: data?.[CURRENCY],
            }}
            isConnected={isConnected}
            setupWalletModal={() => {
              setPaymentOptionCryptoClicked(true);
              if (!activeWalletAddr) {
                // no connected wallet address
                setConnectWalletModal(atom => void (atom.open = true));
              } else if (!isConnected) {
                // user logged in with web2 but not connected to the wallet address associated to his/er account
                setSwitchWalletModalAtom(atom => void (atom.open = true));
              }
            }}
            paymentOptionCryptoClicked={paymentOptionCryptoClicked}
            setPaymentOptionCryptoClicked={setPaymentOptionCryptoClicked}
            initialPaymentOption={data?.paymentOption}
            project={project}
            cardDetails={cardDetails}
            goToPaymentInfo={goToPaymentInfo}
            card={card}
          />
        )}

        {paymentOption === PAYMENT_OPTIONS.CARD &&
        (activeStep === 1 || activeStep === 2) ? (
          <Elements options={stripeOptions} stripe={stripe}>
            {activeStep === 1 && (
              <PaymentInfoFormFiat
                paymentOption={paymentOption}
                onSubmit={paymentInfoFormSubmit}
                login={onButtonClick}
                retiring={retiring}
                wallet={wallet}
                accountEmail={privActiveAccount?.email}
                accountName={activeAccount?.name}
                accountId={activeAccount?.id}
                paymentMethods={paymentMethodData?.paymentMethods}
                setError={setErrorBannerTextAtom}
                setConfirmationTokenId={setConfirmationTokenId}
                initialValues={{
                  email: data?.email,
                  name: data?.name,
                  createAccount: data?.createAccount,
                  savePaymentMethod: data?.savePaymentMethod,
                }}
                setCardDetails={setCardDetails}
              />
            )}
            {activeStep === 2 && (
              <AgreePurchaseFormFiat
                retiring={retiring}
                onSubmit={agreePurchaseFormSubmit}
                goToChooseCredits={() => handleActiveStep(0)}
                imgSrc="/svg/info-with-hand.svg"
                country={cardDetails?.country || 'US'}
              />
            )}
          </Elements>
        ) : (
          <>
            {activeStep === 1 && (
              <PaymentInfoForm
                paymentOption={paymentOption}
                onSubmit={paymentInfoFormSubmit}
                login={onButtonClick}
                retiring={retiring}
                wallet={wallet}
                accountEmail={privActiveAccount?.email}
                accountName={activeAccount?.name}
                accountId={activeAccount?.id}
                paymentMethods={paymentMethodData?.paymentMethods}
                setError={setErrorBannerTextAtom}
                setConfirmationTokenId={setConfirmationTokenId}
                initialValues={{
                  email: data?.email,
                  name: data?.name,
                  createAccount: data?.createAccount,
                  savePaymentMethod: data?.savePaymentMethod,
                }}
                setCardDetails={setCardDetails}
              />
            )}
            {activeStep === 2 && (
              <AgreePurchaseForm
                retiring={retiring}
                onSubmit={agreePurchaseFormSubmit}
                goToChooseCredits={() => handleActiveStep(0)}
                imgSrc="/svg/info-with-hand.svg"
                country={cardDetails?.country || 'US'}
              />
            )}
          </>
        )}
      </div>
      {project &&
        allowedDenoms &&
        activeStep !== 0 &&
        currency &&
        creditsAmount &&
        currencyAmount && (
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
            paymentOption={paymentOption}
            allowedDenoms={allowedDenoms}
            onClickEditCard={goToPaymentInfo}
            setCreditsAmount={(creditsAmount: number) => {
              const { currencyAmount, sellOrders } = getCurrencyAmount({
                currentCreditsAmount: creditsAmount,
                card,
                orderedSellOrders,
                creditTypePrecision,
              });
              handleSave(
                {
                  ...data,
                  currencyAmount,
                  sellOrders,
                  creditsAmount,
                },
                activeStep,
              );
            }}
            creditsAvailable={creditsAvailable}
            onInvalidCredits={() =>
              setErrorBannerTextAtom(
                getCreditsAvailableBannerText(creditsAvailable),
              )
            }
          />
        )}
      <LoginFlow
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        wallets={walletsUiConfig}
        modalState={modalState}
        redirectRoute={`${projectHref.replace(/^\//, '')}/buy`}
      />
    </div>
  );
};
