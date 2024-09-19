import { useMemo } from 'react';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { useSetAtom } from 'jotai';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useLedger } from 'ledger';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';
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
import { useLoginData } from 'components/organisms/LoginButton/hooks/useLoginData';
import { LoginFlow } from 'components/organisms/LoginFlow/LoginFlow';
import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { defaultStripeOptions } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.constants';
import { PaymentInfoFormSchemaType } from 'components/organisms/PaymentInfoForm/PaymentInfoForm.schema';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { PAYMENT_OPTIONS, stripeKey } from './BuyCredits.constants';
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
      Partial<PaymentInfoFormSchemaType> & {
        confirmationTokenId?: string;
      } & Partial<AgreePurchaseFormSchemaType>
  >();
  const { wallet } = useWallet();
  const { activeAccount, privActiveAccount } = useAuth();
  const {
    isModalOpen,
    modalState,
    onModalClose,
    walletsUiConfig,
    onButtonClick,
  } = useLoginData({});

  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);

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

  const stripePromise = loadStripe(stripeKey);
  const stripeOptions = useMemo(
    () => ({
      amount: (data?.[CURRENCY_AMOUNT] ?? 0) * 100, // stripe amounts should be in the smallest currency unit (e.g., 100 cents to charge $1.00),
      currency: USD_DENOM,
      ...defaultStripeOptions,
    }),
    [data],
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
          <Elements options={stripeOptions} stripe={stripePromise}>
            <PaymentInfoForm
              paymentOption={paymentOption}
              onSubmit={async (values: PaymentInfoFormSchemaType) => {
                handleSaveNext({ ...values });
              }}
              login={onButtonClick}
              retiring={retiring}
              wallet={wallet}
              accountEmail={privActiveAccount?.email}
              accountName={activeAccount?.name}
              accountId={activeAccount?.id}
              paymentMethods={paymentMethodData?.paymentMethods}
              setError={setErrorBannerTextAtom}
            />
          </Elements>
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
      <LoginFlow
        isModalOpen={isModalOpen}
        onModalClose={onModalClose}
        wallets={walletsUiConfig}
        modalState={modalState}
      />
    </div>
  );
};
