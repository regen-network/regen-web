import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import { useLedger } from 'ledger';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';

import { AgreePurchaseForm } from 'components/organisms/AgreePurchaseForm/AgreePurchaseForm';
import { ChooseCreditsForm } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm';
import { PaymentOptions } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.PaymentOptions';
import { PaymentInfoForm } from 'components/organisms/PaymentInfoForm/PaymentInfoForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { PaymentOptionsType } from './BuyCredits.types';

type Props = {
  paymentOption: PaymentOptionsType;
  setPaymentOption: UseStateSetter<PaymentOptionsType>;
  retiring: boolean;
  setRetiring: UseStateSetter<boolean>;
  cardSellOrders: Array<{ usdPrice: number } & SellOrderInfo>;
  cryptoSellOrders: Array<SellOrderInfo>;
};
export const BuyCreditsForm = ({
  paymentOption,
  setPaymentOption,
  retiring,
  setRetiring,
  cardSellOrders,
}: Props) => {
  const {
    data,
    percentComplete,
    activeStep,
    handleBack,
    handleNext,
    isLastStep,
  } = useMultiStep();
  const cardDisabled = cardSellOrders.length === 0;

  const { marketplaceClient } = useLedger();
  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: marketplaceClient,
      enabled: !!marketplaceClient,
    }),
  );

  return (
    <>
      {activeStep === 0 && (
        <ChooseCreditsForm
          setPaymentOption={setPaymentOption}
          paymentOption={paymentOption}
          retiring={retiring}
          setRetiring={setRetiring}
          cardDisabled={cardDisabled}
          onSubmit={() => {}}
          allowedDenoms={allowedDenomsData?.allowedDenoms}
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
    </>
  );
};
