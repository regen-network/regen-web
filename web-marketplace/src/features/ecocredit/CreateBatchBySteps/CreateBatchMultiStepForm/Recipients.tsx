import React from 'react';
import { useLingui } from '@lingui/react';
import { useFormikContext } from 'formik';

import {
  FormValues,
  Recipient,
  RecipientsFieldArray,
  RecipientsFieldArrayProps,
} from 'web-components/src/components/form/RecipientsForm';

import {
  CREATE_BATCH_FORM_ADD_BUTTON_TEXT,
  CREATE_BATCH_FORM_AMOUNT_RETIRED_LABEL,
  CREATE_BATCH_FORM_AMOUNT_TRADABLE_LABEL,
  CREATE_BATCH_FORM_DELETE_BUTTON_TEXT,
  CREATE_BATCH_FORM_RECIPIENT_LABEL,
  CREATE_BATCH_FORM_WITH_RETIRE_LABEL,
} from './CreateBatchMultiStepForm.constants';

export type RecipientsFormValues = FormValues;
export type RecipientFormValues = Recipient;

/**
 * Recipients component gathers recipients' information for credit distribution.
 * This component is used in the CreateBatchMultiStepForm.
 *
 * It allows users to:
 * - Add multiple recipients
 * - Specify tradable and retired amounts for each recipient
 *
 */
export default function Recipients({
  bottomTextMapping,
  retirementInfoText,
  mapboxToken,
}: RecipientsFieldArrayProps): React.ReactElement {
  const { validateForm } = useFormikContext<RecipientsFormValues>();
  const { _ } = useLingui();

  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  return (
    <>
      <RecipientsFieldArray
        bottomTextMapping={bottomTextMapping}
        retirementInfoText={retirementInfoText}
        mapboxToken={mapboxToken}
        deleteButtonText={_(CREATE_BATCH_FORM_DELETE_BUTTON_TEXT)}
        addButtonText={_(CREATE_BATCH_FORM_ADD_BUTTON_TEXT)}
        recipientLabel={_(CREATE_BATCH_FORM_RECIPIENT_LABEL)}
        amountTradableLabel={_(CREATE_BATCH_FORM_AMOUNT_TRADABLE_LABEL)}
        amountRetiredLabel={_(CREATE_BATCH_FORM_AMOUNT_RETIRED_LABEL)}
        withRetireLabel={_(CREATE_BATCH_FORM_WITH_RETIRE_LABEL)}
      />
    </>
  );
}
