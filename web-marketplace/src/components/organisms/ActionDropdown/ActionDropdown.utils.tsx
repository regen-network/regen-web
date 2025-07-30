import {
  ACTION_EDIT_MY_PROFILE,
  ACTION_EDIT_MY_TITLE,
  ACTION_EDIT_MY_USER_PROFILE,
  ACTION_EDIT_ORG_ROLE,
  ACTION_REMOVE,
} from '../Collaborators/Collaborators.constants';
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
    if (!isCurrentUser && currentUserRole !== 'admin') {
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
          disabled: isOnlyAdmin && role === 'admin',
        },
      ];
    } else {
      return [
        {
          label: _(ACTION_REMOVE),
          onClick: onRemove,
          danger: true,
          disabled: isOnlyAdmin && role === 'admin',
        },
      ];
    }
  }

  // Project context
  if (currentUserRole !== 'admin' && !isCurrentUser) {
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
    if (isCurrentUser && role === 'admin' && orgRole) {
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
      (role === 'viewer' || role === 'author' || role === 'editor')
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
