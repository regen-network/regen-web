import { msg } from '@lingui/macro';

export const ORGANIZATION_MEMBERS = msg`Organization Members`;
export const INVITE_MEMBERS = msg`Invite Members`;
export const ORGANIZATION_MEMBERS_DESCRIPTION = msg`Organization members have permissions for all projects associated with an organization`;
export const NAME = msg`NAME`;
export const ROLE = msg`ROLE`;
export const VISIBILITY_ON_PROFILE = msg`VISIBILITY ON PROFILE`;
export const EDIT_PROFILE = msg`EDIT PROFILE`;
export const PLEASE_CONTACT_ADMIN = msg`Please contact your administrator to change your role.`;
export const ONLY_ADMIN_CANNOT_CHANGE = msg`You are the only admin. You can’t change your role or remove yourself unless another admin is added.`;
export const PLEASE_CONTACT_ADMIN_VISIBILITY = msg`Please contact your administrator to change your visibility.`;
export const VISIBLE = msg`Visible`;
export const HIDDEN = msg`Hidden`;

export const ROLE_ADMIN_LABEL = msg`Admin`;
export const ROLE_ADMIN_DESCRIPTION = msg`Manages user access and has full control of projects, credits, and credit classes.`;

export const ROLE_EDITOR_LABEL = msg`Editor`;
export const ROLE_EDITOR_DESCRIPTION = msg`Has full control of projects and credit classes, but cannot manage users or credits.`;

export const ROLE_VIEWER_LABEL = msg`Viewer`;
export const ROLE_VIEWER_DESCRIPTION = msg`Can view all data across all projects, even when private.`;
