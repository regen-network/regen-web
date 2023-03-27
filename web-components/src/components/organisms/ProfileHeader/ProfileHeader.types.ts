import { LinkType } from '../../../types/shared/linkType';

export type ProfileVariant = 'individual' | 'organization';

export type ProfileInfos = {
  addressLink: LinkType;
  description?: string;
};
