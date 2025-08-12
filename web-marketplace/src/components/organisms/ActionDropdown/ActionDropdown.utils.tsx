import { ORGANIZATION_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import {
  ACTION_EDIT_MY_PROFILE,
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
  navigate,
  _,
}: GetActionItemsParams): ActionItem[] => {
  // Only owner or admins can manage other members
  if (
    !isCurrentUser &&
    currentUserRole !== ROLE_ADMIN &&
    currentUserRole !== ROLE_OWNER
  ) {
    return [];
  }

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

  const currentUserActions =
    context === ORGANIZATION_CONTEXT
      ? [editMyProfile]
      : [editMyProfile, editOrgRole];

  if (isCurrentUser) {
    if (role !== ROLE_ADMIN) {
      return currentUserActions;
    }
    return [...currentUserActions, remove];
  }
  if (role === ROLE_OWNER) {
    return [];
  }
  return [remove];
};
