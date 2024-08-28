import { useFormState, useWatch } from 'react-hook-form';
import { Trans } from '@lingui/macro';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { Body } from 'web-components/src/components/typography/Body';

import AgreeErpaCheckbox from 'components/atoms/AgreeErpaCheckboxNew';
import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { Retirement } from './AgreePurchaseForm.Retirement';
import {
  agreePurchaseFormSchema,
  AgreePurchaseFormSchemaType,
} from './AgreePurchaseForm.schema';
import { Tradable, TradableProps } from './AgreePurchaseForm.Tradable';

type AgreePurchaseFormProps = {
  retiring: boolean;
  onSubmit: (values: AgreePurchaseFormSchemaType) => Promise<void>;
  country?: string;
} & TradableProps;

export const AgreePurchaseForm = ({
  retiring,
  country,
  onSubmit,
  goToChooseCredits,
  imgSrc,
}: AgreePurchaseFormProps) => {
  const form = useZodForm({
    schema: agreePurchaseFormSchema(retiring),
    defaultValues: {
      country,
      anonymousPurchase: false,
      followProject: false,
      subscribeNewsletter: false,
      agreeErpa: false,
    },
    mode: 'onBlur',
  });
  const { errors } = useFormState({
    control: form.control,
  });

  const followProject = useWatch({
    control: form.control,
    name: 'followProject',
  });
  const subscribeNewsletter = useWatch({
    control: form.control,
    name: 'subscribeNewsletter',
  });

  return (
    <Form form={form} onSubmit={onSubmit} className="max-w-[560px]">
      {retiring ? (
        <Retirement />
      ) : (
        <Tradable goToChooseCredits={goToChooseCredits} imgSrc={imgSrc} />
      )}
      <div className="flex flex-col gap-20 py-20 px-20 sm:pl-40 sm:pr-0">
        <CheckboxLabel
          checked={followProject}
          optional
          label={
            <Body className="text-grey-700" size="md" as="span">
              <Trans>Follow this project get project update to my inbox</Trans>
            </Body>
          }
          {...form.register('followProject')}
        />
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
        <AgreeErpaCheckbox
          labelSize="md"
          labelClassName="font-normal"
          error={!!errors.agreeErpa}
          helperText={errors.agreeErpa?.message}
          {...form.register('agreeErpa')}
        />
      </div>
    </Form>
  );
};
