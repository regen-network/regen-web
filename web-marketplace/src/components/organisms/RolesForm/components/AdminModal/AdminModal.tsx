import { useFormState } from 'react-hook-form';

import TextField from 'web-components/lib/components/inputs/new/TextField/TextField';

import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ModalTemplate } from '../ModalTemplate/ModalTemplate';
import { SUBMIT_LABEL, TITLE } from './AdminModal.constants';
import { adminModalSchema, AdminModalSchemaType } from './AdminModal.schema';

interface AdminModalProps {
  initialValues?: AdminModalSchemaType;
  onClose: () => void;
  onSubmit: (data: AdminModalSchemaType) => void;
}

function AdminModal({
  initialValues,
  onClose,
  onSubmit,
}: AdminModalProps): JSX.Element {
  const form = useZodForm({
    schema: adminModalSchema,
    defaultValues: {
      ...initialValues,
    },
    mode: 'onBlur',
  });

  const { isSubmitting, errors, isValid } = useFormState({
    control: form.control,
  });

  return (
    <ModalTemplate
      title={TITLE}
      open={!!initialValues}
      onClose={onClose}
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      submitDisabled={!isValid || isSubmitting}
      submitLabel={SUBMIT_LABEL}
    >
      <TextField
        type="text"
        label="Current admin address"
        {...form.register('currentAddress')}
        disabled
      />
      <TextField
        type="text"
        label="New admin address"
        {...form.register('newAddress')}
        helperText={errors.newAddress?.message}
        error={!!errors.newAddress}
      />
    </ModalTemplate>
  );
}

export { AdminModal };
