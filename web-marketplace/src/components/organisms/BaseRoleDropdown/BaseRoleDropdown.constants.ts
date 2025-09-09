import { msg } from '@lingui/macro';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from '../ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';

export const OWNER_ADMIN_CAN_EDIT = msg`Only the owner or admin can edit user roles.`;
export const OWNER_CAN_EDIT_SELF = msg`Only the owner can change their role.`;
export const MUST_ASSIGN_NEW_OWNER = msg`You must assign a new owner before you can change your role.`;
export const MUST_HAVE_BLOCKCHAIN_ACCOUNT = msg`User must have a blockchain account.`;

export const ROLE_HIERARCHY: Record<ProjectRole, number> = {
  [ROLE_VIEWER]: 0,
  [ROLE_AUTHOR]: 1,
  [ROLE_EDITOR]: 2,
  [ROLE_ADMIN]: 3,
  [ROLE_OWNER]: 4,
};
