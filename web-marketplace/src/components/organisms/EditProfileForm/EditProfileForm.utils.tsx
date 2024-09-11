import { UseFormReturn } from 'react-hook-form';

import { EditProfileFormSchemaType } from './EditProfileForm.schema';

type Props = {
  values: EditProfileFormSchemaType;
  requiredMessage: string;
  setError: UseFormReturn<EditProfileFormSchemaType>['setError'];
};

export const validateEditProfileForm = ({
  values,
  requiredMessage,
  setError,
}: Props): boolean => {
  let hasError = false;

  if (!values.name) {
    setError('name', { type: 'required', message: requiredMessage });
    hasError = true;
  }

  return hasError;
};
