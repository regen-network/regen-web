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
import {
  ProjectRole,
  RoleOption,
} from '../BaseMembersTable/BaseMembersTable.types';
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
      key: ROLE_AUTHOR,
      label: _(ROLE_AUTHOR_LABEL),
      Icon: AuthorIcon,
      description: _(ROLE_AUTHOR_DESCRIPTION),
    },
    {
      key: ROLE_VIEWER,
      label: _(ROLE_VIEWER_LABEL),
      Icon: EyeIcon,
      description: _(ROLE_VIEWER_DESCRIPTION),
    },
  ] as RoleOption[];
