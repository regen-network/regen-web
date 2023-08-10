import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_TYPE,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/ProfileEdit/ProfileEdit.constants';

import { ProfileModalSchemaType } from './ProfileModal.schema';

export const profileModalInitialValues: ProfileModalSchemaType = {
  profileType: DEFAULT_PROFILE_TYPE,
  name: DEFAULT_NAME,
  profileImage: DEFAULT_PROFILE_USER_AVATAR,
  description: '',
  address: '',
};
