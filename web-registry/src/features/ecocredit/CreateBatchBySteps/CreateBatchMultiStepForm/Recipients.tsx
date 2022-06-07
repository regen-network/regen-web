import React from 'react';
import {
  RecipientsFieldArray,
  FormValues,
} from 'web-components/lib/components/form/RecipientsForm';

export type RecipientsFormValues = FormValues;

export default function Recipients(): React.ReactElement {
  return (
    <>
      <RecipientsFieldArray
        mapboxToken={process.env.REACT_APP_MAPBOX_TOKEN || ''}
      />
    </>
  );
}
