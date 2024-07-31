import { useFormState, useWatch } from 'react-hook-form';

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

type AgreePurchaseFormProps = {
  retiring: boolean;
  onSubmit: (values: AgreePurchaseFormSchemaType) => Promise<void>;
  country?: string;
};

export const AgreePurchaseForm = ({
  retiring,
  country,
  onSubmit,
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
      {retiring && <Retirement />}
      <div className="flex flex-col gap-20 py-20 px-20 sm:pl-40 sm:pr-0">
        <CheckboxLabel
          checked={followProject}
          optional
          label={
            <Body className="text-grey-700" size="md" as="span">
              Follow this project get project update to my inbox
            </Body>
          }
          {...form.register('followProject')}
        />
        <CheckboxLabel
          checked={subscribeNewsletter}
          optional
          label={
            <Body className="text-grey-700" size="md" as="span">
              Subscribe to Regen Network newsletter, which includes product
              updates and new and exciting projects
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
