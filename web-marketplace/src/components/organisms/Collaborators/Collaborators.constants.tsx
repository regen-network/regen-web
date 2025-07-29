import { msg } from '@lingui/macro';

export const YOU = msg`(you)`;
export const ORG_MEMBER_SETTINGS = msg` organization member settings`;
export const ORG_ADMIN = msg`This user is an organization admin and cannot be
                          downgraded on the project level unless you change
                          their role within the`;
export const ORG_EDITOR = msg`This user is an organization editor and cannot be
                          downgraded on the project level unless you change
                          their role within the`;
export const TOOLTIP_ROLE = msg`Please contact your administrator to change your role.`;
export const TOOLTIP_EXTERNAL_ADMIN = msg`External admins cannot change the role of other admins.`;
export const TOOLTIP_ONLY_ADMIN = msg`You are the only admin. You can’t change your role unless another admin is added.`;

export const ROLE_ADMIN_LABEL = msg`Admin`;
export const ROLE_ADMIN_DESCRIPTION = msg`Manages user access and can edit all project info and project credits.`;

export const ROLE_EDITOR_LABEL = msg`Editor`;
export const ROLE_EDITOR_DESCRIPTION = msg`Can edit all project page info and posts. Cannot manage users or credits.`;

export const ROLE_AUTHOR_LABEL = msg`Author`;
export const ROLE_AUTHOR_DESCRIPTION = msg`Can create, edit, and delete their own data posts. Cannot see private post data.`;

export const ROLE_VIEWER_LABEL = msg`Viewer`;
export const ROLE_VIEWER_DESCRIPTION = msg`Can view all posts, documents, and location data, even when private.`;

export const PROJECT_COLLABORATORS = msg`Project Collaborators`;
export const INVITE_COLLABORATORS = msg`Invite Collaborators`;
export const INVITE = msg`Invite`;
export const COLLABORATORS_DESCRIPTION = msg`Collaborators can manage the project page, posts, and credits, but aren’t visible publicly.`;
export const NAME = msg`NAME`;
export const ROLE = msg`ROLE`;
export const EDIT_PROFILE = msg`EDIT PROFILE`;
export const SEE_HELP_DOCS = msg`SEE HELP DOCS`;
