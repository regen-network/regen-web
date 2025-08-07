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
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
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

export const ROLE_ITEMS: {
  key: BaseMemberRole;
  label: MessageDescriptor;
  Icon: React.FC<any>;
  description: MessageDescriptor;
}[] = [
  {
    key: ROLE_OWNER,
    label: ROLE_OWNER_LABEL,
    Icon: OwnerIcon,
    description: ROLE_OWNER_DESCRIPTION,
  },
  {
    key: ROLE_ADMIN,
    label: ROLE_ADMIN_LABEL,
    Icon: CogIcon,
    description: ROLE_ADMIN_DESCRIPTION,
  },
  {
    key: ROLE_EDITOR,
    label: ROLE_EDITOR_LABEL,
    Icon: EditIcon,
    description: ROLE_EDITOR_DESCRIPTION,
  },
  {
    key: ROLE_VIEWER,
    label: ROLE_VIEWER_LABEL,
    Icon: EyeIcon,
    description: ROLE_VIEWER_DESCRIPTION,
  },
];
