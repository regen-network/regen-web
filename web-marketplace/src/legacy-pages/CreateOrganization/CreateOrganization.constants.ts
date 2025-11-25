import { msg } from '@lingui/macro';

export const CREATE_ORGANIZATION_FORM_ID = 'create-organization';
export const ORGANIZATION_PROFILE_FORM_ID = 'organization-profile';
export const MIGRATE_PROJECTS_FORM_ID = 'migrate-projects';
export const PERSONAL_INFO_FORM_ID = 'personal-info';
export const INVITE_MEMBERS_FORM_ID = 'invite-members';

export const ORG_PROFILE = msg`Organization Profile`;
export const MIGRATE_PROJECTS = msg`Migrate Projects`;
export const MIGRATE_PROJECTS_TITLE = msg`Migrate Projects from Personal Account`;
export const PERSONAL_INFO = msg`Personal Info`;
export const INVITE_MEMBERS = msg`Invite Members`;
export const CREATE_ORG_DEFAULT_USER = msg`User`;
export const CREATE_ORG_FINISH_LABEL = msg`Finish`;
export const CREATE_ORG_CLOSE_ARIA_LABEL = msg`close create organization`;
export const CREATE_ORG_ALREADY_IN_ORG_MESSAGE = msg`You already belong to an organization. Please manage your existing organization from your dashboard.`;
export const CREATE_ORG_DISCARD_TITLE = msg`Are you sure you want to discard your changes?`;
export const CREATE_ORG_DISCARD_DESCRIPTION = msg`If you proceed, you will lose all the unsaved changes you made. This cannot be undone.`;
export const CREATE_ORG_CANCEL_LABEL = msg`CANCEL`;
export const CREATE_ORG_CONFIRM_DISCARD_LABEL = msg`YES, DISCARD`;
export const CREATE_ORG_TRANSFER_MODAL_TITLE = msg`Transfer organization profile data from your personal account to your new organization profile?`;
export const CREATE_ORG_TRANSFER_MODAL_DESCRIPTION = msg`You can edit this profile data on the next step.`;
export const CREATE_ORG_TRANSFER_MODAL_SECTION_TITLE = msg`Data will be transferred from this profile:`;
export const CREATE_ORG_TRANSFER_MODAL_SKIP_LABEL = msg`SKIP`;
export const CREATE_ORG_TRANSFER_MODAL_CONFIRM_LABEL = msg`YES, TRANSFER PROFILE`;
export const CREATE_ORG_ORGANIZATION_NAME_LABEL = msg`Organization Name`;
export const CREATE_ORG_MIGRATE_PROJECTS_DESCRIPTION = msg`If you would like to migrate your personal account projects to your new organization, select the projects below. This is optional.`;
export const CREATE_ORG_MIGRATE_PROJECTS_NOTE = msg`Note: Migrating a project will also migrate all of its tradable credits and active sell orders.`;
export const CREATE_ORG_PERSONAL_INFO_DESCRIPTION = msg`Provide personal contact information for this organization.`;
export const CREATE_ORG_PERSONAL_INFO_NAME_LABEL = msg`Name`;
export const CREATE_ORG_PERSONAL_INFO_EMAIL_LABEL = msg`Email address`;
export const CREATE_ORG_PERSONAL_INFO_EMAIL_HELPER = msg`An email is required to send you notifications related to your organization.`;
export const CREATE_ORG_PERSONAL_INFO_NAME_REQUIRED = msg`Contact name is required.`;
export const CREATE_ORG_INVITE_MEMBERS_DESCRIPTION = msg`Invite teammates to collaborate on your organization.`;
export const CREATE_ORG_WALLET_REQUIRED_ERROR = msg`A connected wallet is required to create an organization.`;
export const CREATE_ORG_SIGNING_CLIENT_ERROR = msg`Failed to initialize signing client`;
export const CREATE_ORG_ACTIVE_ACCOUNT_REQUIRED_ERROR = msg`Active account is required to create an organization.`;
export const CREATE_ORG_ORGANIZATION_ID_REQUIRED_ERROR = msg`An organization id is required to migrate projects`;
export const CREATE_ORG_DAO_ADDRESS_REQUIRED_ERROR = msg`An organization DAO address is required to migrate projects`;
export const CREATE_ORG_EMAIL_PENDING_MESSAGE = msg`Please confirm your email to continue.`;
export const CREATE_ORG_CW_ADMIN_FACTORY_ADDRESS_ERROR = msg`CW Admin Factory address is not configured.`;

export type CreateOrgInitialValues = {};
export const CREATE_ORG_INITIAL_VALUES: CreateOrgInitialValues = {};
export const CAP_AMOUNT_TO_SEND = 100000000n; // 100 REGEN
