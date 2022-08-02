import React from 'react';
import { useFormikContext } from 'formik';

import {
  RecipientsFieldArray,
  FormValues,
  Recipient,
} from 'web-components/lib/components/form/RecipientsForm';

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
        mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN || ''}
      />
    </>
  );
}
