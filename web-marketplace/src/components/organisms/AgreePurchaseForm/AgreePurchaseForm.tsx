import { useEffect } from 'react';
import { DefaultValues, useFormState, useWatch } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { useAtom } from 'jotai';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { PrevNextButtons } from 'web-components/src/components/molecules/PrevNextButtons/PrevNextButtons';
import { Body } from 'web-components/src/components/typography/Body';

import { cardDetailsMissingAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckboxNew';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { Retirement } from './AgreePurchaseForm.Retirement';
import {
  agreePurchaseFormSchema,
  AgreePurchaseFormSchemaType,
} from './AgreePurchaseForm.schema';
import { Tradable, TradableProps } from './AgreePurchaseForm.Tradable';

export type AgreePurchaseFormProps = {
  retiring: boolean;
  onSubmit: (
    values: AgreePurchaseFormSchemaType,
    stripe?: Stripe | null,
    elements?: StripeElements | null,
  ) => Promise<void>;
  country?: string;
  stripe?: Stripe | null;
  elements?: StripeElements | null;
  email?: string | null;
  isNewsletterSubscribed?: boolean;
  initialValues?: DefaultValues<AgreePurchaseFormSchemaType>;
  isCardPayment?: boolean;
} & TradableProps;

export const AgreePurchaseForm = ({
  retiring,
  country,
  onSubmit,
  stripe,
  elements,
  goToChooseCredits,
  imgSrc,
  email,
  isNewsletterSubscribed,
  initialValues,
  isCardPayment,
}: AgreePurchaseFormProps) => {
  const { _ } = useLingui();
  const { handleBack, handleActiveStep } = useMultiStep();
  const [cardDetailsMissing, setCardDetailsMissing] = useAtom(
    cardDetailsMissingAtom,
  );
  const form = useZodForm({
    schema: agreePurchaseFormSchema(retiring),
    defaultValues: initialValues,
    mode: 'onBlur',
  });
  const { errors, isValid, isSubmitting } = useFormState({
    control: form.control,
  });

  // const followProject = useWatch({
  //   control: form.control,
  //   name: 'followProject',
  // });
  const subscribeNewsletter = useWatch({
    control: form.control,
    name: 'subscribeNewsletter',
  });
  const agreeErpa = useWatch({
    control: form.control,
    name: 'agreeErpa',
  });

  useEffect(() => {
    form.setValue('country', country);
  }, [country, form]);

  useEffect(() => {
    if (isCardPayment && cardDetailsMissing) {
      handleActiveStep(1);
    }
  }, [
    handleActiveStep,
    isCardPayment,
    cardDetailsMissing,
    setCardDetailsMissing,
  ]);

  // reset cardDetailsMissing on unmount
  useEffect(() => {
    return () => {
      setCardDetailsMissing(true);
    };
  }, [setCardDetailsMissing]);

  return (
    <Form
      form={form}
      onSubmit={(values: AgreePurchaseFormSchemaType) =>
        onSubmit(values, stripe, elements)
      }
      className="max-w-[560px]"
    >
      <Retirement retiring={retiring} />
      {!retiring && (
        <Tradable goToChooseCredits={goToChooseCredits} imgSrc={imgSrc} />
      )}

      <div className="flex flex-col gap-20 py-20 px-20 sm:pl-40 sm:pr-0">
        {/* {email && (
          <CheckboxLabel
            checked={followProject}
            optional
            label={
              <Body className="text-grey-700" size="md" as="span">
                <Trans>
                  Follow this project get project update to my inbox
                </Trans>
              </Body>
            }
            {...form.register('followProject')}
          />
        )} */}
        {email && !isNewsletterSubscribed && (
          <CheckboxLabel
            checked={subscribeNewsletter}
            optional
            label={
              <Body className="text-grey-700" size="md" as="span">
                <Trans>
                  Subscribe to Regen Network newsletter, which includes product
                  updates and new and exciting projects
                </Trans>
              </Body>
            }
            {...form.register('subscribeNewsletter')}
          />
        )}
        <AgreeErpaCheckbox
          checked={agreeErpa}
          labelSize="md"
          labelClassName="font-normal"
          {...form.register('agreeErpa')}
        />
      </div>
      <div className="float-right pt-40">
        <PrevNextButtons
          saveDisabled={!isValid || isSubmitting}
          saveText={_(msg`purchase now`)}
          onPrev={handleBack}
        />
      </div>
    </Form>
  );
};
