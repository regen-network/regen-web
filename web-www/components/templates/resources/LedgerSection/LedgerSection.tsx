import Section from 'web-components/lib/components/section';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import { Title } from 'web-components/lib/components/typography';

import { useLedgerStyles } from './LedgerSection.styles';

import {
  Resource,
  ResourcesLedgerSectionFieldsFragment,
} from '@/generated/sanity-graphql';
import { sanityResourcesToCardProps } from '@/lib/utils/sanity/sanity-transforms';

type Props = {
  ledgerSectionData?: ResourcesLedgerSectionFieldsFragment['ledgerSection'];
};

const LedgerSection = ({ ledgerSectionData }: Props): JSX.Element => {
  const { classes: styles } = useLedgerStyles();
  return (
    <Section className={styles.section}>
      <Title variant="h3" align="left" sx={{ mb: [8.5, 6.75] }}>
        {ledgerSectionData?.header}
      </Title>
      <ResourceCardsSlider
        items={sanityResourcesToCardProps(
          ledgerSectionData?.cards as Resource[],
        )}
      />
    </Section>
  );
};

export default LedgerSection;
