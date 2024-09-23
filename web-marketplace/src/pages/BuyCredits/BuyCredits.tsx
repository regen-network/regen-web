import { useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';

import WithLoader from 'components/atoms/WithLoader';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { PaymentOptionsType } from './BuyCredits.types';
import { getCardSellOrders, getFormModel } from './BuyCredits.utils';

export const BuyCredits = () => {
  const { _ } = useLingui();
  const {
    sanityProject,
    projectBySlug,
    loadingProjectBySlug,
    projectByOnChainId,
    loadingProjectByOnChainId,
    offchainProjectByIdData,
    loadingOffchainProjectById,
    isBuyFlowDisabled,
    projectsWithOrderData,
    onChainProjectId,
    offChainProject,
    creditClassOnChain,
    loadingBuySellOrders,
  } = useGetProject();

  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    sanityProject?.fiatSellOrders && sanityProject?.fiatSellOrders.length > 0
      ? PAYMENT_OPTIONS.CARD
      : PAYMENT_OPTIONS.CRYPTO,
  );
  const [retiring, setRetiring] = useState<boolean>(true);
  const [confirmationTokenId, setConfirmationTokenId] = useState<
    string | undefined
  >();
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>();

  const formModel = getFormModel({ _, paymentOption, retiring });
  const sellOrders = useMemo(
    () => projectsWithOrderData?.[0]?.sellOrders || [],
    [projectsWithOrderData],
  );

  const cardSellOrders = useMemo(
    () => getCardSellOrders(sanityProject?.fiatSellOrders, sellOrders),
    [sanityProject?.fiatSellOrders, sellOrders],
  );

  return (
    <WithLoader
      isLoading={loadingBuySellOrders}
      className="flex w-full items-center justify-center h-[500px]"
    >
      <>
        {!isBuyFlowDisabled && (
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
              setConfirmationTokenId={setConfirmationTokenId}
              setPaymentMethodId={setPaymentMethodId}
            />
          </MultiStepTemplate>
        )}
      </>
    </WithLoader>
  );
};
