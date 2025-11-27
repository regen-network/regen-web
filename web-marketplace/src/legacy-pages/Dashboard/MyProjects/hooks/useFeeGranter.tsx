import { ProjectFieldsFragment } from 'generated/graphql';

import { useDaoOrganization } from 'hooks/useDaoOrganization';

type UseFeeGranterParams = {
  offChainProject?: ProjectFieldsFragment | null;
};
export const useFeeGranter = ({ offChainProject }: UseFeeGranterParams) => {
  const dao = useDaoOrganization();
  // If user is external project collaborator (not part of org, only project)
  // he needs to pay for tx fees.
  // Else if user part of organization the project belongs to, fees are handled by organization through feegrant.
  const adminDao = offChainProject?.daoByAdminDaoAddress;
  const projectOrgId =
    offChainProject?.organizationProjectByProjectId?.organizationId;

  const feeGranter =
    adminDao?.address &&
    projectOrgId &&
    dao?.organizationByDaoAddress?.id === projectOrgId
      ? dao?.address
      : undefined;

  return feeGranter;
};
