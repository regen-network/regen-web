import {
  ACTION_EDIT_MY_PROFILE,
  ACTION_EDIT_MY_TITLE,
  ACTION_EDIT_MY_USER_PROFILE,
  ACTION_EDIT_ORG_ROLE,
  ACTION_REMOVE,
} from '../Collaborators/Collaborators.constants';
import {
  ROLE_ADMIN,
  ROLE_AUTHOR,
  ROLE_EDITOR,
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
  isOnlyAdmin,
  onRemove,
  onEditOrgRole,
  onEditTitle,
  navigate,
  _,
}: GetActionItemsParams): ActionItem[] => {
  if (context === 'members') {
    if (!isCurrentUser && currentUserRole !== ROLE_ADMIN) {
      return [];
    }

    if (isCurrentUser) {
      return [
        {
          label: _(ACTION_EDIT_MY_USER_PROFILE),
          onClick: () => navigate('/dashboard/profile'),
        },
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
          disabled: isOnlyAdmin && role === ROLE_ADMIN,
        },
      ];
    } else {
      return [
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
          disabled: isOnlyAdmin && role === ROLE_ADMIN,
        },
      ];
    }
  }

  // Project context
  if (currentUserRole !== ROLE_ADMIN && !isCurrentUser) {
    return [];
  }

  if (isExternalAdmin) {
    if (isCurrentUser) {
      return [
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
        },
        {
          label: _(ACTION_EDIT_MY_TITLE),
          onClick: onEditTitle,
        },
      ];
    } else if (!orgRole) {
      return [
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
        },
      ];
    }
  } else {
    if (isCurrentUser && role === ROLE_ADMIN && orgRole) {
      return [
        {
          label: _(ACTION_EDIT_ORG_ROLE),
          onClick: onEditOrgRole,
        },
        {
          label: _(ACTION_EDIT_MY_TITLE),
          onClick: onEditTitle,
        },
      ];
    } else if (
      isCurrentUser &&
      (role === ROLE_VIEWER || role === ROLE_AUTHOR || role === ROLE_EDITOR)
    ) {
      return [
        {
          label: _(ACTION_EDIT_MY_PROFILE),
          onClick: () => navigate('/dashboard/profile'),
        },
      ];
    } else if (orgRole !== '') {
      return [
        {
          label: _(ACTION_EDIT_ORG_ROLE),
          onClick: onEditOrgRole,
        },
      ];
    } else {
      return [
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
        },
      ];
    }
  }

  return [];
};
