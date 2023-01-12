/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { BottomCreditRetireFieldsProps } from 'web-components/lib/components/form/CreditRetireForm';
import { RegenModalProps } from 'web-components/lib/components/modal';

import { v } from 'lib/validation';

import {
  // FormValues as RetireFormValues,
  initialValues as retireInitialValues,
  schema as retireSchema,
} from '../CreditRetireForm/CreditRetireForm';

const schema = z.object({
  sender: v.regenAddress,
  recipient: v.regenAddress,
  totalAmount: v.amount,
  withRetire: v.checkbox,
  agreeErpa: v.checkbox,
  // TODO: include retire sub-form
});

const formSchema = schema.merge(retireSchema);

type FormValues = z.infer<typeof formSchema>;

// type Schema = z.infer<typeof schema>;
// type FormValues = Schema & RetireFormValues;

const initialValues: FormValues = {
  sender: '',
  recipient: '',
  totalAmount: 0,
  withRetire: false,
  agreeErpa: false,
  ...retireInitialValues,
};

export interface FormProps extends BottomCreditRetireFieldsProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => Promise<void>;
  addressPrefix?: string;
  mapboxToken: string;
  onClose: RegenModalProps['onClose'];
}

export const CreditSendForm = ({
  sender,
  batchDenom,
  availableTradableAmount,
  onSubmit,
  addressPrefix,
  mapboxToken,
  onClose,
}: FormProps): JSX.Element => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { ...initialValues, sender },
    resolver: zodResolver(formSchema),
  });
  const { errors } = formState;
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register('sender')} />
      {errors.sender?.message && <p>{errors.sender?.message}</p>}
      <input {...register('recipient')} />
      {errors.recipient?.message && <p>{errors.recipient?.message}</p>}
      <input
        type="number"
        {...register('totalAmount', { valueAsNumber: true })}
      />
      {errors.totalAmount?.message && <p>{errors.totalAmount?.message}</p>}
      <input type="checkbox" {...register('withRetire')} />
      {errors.withRetire?.message && <p>{errors.withRetire?.message}</p>}
      <input type="checkbox" {...register('agreeErpa')} />
      {errors.agreeErpa?.message && <p>{errors.agreeErpa?.message}</p>}
      <input type="submit" />
    </form>
  );
};
