export type CreateDaoParams = {
  name: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  websiteLink?: string;
  twitterLink?: string;
  organizationId: string;
  currentAccountId: string;
};

export type CreateDaoResult = {
  daoAddress: string;
  votingModuleAddress: string;
  cw4GroupAddress: string;
  rbamAddress: string;
  transactionHash: string;
  organizationId: string;
};
