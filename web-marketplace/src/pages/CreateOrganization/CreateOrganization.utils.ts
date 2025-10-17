import type { AccountByIdQuery } from 'generated/graphql';
import { AccountType } from 'generated/graphql';

export type AccountAssignmentNode = {
  roleName?: string | null;
  visible?: boolean | null;
  daoByDaoAddress?: {
    address?: string | null;
    organizationByDaoAddress?: {
      name?: string | null;
    } | null;
  } | null;
};

export const getVisibleOrganizationAssignments = (
  account?: AccountByIdQuery['accountById'],
): AccountAssignmentNode[] => {
  if (!account || !('assignmentsByAccountId' in account)) return [];

  const nodes =
    (
      account as {
        assignmentsByAccountId?: {
          nodes?: Array<AccountAssignmentNode | null>;
        };
      }
    ).assignmentsByAccountId?.nodes ?? [];

  return (nodes.filter(Boolean) as AccountAssignmentNode[]).filter(
    assignment =>
      assignment.visible &&
      assignment.daoByDaoAddress?.organizationByDaoAddress?.name,
  );
};

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
