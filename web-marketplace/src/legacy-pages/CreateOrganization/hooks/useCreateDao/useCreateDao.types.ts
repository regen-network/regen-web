export type CreateDaoParams = {
  name: string;
  description?: string;
  profileImage?: string;
  backgroundImage?: string;
  websiteLink?: string;
  twitterLink?: string;
  organizationId: string;
  type: 'organization' | 'project';
  projectId?: string;
};
