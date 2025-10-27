import type { AccountByIdQuery } from 'generated/graphql';
import { AccountType } from 'generated/graphql';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  INVITE_MEMBERS,
  INVITE_MEMBERS_FORM_ID,
  MIGRATE_PROJECTS,
  MIGRATE_PROJECTS_FORM_ID,
  MIGRATE_PROJECTS_TITLE,
  ORG_PROFILE,
  ORGANIZATION_PROFILE_FORM_ID,
  PERSONAL_INFO,
  PERSONAL_INFO_FORM_ID,
} from './CreateOrganization.constants';

export const hasTransferableProfile = (
  account?: AccountByIdQuery['accountById'],
): boolean => {
  if (!account) return false;
  if (account.type !== AccountType.Organization) return false;

  return Boolean(
    account.name?.trim() ||
      account.description?.trim() ||
      account.image?.trim() ||
      account.bgImage?.trim() ||
      account.websiteLink?.trim() ||
      account.twitterLink?.trim(),
  );
};

export const getCreateOrgSteps = (
  _: TranslatorType,
  hasProjects: boolean,
  showPersonalInfoStep = true,
) =>
  (
    [
      {
        id: ORGANIZATION_PROFILE_FORM_ID,
        name: _(ORG_PROFILE),
        title: _(ORG_PROFILE),
      },
      {
        id: MIGRATE_PROJECTS_FORM_ID,
        name: _(MIGRATE_PROJECTS),
        title: _(MIGRATE_PROJECTS_TITLE),
      },
      {
        id: PERSONAL_INFO_FORM_ID,
        name: _(PERSONAL_INFO),
        title: _(PERSONAL_INFO),
      },
      {
        id: INVITE_MEMBERS_FORM_ID,
        name: _(INVITE_MEMBERS),
        title: _(INVITE_MEMBERS),
      },
    ] as const
  ).filter(step => {
    if (step.id === MIGRATE_PROJECTS_FORM_ID) {
      return hasProjects;
    }
    if (step.id === PERSONAL_INFO_FORM_ID) {
      return showPersonalInfoStep;
    }
    return true;
  });
