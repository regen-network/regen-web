import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLingui } from '@lingui/react';

import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { useGetProject } from 'components/templates/ProjectDetails/hooks/useGetProject';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsForm } from './BuyCredits.Form';
import { PaymentOptionsType } from './BuyCredits.types';
import { getFormModel } from './BuyCredits.utils';

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
  } = useGetProject();

  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CARD, // TODO or set to crypto if not credits with fiat purchase
  );
  const [retiring, setRetiring] = useState<boolean>(true);

  const formModel = getFormModel({ _, paymentOption, retiring });

  return (
    <MultiStepTemplate
      formId={formModel.formId}
      steps={formModel.steps}
      initialValues={formModel.initialValues}
    >
      <BuyCreditsForm
        setPaymentOption={setPaymentOption}
        paymentOption={paymentOption}
        retiring={retiring}
        setRetiring={setRetiring}
        cardSellOrders={[]}
        cryptoSellOrders={[]}
      />
    </MultiStepTemplate>
  );
};
