import { ChangeEvent, MouseEvent, Suspense, useState } from 'react';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import { cryptoOptions } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import Card from 'web-components/src/components/cards/Card';
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
}: {
  creditVintages: { date: string; credits: string; batchDenom: string }[];
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
      cryptoPurchaseOption: cryptoOptions?.[0]?.label,
    },
    mode: 'onBlur',
  });

  const cryptoPurchaseOption = useWatch({
    control: form.control,
    name: 'cryptoPurchaseOption',
  });

  const creditVintageOptions = useWatch({
    control: form.control,
    name: 'creditVintageOptions',
  });

  const handleOnSubmit: SubmitHandler<ChooseCreditsFormSchemaType> = data => {
    // TO-DO
  };

  const handleCryptoPurchaseOptions = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('cryptoPurchaseOption', e.currentTarget.value);
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
            creditsAvailable={1500} // TO-DO update with max credits available {creditsAvailable}
            paymentOption={paymentOption}
          />
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <CryptoOptions
              register={form.register}
              cryptoPurchaseOption={cryptoPurchaseOption}
              handleCryptoPurchaseOptions={handleCryptoPurchaseOptions}
            />
          )}
          <AdvanceSettings
            creditVintages={creditVintages}
            advanceSettingsOpen={advanceSettingsOpen}
            toggleAdvancedSettings={toggleAdvancedSettings}
            register={form.register}
            handleCreditVintageOptions={handleCreditVintageOptions}
          />
        </Form>
      </Card>
    </Suspense>
  );
}
