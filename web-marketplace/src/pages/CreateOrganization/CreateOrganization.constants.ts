import { i18n } from '@lingui/core';
import { msg } from '@lingui/macro';

export const CREATE_ORG_FORM_ID = 'create-organization';

export const ORG_PROFILE = msg`Organization Profile`;
export const MIGRATE_PROJECTS = msg`Migrate Projects`;
export const PERSONAL_INFO = msg`Personal Info`;
export const INVITE_MEMBERS = msg`Invite Members`;

export const CREATE_ORG_STEPS = [
  { id: 'organization-profile', name: i18n._(ORG_PROFILE), title: i18n._(ORG_PROFILE) },
  { id: 'migrate-projects', name: i18n._(MIGRATE_PROJECTS), title: i18n._(MIGRATE_PROJECTS) },
  { id: 'personal-info', name: i18n._(PERSONAL_INFO), title: i18n._(PERSONAL_INFO) },
  { id: 'invite-members', name: i18n._(INVITE_MEMBERS), title: i18n._(INVITE_MEMBERS) },
] as const;

export type CreateOrgInitialValues = { };
export const CREATE_ORG_INITIAL_VALUES: CreateOrgInitialValues = {};
