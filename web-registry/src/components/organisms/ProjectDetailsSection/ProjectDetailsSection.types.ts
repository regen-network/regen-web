import {
  Maybe,
  ProjectDetailsCard,
  ProjectDetailsSection,
} from 'generated/sanity-graphql';

export type ProjectDetailsSectionProps = {
  header?: Maybe<ProjectDetailsSection>;
  credibilityCards?: Maybe<Array<Maybe<ProjectDetailsCard>>>;
};
