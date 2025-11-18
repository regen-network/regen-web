/**
 * Organization context for creating credit batches
 * Used when creating batches from an organization dashboard
 */
export type CreateBatchOrganizationContext = {
  issuerAddress?: string;
  organizationDaoAddress?: string;
  organizationRbamAddress?: string;
  authorizationId?: number;
  roleId?: number;
};
