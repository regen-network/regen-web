import {
  ChangeEvent,
  MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useWatch } from 'react-hook-form';
import { CreditsAmount } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount';
import {
  CREDIT_VINTAGE_OPTIONS,
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';
import { getCreditsAvailablePerCurrency } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.utils';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import Card from 'web-components/src/components/cards/Card';
import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Loading } from 'web-components/src/components/loading';
import { UseStateSetter } from 'web-components/src/types/react/useState';

import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

import { AdvanceSettings } from './ChooseCreditsForm.AdvanceSettings';
import { PAYMENT_OPTIONS } from './ChooseCreditsForm.constants';
import { CryptoOptions } from './ChooseCreditsForm.CryptoOptions';
import { PaymentOptions } from './ChooseCreditsForm.PaymentOptions';
import {
  ChooseCreditsFormSchemaType,
  createChooseCreditsFormSchema,
} from './ChooseCreditsForm.schema';
import { CreditDetails, CreditsVintages } from './ChooseCreditsForm.types';
import { getSpendingCap } from './ChooseCreditsForm.utils';

type Props = {
  paymentOption: PaymentOptionsType;
  setPaymentOption: UseStateSetter<PaymentOptionsType>;
  creditVintages: CreditsVintages[];
  creditDetails: CreditDetails[];
  retiring: boolean;
  setRetiring: UseStateSetter<boolean>;
  onSubmit: (values: ChooseCreditsFormSchemaType) => Promise<void>;
};

export function ChooseCreditsForm({
  paymentOption,
  setPaymentOption,
  creditVintages,
  creditDetails,
  retiring,
  setRetiring,
  onSubmit,
}: Props) {
  /** TODO
   *
   * 1. Update available creditVintages when currency changes.
   * Other option would be to simply append to each creditDetails a list of available creditVintages
   * and the sum of those vintages credits would be equal to the creditDetails.availableCredits.
   *
   * 2. For crypto purchase, we also need to know whether sold credits are tradable or not, because
   * if the user picks up "Buy tradable ecocredits" option then we don't want to show credits
   * for sell that are not tradable.
   *
   * 3. Implement Advance Settings functionality.
   *
   */

  const [advanceSettingsOpen, setAdvanceSettingsOpen] = useState(false);

  const [spendingCap, setSpendingCap] = useState(
    getSpendingCap(CURRENCIES.usd, creditDetails),
  );
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.usd);

  const [creditsAvailable, setCreditsAvailable] = useState(
    getCreditsAvailablePerCurrency(currency, creditDetails),
  );

  const chooseCreditsFormSchema = createChooseCreditsFormSchema({
    creditsCap: creditDetails.find(credit => credit.currency === currency)
      ?.availableCredits!,
    spendingCap,
  });

  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      [CURRENCY_AMOUNT]: 0,
      [CREDITS_AMOUNT]: 0,
    },
    mode: 'onChange',
  });

  const creditVintageOptions = useWatch({
    control: form.control,
    name: CREDIT_VINTAGE_OPTIONS,
  });

  useEffect(() => {
    if (!advanceSettingsOpen) {
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
    }
  }, [advanceSettingsOpen, form]);

  useEffect(() => {
    form.reset({
      [CURRENCY_AMOUNT]: 0,
      [CREDITS_AMOUNT]: 0,
      [CREDIT_VINTAGE_OPTIONS]: form.getValues(CREDIT_VINTAGE_OPTIONS) || [],
    });
  }, [form, spendingCap]);

  useEffect(() => {
    setSpendingCap(getSpendingCap(currency, creditDetails));
  }, [creditDetails, currency]);

  const handleCryptoPurchaseOptions = useCallback(() => {
    setRetiring(prev => !prev);
  }, [setRetiring]);

  const handleCreditVintageOptions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const checked = e.target.checked;
      const currentValues = creditVintageOptions || [];
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter(item => item !== value);

      form.setValue(CREDIT_VINTAGE_OPTIONS, updatedValues);
    },
    [creditVintageOptions, form],
  );

  const handlePaymentOptions = useCallback(
    (option: string) => {
      setPaymentOption(option as PaymentOptionsType);
      form.setValue(CREDIT_VINTAGE_OPTIONS, []);
      if (option === PAYMENT_OPTIONS.CRYPTO) {
        setCurrency(CURRENCIES.uregen);
        setSpendingCap(getSpendingCap(CURRENCIES.uregen, creditDetails));
        setCreditsAvailable(
          getCreditsAvailablePerCurrency(CURRENCIES.uregen, creditDetails),
        );
      }
      if (option === PAYMENT_OPTIONS.CARD) {
        setCurrency(CURRENCIES.usd);
        setSpendingCap(getSpendingCap(CURRENCIES.usd, creditDetails));
        setCreditsAvailable(
          getCreditsAvailablePerCurrency(CURRENCIES.usd, creditDetails),
        );
      }
    },
    [creditDetails, form, setPaymentOption],
  );

  const toggleAdvancedSettings = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAdvanceSettingsOpen(prev => !prev);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
        <Form form={form} onSubmit={onSubmit} data-testid="choose-credits-form">
          <PaymentOptions setPaymentOption={handlePaymentOptions} />
          <CreditsAmount
            creditDetails={creditDetails}
            paymentOption={paymentOption}
            currency={currency}
            setCurrency={setCurrency}
            setSpendingCap={setSpendingCap}
            setCreditsAvailable={setCreditsAvailable}
            creditsAvailable={creditsAvailable}
            creditVintages={creditVintages}
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
