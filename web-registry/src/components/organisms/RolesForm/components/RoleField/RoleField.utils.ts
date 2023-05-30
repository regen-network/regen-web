import { isValidElement } from 'react';

import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';

export function isProfile(
  option: ProfileModalSchemaType | JSX.Element,
): option is ProfileModalSchemaType {
  return !isValidElement(option);
}
