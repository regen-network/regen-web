import { MessageDescriptor } from '@lingui/core';

import AuthorIcon from 'web-components/src/components/icons/AuthorIcon';
import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';
import { OwnerIcon } from 'web-components/src/components/icons/OwnerIcon';

import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from '../ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';
import {
  ROLE_OWNER_DESCRIPTION,
  ROLE_OWNER_LABEL,
} from '../OrganizationMembers/OrganizationMembers.constants';
import {
  ROLE_ADMIN_DESCRIPTION,
  ROLE_ADMIN_LABEL,
  ROLE_AUTHOR_DESCRIPTION,
  ROLE_AUTHOR_LABEL,
  ROLE_EDITOR_DESCRIPTION,
  ROLE_EDITOR_LABEL,
  ROLE_VIEWER_DESCRIPTION,
  ROLE_VIEWER_LABEL,
} from './ProjectCollaborators.constants';

export const ROLE_OPTIONS: {
  key: ProjectRole;
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
    key: ROLE_AUTHOR,
    label: ROLE_AUTHOR_LABEL,
    Icon: AuthorIcon,
    description: ROLE_AUTHOR_DESCRIPTION,
  },
  {
    key: ROLE_VIEWER,
    label: ROLE_VIEWER_LABEL,
    Icon: EyeIcon,
    description: ROLE_VIEWER_DESCRIPTION,
  },
];

export const ROLE_HIERARCHY: Record<ProjectRole, number> = {
  [ROLE_VIEWER]: 0,
  [ROLE_AUTHOR]: 1,
  [ROLE_EDITOR]: 2,
  [ROLE_ADMIN]: 3,
  [ROLE_OWNER]: 4,
};
