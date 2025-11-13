export type CreateDaoParams = {
  name: string;
  description?: string;
  profileImage?: string | null;
  backgroundImage?: string | null;
  websiteLink?: string;
  twitterLink?: string;
  organizationId: string;
  type: 'organization' | 'project';
  projectId?: string;
  transferHandled: boolean;
};
