import React from 'react';
import { useFormikContext } from 'formik';

import {
  FormValues,
  Recipient,
  RecipientsFieldArray,
} from 'web-components/src/components/form/RecipientsForm';

export type RecipientsFormValues = FormValues;
export type RecipientFormValues = Recipient;

export default function Recipients(): React.ReactElement {
  const { validateForm } = useFormikContext<RecipientsFormValues>();

  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <RecipientsFieldArray
        mapboxToken={import.meta.env.VITE_MAPBOX_TOKEN || ''}
      />
    </>
  );
}
