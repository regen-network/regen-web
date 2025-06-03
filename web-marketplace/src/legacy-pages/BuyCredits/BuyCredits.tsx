import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import NotFoundPage from 'legacy-pages/NotFound';

import { Loading } from 'web-components/src/components/loading';

import WithLoader from 'components/atoms/WithLoader';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';

import { cardDetailsMissingAtom, paymentOptionAtom } from './BuyCredits.atoms';
import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { CardDetails, PaymentOptionsType } from './BuyCredits.types';
import { getFormModel } from './BuyCredits.utils';
import { useSummarizePayment } from './hooks/useSummarizePayment';
import { useNavigateToSlug } from './hooks/useNavigateToSlug';

export const BuyCredits = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const accountCanBuy = useLoaderData();

  useEffect(() => {
    if (!accountCanBuy) {
      navigate(`/project/${projectId}`, { replace: true });
    }
  }, [navigate, projectId, accountCanBuy]);

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
  } = useGetProject({ projectId });

  useNavigateToSlug(slug, '/buy');

  const [paymentOption, setPaymentOption] = useAtom(paymentOptionAtom);
  const cardDetailsMissing = useAtomValue(cardDetailsMissingAtom);
  const [maxAllowedStep, setMaxAllowedStep] = useState(0);
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

  // On form load, update `paymentOption` and `maxAllowedStep` from localStorage to prevent a visual
  // jump between step 1 (Payment info) and step 2  (Retirement) when resuming the form left at step 2.
  // These values are needed to calculate the `forceStep` prop in `MultiStepTemplate`, which redirects,
  // if necessary, the user to step 1 to re-enter payment details.
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

  if (!accountCanBuy) return <Loading />;

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
          classes={{ formWrap: 'max-w-[942px]', root: 'pb-0 sm:pb-[200px]' }}
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
