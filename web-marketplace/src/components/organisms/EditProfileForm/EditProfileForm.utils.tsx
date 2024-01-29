import { UseFormReturn } from 'react-hook-form';

import { requiredMessage } from 'web-components/src/components/inputs/validation';

import { EditProfileFormSchemaType } from './EditProfileForm.schema';

type Props = {
  values: EditProfileFormSchemaType;
  setError: UseFormReturn<EditProfileFormSchemaType>['setError'];
};

export const validateEditProfileForm = ({
  values,
  setError,
}: Props): boolean => {
  let hasError = false;

  if (!values.name) {
    setError('name', { type: 'required', message: requiredMessage });
    hasError = true;
  }

  return hasError;
};
