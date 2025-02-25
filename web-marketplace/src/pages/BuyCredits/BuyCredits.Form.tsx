import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useUpdateAccountByIdMutation } from 'generated/graphql';
import { useLedger } from 'ledger';
import { warningBannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { apiServerUrl } from 'lib/env';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { getSubscribersStatusQuery } from 'lib/queries/react-query/registry-server/getSubscribersStatusQuery/getSubscribersStatusQuery';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { useFetchUserBalance } from 'pages/BuyCredits/hooks/useFetchUserBalance';
import { useFetchSellOrders } from 'pages/Marketplace/Storefront/hooks/useFetchSellOrders';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
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
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { OrderSummaryCard } from 'components/molecules/OrderSummaryCard/OrderSummaryCard';
import { AgreePurchaseForm } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm';
import { AgreePurchaseFormSchemaType } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm.schema';
import { AgreePurchaseFormFiat } from 'components/organisms/AgreePurchaseForm/AgreePurchaseFormFiat';
import { BuyWarningModal } from 'components/organisms/BuyWarningModal/BuyWarningModal';
import { KEPLR_LOGIN_REQUIRED } from 'components/organisms/BuyWarningModal/BuyWarningModal.constants';
import { BuyWarningModalContent } from 'components/organisms/BuyWarningModal/BuyWarningModal.types';
import { ChooseCreditsForm } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm';
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

import {
  cardDetailsMissingAtom,
  paymentOptionAtom,
  paymentOptionCryptoClickedAtom,
} from './BuyCredits.atoms';
import { PAYMENT_OPTIONS, stripeKey } from './BuyCredits.constants';
import { BuyCreditsSchemaTypes, CardDetails } from './BuyCredits.types';
import {
  findMatchingSellOrders,
  getCreditsAvailableBannerText,
  getCryptoCurrencies,
  getOrderedSellOrders,
  getSellOrdersCredits,
  getWarningModalContent,
} from './BuyCredits.utils';
import { usePurchase } from './hooks/usePurchase';

type Props = {
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
  project?: NormalizeProject;
  projectId: string | undefined;
  loadingSanityProject: boolean;
  isBuyFlowDisabled: boolean;
  loadingBuySellOrders: boolean;
};

const stripe = loadStripe(stripeKey);

export const BuyCreditsForm = ({
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
  projectId,
  loadingSanityProject,
  isBuyFlowDisabled,
  loadingBuySellOrders,
}: Props) => {
  const { data, activeStep, handleSaveNext, handleSave, handleActiveStep } =
    useMultiStep<BuyCreditsSchemaTypes>();
  const { wallet, isConnected, activeWalletAddr, loaded } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
  const [updateAccountById] = useUpdateAccountByIdMutation();
  const [paymentOption, setPaymentOption] = useAtom(paymentOptionAtom);
  const cardDetailsMissing = useAtomValue(cardDetailsMissingAtom);
  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({});
  const navigate = useNavigate();
  const { _ } = useLingui();
  const warningModalContent = useRef<BuyWarningModalContent | undefined>();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

  const setWarningBannerTextAtom = useSetAtom(warningBannerTextAtom);
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const [paymentOptionCryptoClicked, setPaymentOptionCryptoClicked] = useAtom(
    paymentOptionCryptoClickedAtom,
  );
  const [warningModalState, setWarningModalState] = useState({
    openModal: false,
    creditsAvailable: 0,
  });

  const { refetchSellOrders } = useFetchSellOrders();

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

  const { data: subscribersStatusData } = useQuery(
    getSubscribersStatusQuery({
      enabled: !!activeAccount,
    }),
  );

  useEffect(() => {
    setRetiring(prev =>
      typeof data?.retiring === 'undefined' ? prev : data?.retiring,
    );
    setPaymentOption(prev => data?.paymentOption || prev);
  }, [data.retiring, data?.paymentOption, setPaymentOption, setRetiring]);

  useEffect(() => {
    if (
      !loadingSanityProject &&
      !loadingBuySellOrders &&
      cardSellOrders.length === 0 &&
      ((loaded && !wallet?.address) || isBuyFlowDisabled) &&
      !warningModalContent.current
    ) {
      // Else if there's no connected wallet address or buy disabled, redirect to project page
      navigate(`/project/${projectId}`, { replace: true });
    }
  }, [
    loadingSanityProject,
    loadingBuySellOrders,
    loaded,
    wallet?.address,
    navigate,
    projectId,
    cardSellOrders.length,
    isBuyFlowDisabled,
  ]);

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

  const shouldRefreshProfileData =
    data.name && activeAccount?.id && !activeAccount?.name;

  const allowedDenoms = useMemo(
    () => allowedDenomsData?.allowedDenoms,
    [allowedDenomsData?.allowedDenoms],
  );

  const defaultCryptoCurrency = getCryptoCurrencies(cryptoSellOrders)[0];
  const currency =
    cardDisabled && !data?.[CURRENCY]
      ? defaultCryptoCurrency
      : data?.[CURRENCY];
  const creditsAmount = data?.[CREDITS_AMOUNT];
  const currencyAmount = data?.[CURRENCY_AMOUNT];
  const creditTypePrecision = creditTypeData?.creditType?.precision;

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
      getOrderedSellOrders(
        paymentOption === PAYMENT_OPTIONS.CARD,
        cardSellOrders,
        filteredCryptoSellOrders,
      ),
    [cardSellOrders, filteredCryptoSellOrders, paymentOption],
  );

  const purchase = usePurchase({
    paymentOption,
    retiring,
    project,
    currency,
    creditsAmount,
    currencyAmount,
    allowedDenoms,
    shouldRefreshProfileData,
  });
  const agreePurchaseFormSubmit = useCallback(
    async (
      values: AgreePurchaseFormSchemaType,
      stripe?: Stripe | null,
      elements?: StripeElements | null,
    ) => {
      if (project) {
        const sellOrders = await refetchSellOrders();
        const creditsInAllSellOrders = getSellOrdersCredits(sellOrders);
        const creditsToBuy = data?.creditsAmount;
        const requestedSellOrders = findMatchingSellOrders(
          data,
          sellOrders?.map(normalizeToUISellOrderInfo),
        );
        const creditsInRequestedSellOrders =
          getSellOrdersCredits(requestedSellOrders);

        const sellCanProceed =
          creditsToBuy && creditsToBuy <= creditsInRequestedSellOrders;
        if (sellCanProceed) {
          const {
            retirementReason,
            country,
            stateProvince,
            postalCode,
            subscribeNewsletter,
            // followProject,
          } = values;
          const {
            sellOrders: selectedSellOrders,
            savePaymentMethod,
            createAccount: createActiveAccount,
            email,
            name,
          } = data;

          if (email && subscribeNewsletter) {
            await fetch(`${apiServerUrl}/subscribers/v1/add`, {
              method: 'POST',
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify({ email }),
            });
          }

          const shouldRefreshProfileData =
            name && activeAccount?.id && !activeAccount?.name;
          if (shouldRefreshProfileData) {
            await updateAccountById({
              variables: {
                input: {
                  id: activeAccount?.id,
                  accountPatch: {
                    name,
                  },
                },
              },
            });
          }

          if (selectedSellOrders && creditsAmount)
            purchase({
              selectedSellOrders,
              retiring,
              retirementReason,
              country,
              stateProvince,
              postalCode,
              savePaymentMethod,
              createActiveAccount,
              paymentMethodId,
              stripe,
              elements,
              confirmationTokenId,
            });
        } else {
          setWarningModalState({
            openModal: true,
            creditsAvailable: creditsInRequestedSellOrders,
          });
          warningModalContent.current = getWarningModalContent(
            currency,
            creditsInRequestedSellOrders,
            _,
            allowedDenomsData,
            data,
            creditsInAllSellOrders,
          );
        }
      }
    },
    [
      project,
      refetchSellOrders,
      data,
      activeAccount?.id,
      activeAccount?.name,
      creditsAmount,
      purchase,
      retiring,
      paymentMethodId,
      confirmationTokenId,
      updateAccountById,
      currency,
      _,
      allowedDenomsData,
    ],
  );

  const goToPaymentInfo = useCallback(
    () => handleActiveStep(1),
    [handleActiveStep],
  );

  const card = useMemo(
    () => paymentOption === PAYMENT_OPTIONS.CARD,
    [paymentOption],
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

  const stripeAmount = useMemo(() => {
    return (
      data?.[CURRENCY_AMOUNT] ||
      getCurrencyAmount({
        currentCreditsAmount: 1,
        card: paymentOption === PAYMENT_OPTIONS.CARD,
        orderedSellOrders: cardSellOrders,
        creditTypePrecision: creditTypeData?.creditType?.precision,
      }).currencyAmount
    );
  }, [
    data,
    paymentOption,
    cardSellOrders,
    creditTypeData?.creditType?.precision,
  ]);

  const stripeOptions = useMemo(
    () => ({
      amount: parseFloat((stripeAmount * 100).toFixed(2)), // stripe amounts should be in the smallest currency unit (e.g., 100 cents to charge $1.00),
      currency: USD_DENOM,
      ...defaultStripeOptions,
    }),
    [stripeAmount],
  );

  const { isLoading, userBalance } = useFetchUserBalance(currency?.askDenom);

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
            onPrev={
              window.history.state && window.history.state.idx > 0
                ? () => navigate(-1)
                : undefined
            }
            initialValues={{
              [CURRENCY_AMOUNT]: data?.[CURRENCY_AMOUNT],
              [CREDITS_AMOUNT]: data?.[CREDITS_AMOUNT] || 1,
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
            isUserBalanceLoading={isLoading}
            userBalance={userBalance}
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
            {activeStep === 2 && !cardDetailsMissing && (
              <AgreePurchaseFormFiat
                email={data?.email}
                retiring={retiring}
                onSubmit={agreePurchaseFormSubmit}
                goToChooseCredits={() => handleActiveStep(0)}
                imgSrc="/svg/info-with-hand.svg"
                country={cardDetails?.country || 'US'}
                initialValues={{
                  country: data?.country || cardDetails?.country || 'US',
                  stateProvince: data?.stateProvince || '',
                  postalCode: data?.postalCode || '',
                  retirementReason: data?.retirementReason || '',
                  anonymousPurchase: data?.anonymousPurchase || false,
                  followProject: data?.followProject || false,
                  subscribeNewsletter: data?.subscribeNewsletter || false,
                  agreeErpa: data?.agreeErpa || false,
                }}
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
                email={data?.email}
                retiring={retiring}
                onSubmit={agreePurchaseFormSubmit}
                goToChooseCredits={() => handleActiveStep(0)}
                imgSrc="/svg/info-with-hand.svg"
                country={cardDetails?.country || 'US'}
                initialValues={{
                  country: data?.country || 'US',
                  stateProvince: data?.stateProvince || '',
                  postalCode: data?.postalCode || '',
                  retirementReason: data?.retirementReason || '',
                  anonymousPurchase: data?.anonymousPurchase || false,
                  followProject: data?.followProject || false,
                  subscribeNewsletter: data?.subscribeNewsletter || false,
                  agreeErpa: data?.agreeErpa || false,
                }}
                isNewsletterSubscribed={subscribersStatusData?.subscribed}
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
      <LoginFlow
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        wallets={walletsUiConfig}
        modalState={modalState}
        redirectRoute={`${projectHref.replace(/^\//, '')}/buy`}
      />
      {warningModalContent.current && (
        <BuyWarningModal
          modalContent={warningModalContent.current.modalContent}
          warningModalState={warningModalState}
          onClose={setWarningModalState}
          handleClick={action => {
            if (action === KEPLR_LOGIN_REQUIRED) {
              if (!activeWalletAddr) {
                // no connected wallet address
                setConnectWalletModal(atom => void (atom.open = true));
              } else if (!isConnected) {
                // user logged in with web2 but not connected to the wallet address associated to his/er account
                setSwitchWalletModalAtom(atom => void (atom.open = true));
              } else {
                // web3 account connected
                handleSave(
                  { ...data, paymentOption: PAYMENT_OPTIONS.CRYPTO },
                  0,
                );
                setWarningModalState({
                  ...warningModalState,
                  openModal: false,
                });
                window.scrollTo(0, 0);
                handleActiveStep(0);
              }
            } else if (action) {
              navigate(action);
            } else {
              setWarningModalState({
                ...warningModalState,
                openModal: false,
              });
              const amounts = getCurrencyAmount({
                currentCreditsAmount: warningModalState.creditsAvailable,
                card: paymentOption === PAYMENT_OPTIONS.CARD,
                orderedSellOrders,
                creditTypePrecision: creditTypeData?.creditType?.precision,
              });
              // After a purchase attempt where there's partial credits availability,
              // we need to update the form with the new credits, currency amount and sell orders.
              handleSave(
                {
                  ...data,
                  [CREDITS_AMOUNT]: warningModalState.creditsAvailable,
                  [CURRENCY_AMOUNT]: amounts.currencyAmount,
                  [SELL_ORDERS]: amounts.sellOrders,
                },
                0,
              );
              window.scrollTo(0, 0);
              handleActiveStep(0);
            }
          }}
        />
      )}
    </div>
  );
};
