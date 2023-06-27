import { Party } from 'web-components/lib/components/user/UserInfo';

import {
  Maybe,
  ProjectDetailsCard,
  ProjectDetailsSection,
} from 'generated/sanity-graphql';

export interface ProjectDetailsSectionProps
  extends Omit<ProjectDetailsSectionStakeholdersProps, 'projectAdmin'> {
  header?: Maybe<ProjectDetailsSection>;
  credibilityCards?: Maybe<Array<Maybe<ProjectDetailsCard>>>;
  adminAddr?: string;
}

export type ProjectDetailsSectionStakeholdersProps = {
  projectAdmin?: Party;
  projectDeveloper?: Party;
  projectVerifier?: Party;
  program?: Party;
};
