import {
  DetailsSection,
  Maybe,
  ProjectDetailsCard,
} from 'generated/sanity-graphql';

export interface DetailsSectionProps {
  header?: Maybe<DetailsSection>;
  credibilityCards?: Maybe<Array<Maybe<ProjectDetailsCard>>>;
}
