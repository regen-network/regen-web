import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { useWallet } from 'lib/wallet/wallet';

import WithLoader from 'components/atoms/WithLoader';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';
import { useNavigateToSlug } from 'components/templates/ProjectDetails/hooks/useNavigateToSlug';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { CardDetails, PaymentOptionsType } from './BuyCredits.types';
import { getFormModel } from './BuyCredits.utils';
import { useSummarizePayment } from './hooks/useSummarizePayment';

export const BuyCredits = () => {
  const { _ } = useLingui();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const {
    loadingSanityProject,
    // The following var might be used on the OrderSummarCard
    // projectBySlug,
    // loadingProjectBySlug,
    // projectByOnChainId,
    // loadingProjectByOnChainId,
    // offchainProjectByIdData,
    // loadingOffchainProjectById,
    isBuyFlowDisabled,
    onChainProjectId,
    offChainProject,
    creditClassOnChain,
    loadingBuySellOrders,
    sellOrders,
    cardSellOrders,
    slug,
  } = useGetProject();

  useNavigateToSlug(slug);

  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CRYPTO,
  );
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
    _,
    paymentOption,
    retiring,
    projectId: onChainProjectId ?? offChainProject?.id,
  });

  const summarizePayment = useSummarizePayment(setCardDetails);
  useEffect(() => {
    if (confirmationTokenId) summarizePayment(confirmationTokenId);
  }, [confirmationTokenId, summarizePayment]);

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
        >
          <BuyCreditsForm
            setPaymentOption={setPaymentOption}
            paymentOption={paymentOption}
            retiring={retiring}
            setRetiring={setRetiring}
            cardSellOrders={cardSellOrders as CardSellOrder[]}
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
          />
        </MultiStepTemplate>
      </>
    </WithLoader>
  );
};
