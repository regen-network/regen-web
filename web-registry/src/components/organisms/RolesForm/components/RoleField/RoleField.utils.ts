import { isValidElement } from 'react';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

export function isProfile(
  option: ProfileModalSchemaType | JSX.Element,
): option is ProfileModalSchemaType {
  return !isValidElement(option);
}

export function group(value: ProfileModalSchemaType, accountId?: string) {
  return value.accountId === accountId ? 'your profiles' : 'all profiles';
}
