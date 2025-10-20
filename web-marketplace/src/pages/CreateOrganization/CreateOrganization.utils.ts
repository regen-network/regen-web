import type { AccountByIdQuery, Maybe } from 'generated/graphql';
import { AccountType } from 'generated/graphql';

export type AccountAssignmentNode = {
  roleName?: string | null;
  visible?: boolean | null;
  daoAddress?: string | null;
  organizationName?: string | null;
};

type DaoAssignmentNode = {
  roleName?: string | null;
  visible?: boolean | null;
  accountId?: Maybe<string>;
};

type DaoNode = {
  address?: Maybe<string>;
  organizationByDaoAddress?: Maybe<{
    name?: Maybe<string>;
  }>;
  assignmentsByDaoAddress?: Maybe<{
    nodes?: Maybe<Array<Maybe<DaoAssignmentNode>>>;
  }>;
};

export const getVisibleOrganizationAssignments = (
  account?: AccountByIdQuery['accountById'],
): AccountAssignmentNode[] => {
  if (!account || !('daosByAssignmentAccountIdAndDaoAddress' in account))
    return [];

  const nodes =
    (
      account as {
        daosByAssignmentAccountIdAndDaoAddress?: {
          nodes?: Array<DaoNode | null>;
        };
      }
    ).daosByAssignmentAccountIdAndDaoAddress?.nodes ?? [];

  const visibleAssignments = (nodes.filter(Boolean) as DaoNode[])
    .map(dao => {
      if (!dao.address || !dao.organizationByDaoAddress?.name) return null;

      const assignments =
        dao.assignmentsByDaoAddress?.nodes ??
        ([] as Array<Maybe<DaoAssignmentNode>>);

      const accountAssignment = assignments.find(
        assignment =>
          assignment?.accountId === account.id && assignment?.visible,
      );

      if (!accountAssignment) return null;

      return {
        roleName: accountAssignment.roleName,
        visible: accountAssignment.visible,
        daoAddress: dao.address,
        organizationName: dao.organizationByDaoAddress.name,
      };
    })
    .filter(Boolean) as AccountAssignmentNode[];

  return visibleAssignments;
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
