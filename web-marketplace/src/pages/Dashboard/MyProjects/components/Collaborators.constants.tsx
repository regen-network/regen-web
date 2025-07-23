import { msg } from '@lingui/macro';

export const YOU = msg`(you)`;
export const ORG_MEMBER_SETTINGS = msg`(organization member settings)`;
export const ORG_ADMIN = msg`This user is an organization admin and cannot be
                          downgraded on the project level unless you change
                          their role within the`;
export const ORG_EDITOR = msg`This user is an organization editor and cannot be
                          downgraded on the project level unless you change
                          their role within the`;
export const TOOLTIP_ROLE = msg`Please contact your administrator to change your role.`;

export const ADMIN_DESCRIPTION = msg`Manages user access and can edit all project info and project credits.`;
export const EDITOR_DESCRIPTION = msg`Can edit all project page info and posts. Cannot manage users or credits.`;
export const AUTHOR_DESCRIPTION = msg`Can edit all project page info and posts. Cannot manage users or credits.`;
export const VIEWER_DESCRIPTION = msg`Can view all project info and posts.`;
export const SEE_HELP_DOCS = msg`SEE HELP DOCS`;
