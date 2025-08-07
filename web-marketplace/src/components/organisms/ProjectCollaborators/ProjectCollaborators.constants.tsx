import { msg } from '@lingui/macro';

export const YOU = msg`(you)`;

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
export const ACTION_REMOVE = msg`Remove`;
export const TOOLTIP_ONLY_ADMIN_REMOVE = msg`As the only admin, you can’t change your role or remove yourself without adding another admin to this organization.`;
export const ACTION_EDIT_MY_PROFILE = msg`Edit my profile`;
export const ACTION_EDIT_ORG_ROLE = msg`Edit organization role`;
export const ACTION_EDIT_MY_TITLE = msg`Edit my title`;
export const COLLABORATOR_ACTIONS_ARIA_LABEL = msg`Collaborator actions`;
export const SELECT_ROLE_ARIA_LABEL = msg`Select role`;
