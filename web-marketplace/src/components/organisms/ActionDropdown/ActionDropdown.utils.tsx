import { ORGANIZATION_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import {
  ACTION_EDIT_MY_PROFILE,
  ACTION_EDIT_MY_TITLE,
  ACTION_EDIT_ORG_ROLE,
  ACTION_REMOVE,
} from '../ProjectCollaborators/ProjectCollaborators.constants';
import { ROLE_ADMIN, ROLE_OWNER } from './ActionDropdown.constants';
import { ActionItem, GetActionItemsParams } from './ActionDropdown.types';

// Helper function to determine action items based on context and user permissions
export const getActionItems = ({
  context,
  role,
  currentUserRole,
  isCurrentUser,
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

  const editMyProfile = {
    label: _(ACTION_EDIT_MY_PROFILE),
    onClick: () => navigate('/dashboard/profile'),
  };
  const editOrgRole = {
    label: _(ACTION_EDIT_ORG_ROLE),
    onClick: onEditOrgRole,
  };

  if (context === ORGANIZATION_CONTEXT) {
    if (isCurrentUser) {
      if (role === ROLE_OWNER) {
        return [editMyTitle];
      }
      return [editMyTitle, remove];
    }
    return [remove];
  } else {
    if (isCurrentUser) {
      if (role === ROLE_OWNER) {
        return [editMyProfile, editOrgRole];
      }
      return [editMyProfile, editOrgRole, remove];
    }
    return [remove];
  }
};
