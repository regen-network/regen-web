import { useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { ModalTemplate } from '../ModalTemplate/ModalTemplate';
import { SUBMIT_LABEL, TITLE } from './AdminModal.constants';
import { AdminModalSchemaType, getAdminModalSchema } from './AdminModal.schema';

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
  const { _ } = useLingui();
  const adminModalSchema = useMemo(() => getAdminModalSchema(_), [_]);

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
      title={_(TITLE)}
      open={!!initialValues}
      onClose={onClose}
      form={form}
      handleSubmit={form.handleSubmit(onSubmit)}
      submitDisabled={!isValid || isSubmitting}
      submitLabel={_(SUBMIT_LABEL)}
    >
      <TextField
        type="text"
        label={_(msg`Current admin address`)}
        {...form.register('currentAddress')}
        disabled
      />
      <TextField
        type="text"
        label={_(msg`New admin address`)}
        description={
          <>
            <b>
              <Trans>
                Make sure this is the correct REGEN address.{' '}
                <Box component="span" sx={{ color: 'error.main' }}>
                  If you change this to an address you don’t have access to, you
                  will be unable to edit the project.
                </Box>
              </Trans>
            </b>{' '}
            <Trans>
              This change will only be made after you save the change and sign
              the transaction.
            </Trans>
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
