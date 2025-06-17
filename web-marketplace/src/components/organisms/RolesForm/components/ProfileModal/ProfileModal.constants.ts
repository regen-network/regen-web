import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_TYPE,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/ProfileEdit/ProfileEdit.constants';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { ProfileModalSchemaType } from './ProfileModal.schema';

export const getProfileModalInitialValues = (
  _: TranslatorType,
): ProfileModalSchemaType => ({
  profileType: DEFAULT_PROFILE_TYPE,
  name: _(DEFAULT_NAME),
  profileImage: DEFAULT_PROFILE_USER_AVATAR,
  description: '',
  address: '',
});
