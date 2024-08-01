import { ChangeEvent, MouseEvent, Suspense, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { CreditsAmount } from 'web-components/src/components/inputs/new/CreditsAmount/CreditsAmount';
import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { Loading } from 'web-components/src/components/loading';
import Title from 'web-components/src/components/typography/new/Title';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import { PaymentOptions } from './ChooseCreditsForm.PaymentOptions';
import {
  ChooseCreditsFormSchema,
  FormFields,
} from './ChooseCreditsForm.schema';
import { PAYMENT_OPTIONS, PaymentOptionsType } from './ChooseCreditsForm.types';

export function ChooseCreditsForm({
  creditVintages,
  cryptoOptions,
}: {
  creditVintages: { date: string; credits: string }[];
  cryptoOptions: { label: string; description?: string; linkTo: string }[];
}) {
  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CARD,
  );
  const [advanceSettingsOpen, setAdvanceSettingsOpen] = useState(false);
  const [cryptoPurchaseOption, setCryptoPurchaseOption] = useState<
    string | undefined
  >(cryptoOptions?.[0]?.label);
  const [creditVintageOptions, setCreditVintageOptions] = useState<
    string[] | []
  >([]);

  const toggleAdvancedSettings = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setAdvanceSettingsOpen(prev => !prev);
  };

  const form = useZodForm({
    schema: ChooseCreditsFormSchema,
    defaultValues: {
      amountCurrency: 1,
      amountCredits: 1,
      cryptoPurchaseOption,
    },
    mode: 'onBlur',
  });

  const handleOnSubmit: SubmitHandler<FormFields> = async data => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // do some async stuff
    console.log('🚀 ~ data', data);
  };

  const handleCryptoPurchaseOptions = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('cryptoPurchaseOption', e.currentTarget.value);
    setCryptoPurchaseOption(e.currentTarget.value);
  };

  const handleCreditVintageOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const updatedItems = checked
      ? [...creditVintageOptions, value]
      : creditVintageOptions.filter(item => item !== value);
    form.setValue('creditVintageOptions', updatedItems);
    setCreditVintageOptions(updatedItems);
  };

  const handlePaymentOptions = (option: string) => {
    setPaymentOption(option as PaymentOptionsType);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div
        data-testid="buy-credits-form"
        className="border-grey-300 border border-solid p-15 sm:p-20"
      >
        <Form form={form} onSubmit={handleOnSubmit}>
          {/* payment options */}
          <PaymentOptions setPaymentOption={handlePaymentOptions} />

          {/* credits amount */}
          <div
            className={`grid min-h-min ${
              paymentOption === PAYMENT_OPTIONS.CRYPTO
                ? 'grid-rows-3'
                : 'grid-rows-2'
            }`}
          >
            <CreditsAmount
              creditsAvailable={1500} // TO-DO update with max credits available {creditsAvailable}
              paymentOption={paymentOption}
            />
          </div>

          {/* crypto options */}
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <div>
              <Title as="h2" className="text-lg font-black">
                Crypto purchase options
              </Title>
              <p className="font-['Lato'] text-base m-0 text-grey-500 pb-[12px]">
                Credits purchased with crypto can be purchased in either a
                retired or tradable state.
              </p>
              <RadioGroup className="gap-10">
                {cryptoOptions.map(({ label, description, linkTo }) => (
                  <Radio
                    {...(form.register('cryptoPurchaseOption'),
                    {
                      value: label,
                    })}
                    onChange={handleCryptoPurchaseOptions}
                    selectedValue={cryptoPurchaseOption}
                    key={label}
                    label={
                      <span className="block text-base font-bold font-['Lato']">
                        {label}
                      </span>
                    }
                    description={
                      <p className="text-black text-sm font-normal font-['Lato'] my-0">
                        {description}
                        <a
                          href={linkTo}
                          target="_blank"
                          className="pl-10 hover:opacity-80"
                          rel="noreferrer"
                        >
                          Learn more »
                        </a>
                      </p>
                    }
                  />
                ))}
              </RadioGroup>
            </div>
          )}

          {/* advance settings */}
          <div>
            <div className="grid grid-rows-1 py-20">
              <div className="flex flex-col">
                <TextButton
                  className="w-[193px] text-xs font-['Muli'] text-green-400 font-extrabold uppercase text-brand-400 self-start bg-transparent border-none p-0 text-left"
                  textSize="sm"
                  onClick={toggleAdvancedSettings}
                >
                  <span className="text-base w-10 inline-block mr-5">
                    {advanceSettingsOpen ? '-' : '+'}
                  </span>
                  Advanced settings
                </TextButton>
                {advanceSettingsOpen && (
                  <div
                    className={`${
                      advanceSettingsOpen ? 'max-h-[300px]' : 'max-h-0'
                    } flex flex-grow justify-end items-center font-['Lato'] text-base flex-col mt-4 overflow-hidden transition-all duration-500 ease-in-out max-h-0`}
                  >
                    <p className="self-start text-sm ">
                      Choose specific credit vintages{' '}
                      <span className="italic">
                        (by default the cheapest credit vintage will be
                        purchased first)
                      </span>
                    </p>
                    {creditVintages.map(({ date, credits }) => (
                      <div
                        key={date}
                        className="h-auto flex flex-col items-start w-full p-15 border border-solid border-grey-300 mb-10 rounded-md"
                      >
                        <CheckboxLabel
                          label={date}
                          {...(form.register(`creditVintageOptions`),
                          {
                            value: date,
                          })}
                          onChange={handleCreditVintageOptions}
                        />
                        <p className="pl-[32px] m-0 mt-5">
                          <span className="italic">
                            {credits} credits available
                          </span>{' '}
                          |
                          <TextButton
                            size="small"
                            className="text-brand-300 uppercase bg-transparent border-none font-bold hover:opacity-80 text-sm"
                          >
                            view batch »
                          </TextButton>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* TO-DO remove this button */}
          <button type="submit">submit</button>
        </Form>
      </div>
    </Suspense>
  );
}
