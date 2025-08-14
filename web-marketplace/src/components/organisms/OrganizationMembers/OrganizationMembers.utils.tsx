import { MessageDescriptor } from '@lingui/core';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { OwnerIcon } from 'web-components/src/components/icons/OwnerIcon';

import {
  ROLE_ADMIN,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from '../ActionDropdown/ActionDropdown.constants';
import {
  BaseMemberRole,
  RoleOption,
} from '../BaseMembersTable/BaseMembersTable.types';
import {
  ROLE_ADMIN_DESCRIPTION,
  ROLE_ADMIN_LABEL,
  ROLE_EDITOR_DESCRIPTION,
  ROLE_EDITOR_LABEL,
  ROLE_OWNER_DESCRIPTION,
  ROLE_OWNER_LABEL,
  ROLE_VIEWER_DESCRIPTION,
  ROLE_VIEWER_LABEL,
} from './OrganizationMembers.constants';
import { TranslatorType } from 'lib/i18n/i18n.types';

export const getRoleItems = (_: TranslatorType) =>
  [
    {
      key: ROLE_OWNER,
      label: _(ROLE_OWNER_LABEL),
      Icon: OwnerIcon,
      description: _(ROLE_OWNER_DESCRIPTION),
    },
    {
      key: ROLE_ADMIN,
      label: _(ROLE_ADMIN_LABEL),
      Icon: CogIcon,
      description: _(ROLE_ADMIN_DESCRIPTION),
    },
    {
      key: ROLE_EDITOR,
      label: _(ROLE_EDITOR_LABEL),
      Icon: EditIcon,
      description: _(ROLE_EDITOR_DESCRIPTION),
    },
    {
      key: ROLE_VIEWER,
      label: _(ROLE_VIEWER_LABEL),
      Icon: EyeIcon,
      description: _(ROLE_VIEWER_DESCRIPTION),
    },
  ] as RoleOption[];
