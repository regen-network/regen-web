import { useFormState } from 'react-hook-form';
import { Box } from '@mui/material';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

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
        description={
          <>
            <b>
              Make sure this is the correct REGEN address.{' '}
              <Box component="span" sx={{ color: 'error.main' }}>
                If you change this to an address you don’t have access to, you
                will be unable to edit the project.
              </Box>
            </b>{' '}
            This change will only be made after you save the change and sign the
            transaction.
          </>
        }
        {...form.register('newAddress')}
        helperText={errors.newAddress?.message}
        error={!!errors.newAddress}
      />
    </ModalTemplate>
  );
}

export { AdminModal };
