import {
  ORGANIZATION_CONTEXT,
  PROJECT_CONTEXT,
} from '../BaseMembersTable/BaseMembersTable.constants';
import {
  ACTION_EDIT_MY_PROFILE,
  ACTION_EDIT_MY_TITLE,
  ACTION_EDIT_MY_USER_PROFILE,
  ACTION_EDIT_ORG_ROLE,
  ACTION_REMOVE,
} from '../ProjectCollaborators/ProjectCollaborators.constants';
import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
  ROLE_OWNER,
  ROLE_VIEWER,
} from './ActionDropdown.constants';
import { ActionItem, GetActionItemsParams } from './ActionDropdown.types';

// Helper function to determine action items based on context and user permissions
export const getActionItems = ({
  context,
  role,
  currentUserRole,
  orgRole,
  isCurrentUser,
  isExternalAdmin,
  onRemove,
  onEditOrgRole,
  onEditTitle,
  navigate,
  _,
}: GetActionItemsParams): ActionItem[] => {
  // Only owner or admins can manage members
  if (
    !isCurrentUser &&
    currentUserRole !== ROLE_ADMIN &&
    currentUserRole !== ROLE_OWNER
  ) {
    return [];
  }

  const editMyTitle = {
    label: _(ACTION_EDIT_MY_TITLE),
    onClick: onEditTitle,
  };
  const remove = {
    label: _(ACTION_REMOVE),
    onClick: onRemove,
  };

  if (isCurrentUser) {
    if (role === ROLE_OWNER) {
      return [editMyTitle];
    } else {
      return [editMyTitle, remove];
    }
  } else {
    return [remove];
  }
};
