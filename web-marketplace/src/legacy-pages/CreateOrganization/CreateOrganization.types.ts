import { UseStateSetter } from 'types/react/use-state';

import { FormRef } from 'components/molecules/Form/Form';

export interface FormStateSetter {
  setIsValid: UseStateSetter<boolean>;
  setIsSubmitting: UseStateSetter<boolean>;
  formRef?: FormRef;
}
