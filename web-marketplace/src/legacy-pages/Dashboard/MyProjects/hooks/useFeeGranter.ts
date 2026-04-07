import { ProjectFieldsFragment } from 'generated/graphql';

import { useDaoOrganizations } from 'hooks/useDaoOrganizations';

type UseFeeGranterParams = {
  offChainProject?: ProjectFieldsFragment | null;
};
export const useFeeGranter = ({ offChainProject }: UseFeeGranterParams) => {
  const daos = useDaoOrganizations();
  // If user is external project collaborator (not part of org, only project)
  // he needs to pay for tx fees.
  // Else if user part of organization the project belongs to, fees are handled by organization through feegrant.
  const adminDao = offChainProject?.daoByAdminDaoAddress;
  const projectOrgId =
    offChainProject?.organizationProjectByProjectId?.organizationId;

  // Find the user's org that matches the project's org
  const matchingDao =
    adminDao?.address && projectOrgId
      ? daos.find(dao => dao?.organizationByDaoAddress?.id === projectOrgId)
      : undefined;

  return matchingDao?.address;
};
