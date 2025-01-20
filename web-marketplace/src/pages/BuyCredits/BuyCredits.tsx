import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';

import NotFoundPage from 'pages/NotFound';
import WithLoader from 'components/atoms/WithLoader';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';
import { useNavigateToSlug } from 'components/templates/ProjectDetails/hooks/useNavigateToSlug';

import { paymentOptionAtom } from './BuyCredits.atoms';
import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { CardDetails } from './BuyCredits.types';
import { getFormModel } from './BuyCredits.utils';
import { useSummarizePayment } from './hooks/useSummarizePayment';

export const BuyCredits = () => {
  const { projectId } = useParams();

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

  const paymentOption = useAtomValue(paymentOptionAtom);

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
