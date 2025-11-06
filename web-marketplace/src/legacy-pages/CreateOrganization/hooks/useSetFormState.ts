import { useEffect } from 'react';

import { FormStateSetter } from '../CreateOrganization.types';

type UseSetFormStateParams = {
  isSubmitting: boolean;
  isValid: boolean;
} & Partial<FormStateSetter>;

export const useSetFormState = ({
  isSubmitting,
  isValid,
  setIsSubmitting,
  setIsValid,
}: UseSetFormStateParams) => {
  useEffect(() => {
    setIsSubmitting && setIsSubmitting(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);
  useEffect(() => {
    setIsValid && setIsValid(isValid);
  }, [isValid, setIsValid]);
};
