import { useNavigate } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { useQuery } from '@tanstack/react-query';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useLedger } from 'ledger';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { AgreePurchaseForm } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm';
import { ChooseCreditsForm } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { PaymentOptionsType } from './BuyCredits.types';

type Props = {
  paymentOption: PaymentOptionsType;
  setPaymentOption: UseStateSetter<PaymentOptionsType>;
  retiring: boolean;
  setRetiring: UseStateSetter<boolean>;
  cardSellOrders: Array<CardSellOrder>;
  cryptoSellOrders: Array<UISellOrderInfo>;
  creditTypeAbbrev?: string;
  projectHref: string;
};
export const BuyCreditsForm = ({
  paymentOption,
  setPaymentOption,
  retiring,
  setRetiring,
  cardSellOrders,
  cryptoSellOrders,
  creditTypeAbbrev,
  projectHref,
}: Props) => {
  const { data, activeStep, handleSaveNext } = useMultiStep();
  console.log('data', data);
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

  return (
    <div className="flex">
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
              handleSaveNext(values);
            }}
            allowedDenoms={allowedDenomsData?.allowedDenoms}
            creditTypePrecision={creditTypeData?.creditType?.precision}
            projectHref={projectHref}
          />
        )}
        {activeStep === 1 && (
          <PaymentInfoForm
            paymentOption={paymentOption}
            onSubmit={function (values: {
              name: string;
              email: string;
              createAccount: boolean;
              savePaymentMethod: boolean;
              paymentMethodId?: string | undefined;
            }): Promise<void> {
              throw new Error('Function not implemented.');
            }}
            amount={0}
            currency={''}
            login={function (): void {
              throw new Error('Function not implemented.');
            }}
            retiring={retiring}
            stripePublishableKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
          />
        )}
        {activeStep === 2 && (
          <AgreePurchaseForm
            retiring={retiring}
            onSubmit={function (values: {
              anonymousPurchase: boolean;
              stateProvince: string;
              postalCode: string;
              followProject: boolean;
              subscribeNewsletter: boolean;
              agreeErpa: boolean;
              retirementReason?: string | undefined;
              country?: string | undefined;
            }): Promise<void> {
              throw new Error('Function not implemented.');
            }}
            goToChooseCredits={function (): void {
              throw new Error('Function not implemented.');
            }}
            imgSrc={''}
          />
        )}
      </div>
    </div>
  );
};
