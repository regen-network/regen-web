import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';

import { useWallet } from 'lib/wallet/wallet';

import NotFoundPage from 'pages/NotFound';
import WithLoader from 'components/atoms/WithLoader';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';
import { useNavigateToSlug } from 'components/templates/ProjectDetails/hooks/useNavigateToSlug';

import { cardDetailsMissingAtom, paymentOptionAtom } from './BuyCredits.atoms';
import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { CardDetails, PaymentOptionsType } from './BuyCredits.types';
import { getFormModel } from './BuyCredits.utils';
import { useSummarizePayment } from './hooks/useSummarizePayment';

export const BuyCredits = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    loadingSanityProject,
    projectsWithOrderData,
    isBuyFlowDisabled,
    onChainProjectId,
    offChainProject,
    creditClassOnChain,
    loadingBuySellOrders,
    sellOrders,
    cardSellOrders,
    slug,
    noProjectFound,
  } = useGetProject();

  useNavigateToSlug(slug, '/buy');

  const [paymentOption, setPaymentOption] = useAtom(paymentOptionAtom);
  const cardDetailsMissing = useAtomValue(cardDetailsMissingAtom);
  const [maxAllowedStep, setMaxAllowedStep] = useState(0);
  const { wallet, loaded } = useWallet();

  useEffect(() => {
    if (
      !loadingSanityProject &&
      !loadingBuySellOrders &&
      cardSellOrders.length === 0 &&
      ((loaded && !wallet?.address) || isBuyFlowDisabled)
    )
      // Else if there's no connected wallet address or buy disabled, redirect to project page
      navigate(`/project/${projectId}`, { replace: true });
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

  const [retiring, setRetiring] = useState<boolean>(true);
  const [confirmationTokenId, setConfirmationTokenId] = useState<
    string | undefined
  >();
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>();
  const [cardDetails, setCardDetails] = useState<CardDetails | undefined>();

  const formModel = getFormModel({
    paymentOption,
    retiring,
    projectId: onChainProjectId ?? offChainProject?.id,
  });

  // update payment option from local storage data
  useEffect(() => {
    const localStorageData = localStorage.getItem(formModel.formId);
    if (localStorageData) {
      const jsonData = JSON.parse(localStorageData);
      const paymentOption = jsonData.formValues.paymentOption;
      const maxStep = jsonData.maxAllowedStep;
      if (maxStep !== 0) {
        setMaxAllowedStep(maxStep);
      }
      setPaymentOption(paymentOption as PaymentOptionsType);
    }
  }, [formModel?.formId, setPaymentOption]);

  const summarizePayment = useSummarizePayment(setCardDetails);
  useEffect(() => {
    if (confirmationTokenId) summarizePayment(confirmationTokenId);
  }, [confirmationTokenId, summarizePayment]);

  useEffect(() => {
    if (!retiring && paymentOption === PAYMENT_OPTIONS.CARD) {
      setRetiring(true);
    }
  }, [paymentOption, retiring, setRetiring]);

  if (noProjectFound) return <NotFoundPage />;

  return (
    <WithLoader
      isLoading={loadingBuySellOrders || loadingSanityProject}
      className="flex w-full items-center justify-center h-[500px]"
    >
      <>
        <MultiStepTemplate
          formId={formModel.formId}
          steps={formModel.steps}
          initialValues={{}}
          classes={{ formWrap: 'max-w-[942px]' }}
          forceStep={
            paymentOption === PAYMENT_OPTIONS.CARD &&
            cardDetailsMissing &&
            maxAllowedStep === 2
              ? 1
              : undefined
          }
        >
          <BuyCreditsForm
            retiring={retiring}
            setRetiring={setRetiring}
            cardSellOrders={cardSellOrders}
            cryptoSellOrders={sellOrders}
            creditTypeAbbrev={creditClassOnChain?.class?.creditTypeAbbrev}
            projectHref={`/project/${
              offChainProject?.slug ??
              offChainProject?.onChainId ??
              onChainProjectId
            }`}
            confirmationTokenId={confirmationTokenId}
            setConfirmationTokenId={setConfirmationTokenId}
            paymentMethodId={paymentMethodId}
            setPaymentMethodId={setPaymentMethodId}
            setCardDetails={setCardDetails}
            cardDetails={cardDetails}
            project={projectsWithOrderData[0]}
            projectId={projectId}
            loadingSanityProject={loadingSanityProject}
            isBuyFlowDisabled={isBuyFlowDisabled}
            loadingBuySellOrders={loadingBuySellOrders}
          />
        </MultiStepTemplate>
      </>
    </WithLoader>
  );
};
