import { useNavigate } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { useQuery } from '@tanstack/react-query';
import { USD_DENOM } from 'config/allowedBaseDenoms';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import SaveFooter from 'web-components/src/components/fixed-footer/SaveFooter';
import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useLedger } from 'ledger';
import { useAuth } from 'lib/auth/auth';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { getPaymentMethodsQuery } from 'lib/queries/react-query/registry-server/getPaymentMethodsQuery/getPaymentMethodsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { CURRENCY_AMOUNT } from 'components/molecules/CreditsAmount/CreditsAmount.constants';
import { AgreePurchaseForm } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm';
import { AgreePurchaseFormSchemaType } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm.schema';
import { ChooseCreditsForm } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm';
import { ChooseCreditsFormSchemaType } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { PaymentInfoFormSchemaType } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.schema';
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
  const { data, activeStep, handleSaveNext } = useMultiStep<
    Partial<ChooseCreditsFormSchemaType> &
      Partial<PaymentInfoFormSchemaType> &
      Partial<AgreePurchaseFormSchemaType>
  >();
  const { wallet } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
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
            onSubmit={async (values: PaymentInfoFormSchemaType) => {}}
            amount={(data?.[CURRENCY_AMOUNT] ?? 0) * 100} // stripe amounts should be in the smallest currency unit (e.g., 100 cents to charge $1.00)
            currency={USD_DENOM}
            login={function (): void {
              throw new Error('Function not implemented.');
            }}
            retiring={retiring}
            stripePublishableKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
            wallet={wallet}
            accountEmail={privActiveAccount?.email}
            accountName={activeAccount?.name}
            accountId={activeAccount?.id}
            paymentMethods={paymentMethodData?.paymentMethods}
          />
        )}
        {activeStep === 2 && (
          <AgreePurchaseForm
            retiring={retiring}
            onSubmit={async (values: AgreePurchaseFormSchemaType) => {}}
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
