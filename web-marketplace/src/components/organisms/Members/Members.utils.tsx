import { MessageDescriptor } from '@lingui/core';

import { CogIcon } from 'web-components/src/components/icons/CogIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

import {
  ROLE_ADMIN_DESCRIPTION,
  ROLE_ADMIN_LABEL,
  ROLE_EDITOR_DESCRIPTION,
  ROLE_EDITOR_LABEL,
  ROLE_VIEWER_DESCRIPTION,
  ROLE_VIEWER_LABEL,
} from './Members.constants';
import { MemberRole } from './Members.types';

export const ROLE_ITEMS: {
  key: MemberRole;
  label: MessageDescriptor;
  Icon: React.FC<any>;
  description: MessageDescriptor;
}[] = [
  {
    key: 'admin',
    label: ROLE_ADMIN_LABEL,
    Icon: CogIcon,
    description: ROLE_ADMIN_DESCRIPTION,
  },
  {
    key: 'editor',
    label: ROLE_EDITOR_LABEL,
    Icon: EditIcon,
    description: ROLE_EDITOR_DESCRIPTION,
  },
  {
    key: 'viewer',
    label: ROLE_VIEWER_LABEL,
    Icon: EyeIcon,
    description: ROLE_VIEWER_DESCRIPTION,
  },
];
