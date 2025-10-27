import { UseStateSetter } from 'types/react/use-state';

export interface FormStateSetter {
  setIsValid: UseStateSetter<boolean>;
  setIsSubmitting: UseStateSetter<boolean>;
}
