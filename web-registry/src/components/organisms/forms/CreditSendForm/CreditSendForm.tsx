/* eslint-disable no-console */
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { BottomCreditRetireFieldsProps } from 'web-components/lib/components/form/CreditRetireForm';
import { RegenModalProps } from 'web-components/lib/components/modal';

import { v } from 'lib/validation';

import TextField from 'components/molecules/fields/TextField';

import {
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
  const form = useForm<FormValues>({
    defaultValues: { ...initialValues, sender },
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <TextField
        name="sender"
        required
        disabled
        fullWidth
        label="Sender"
        sx={{ mb: 2 }}
      />
    </FormProvider>
  );
};
