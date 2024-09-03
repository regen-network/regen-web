import Section from 'web-components/src/components/section';
import ResourceCardsSlider from 'web-components/src/components/sliders/ResourceCards';
import { Title } from 'web-components/src/components/typography';

import { useLedgerStyles } from './resourcesSection.styles';

import {
  Maybe,
  Resource,
  ResourceFieldsFragment,
} from '@/generated/sanity-graphql';
import { sanityResourcesToCardProps } from '@/lib/utils/sanity/sanity-transforms';
import { DRAFT_TEXT } from '@/lib/constants/shared.constants';

type Props = {
  resourceSectionData?: Maybe<ResourceFieldsFragment>;
};

const ResourcesSection = ({ resourceSectionData }: Props): JSX.Element => {
  const { classes: styles } = useLedgerStyles();
  return (
    <div className="topo-background-alternate">
      <Section className={styles.section}>
        <Title variant="h3" align="left" sx={{ mb: [8.5, 6.75] }}>
          {resourceSectionData?.header}
        </Title>
        <ResourceCardsSlider
          items={sanityResourcesToCardProps(
            resourceSectionData?.cards as Resource[],
          )}
          draftText={DRAFT_TEXT}
        />
      </Section>
    </div>
  );
};

export default ResourcesSection;
