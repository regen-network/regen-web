import {
  ChangeEvent,
  MouseEvent,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import { DEFAULT_CRYPTO_CURRENCY } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import Card from 'web-components/src/components/cards/Card';
import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Loading } from 'web-components/src/components/loading';

import { AdvanceSettings } from './ChooseCreditsForm.AdvanceSettings';
import { PAYMENT_OPTIONS } from './ChooseCreditsForm.constants';
import { CryptoOptions } from './ChooseCreditsForm.CryptoOptions';
import { PaymentOptions } from './ChooseCreditsForm.PaymentOptions';
import {
  chooseCreditsFormSchema,
  ChooseCreditsFormSchemaType,
} from './ChooseCreditsForm.schema';
import { PaymentOptionsType } from './ChooseCreditsForm.types';

export function ChooseCreditsForm({
  creditVintages,
  creditsAvailable,
}: {
  creditVintages: { date: string; credits: string; batchDenom: string }[];
  creditsAvailable: {
    credits: number;
    currency: Currency;
  }[];
}) {
  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CARD,
  );
  const [advanceSettingsOpen, setAdvanceSettingsOpen] = useState(false);

  const toggleAdvancedSettings = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAdvanceSettingsOpen(prev => !prev);
  };

  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      amountCurrency: 1,
      amountCredits: 1,
      retiring: true,
    },
    mode: 'onBlur',
  });

  const retiring = useWatch({
    control: form.control,
    name: 'retiring',
  });

  const creditVintageOptions = useWatch({
    control: form.control,
    name: 'creditVintageOptions',
  });

  const handleOnSubmit: SubmitHandler<ChooseCreditsFormSchemaType> = data => {
    // TO-DO
  };

  const handleCryptoPurchaseOptions = () => {
    form.setValue('retiring', !retiring);
  };

  const handleCreditVintageOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const currentValues = creditVintageOptions || [];
    const updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter(item => item !== value);

    form.setValue('creditVintageOptions', updatedValues);
  };

  const handlePaymentOptions = (option: string) => {
    setPaymentOption(option as PaymentOptionsType);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
        <Form
          form={form}
          onSubmit={handleOnSubmit}
          data-testid="choose-credits-form"
        >
          <PaymentOptions setPaymentOption={handlePaymentOptions} />
          <CreditsAmount
            creditsAvailable={creditsAvailable}
            paymentOption={paymentOption}
          />
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <CryptoOptions
              retiring={retiring}
              handleCryptoPurchaseOptions={handleCryptoPurchaseOptions}
            />
          )}
          <AdvanceSettings
            creditVintages={creditVintages}
            advanceSettingsOpen={advanceSettingsOpen}
            toggleAdvancedSettings={toggleAdvancedSettings}
            handleCreditVintageOptions={handleCreditVintageOptions}
          />
        </Form>
      </Card>
    </Suspense>
  );
}
