import { msg } from '@lingui/macro';

export const ORGANIZATION_MEMBERS = msg`Organization Members`;
export const INVITE_MEMBERS = msg`Invite Members`;
export const ORGANIZATION_MEMBERS_DESCRIPTION = msg`Organization members have permissions for all projects associated with an organization`;
export const NAME = msg`NAME`;
export const ROLE = msg`ROLE`;
export const VISIBILITY_ON_PROFILE = msg`VISIBILITY ON PROFILE`;
export const EDIT_PROFILE = msg`EDIT PROFILE`;
export const PLEASE_CONTACT_ADMIN_VISIBILITY = msg`Please contact your administrator to change your visibility.`;
export const VISIBLE = msg`Visible`;
export const HIDDEN = msg`Hidden`;

export const ROLE_OWNER_LABEL = msg`Owner`;
export const ROLE_OWNER_DESCRIPTION = msg`If you reassign the owner role to this user, you will be downgraded to Admin.`;

export const ROLE_ADMIN_LABEL = msg`Admin`;
export const ROLE_ADMIN_DESCRIPTION = msg`Manages user access and has full control of projects, credits, and credit classes.`;

export const ROLE_EDITOR_LABEL = msg`Editor`;
export const ROLE_EDITOR_DESCRIPTION = msg`Has full control of projects and credit classes, but cannot manage users or credits.`;

export const ROLE_VIEWER_LABEL = msg`Viewer`;
export const ROLE_VIEWER_DESCRIPTION = msg`Can view all data across all projects, even when private.`;

// Invite Member Modal
export const ADD_MEMBER_LABEL = msg`Add a member`;
export const ROLE_LABEL = msg`Role`;
export const CHOOSE_ROLE_HELP = msg`Choose a role`;
export const CHOOSE_A_ROLE_FOR_THIS_USER = msg`Choose a role for this user`;
export const EMAIL_OR_ADDRESS_LABEL = msg`Email or REGEN address`;
export const ADMIN_EDITOR_RULE = msg`Admins or editors must be invited via a REGEN address`;
export const REGEN_ADDRESS_LABEL = msg`REGEN address`;
export const ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER = msg`Enter email or address`;
export const VISIBLE_QUESTION = msg`Is this member visible on the organization page?`;
export const VISIBLE_DESCRIPTION = msg`If marked visible, this user will be shown on the ‘members’ tab of your organization page once they have accepted their invite and added a name.`;
export const CANCEL_LABEL = msg`CANCEL`;
export const INVITE_LABEL = msg`Invite`;
// Remove Member Modal
export const REMOVE_MEMBER_TITLE = msg`Are you sure you want to remove this member from your organization?`;
export const REMOVE_MEMBER_DESCRIPTION = msg`Any posts they have created or signed will remain.`;
export const REMOVE_CONFIRM_LABEL = msg`Yes, Remove`;
export const MEMBER_REMOVED_BANNER = msg`Member has been removed from your organization.`;
