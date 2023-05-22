import Section from 'web-components/lib/components/section';
import { TitleBody } from 'web-components/lib/components/text-layouts';

import { useTitleDescriptionStyles } from './TitleDescriptionSection.styles';

import { PressKitTitleDescriptionSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  titleDescriptionSectionData?: PressKitTitleDescriptionSectionFieldsFragment['titleDescriptionSection'];
};

const TitleDescriptionSection = ({
  titleDescriptionSectionData,
}: Props): JSX.Element => {
  const { classes: styles } = useTitleDescriptionStyles();
  const content = titleDescriptionSectionData;
  return (
    <Section className={styles.root}>
      <TitleBody title={content?.title || ''} body={content?.bodyRaw} />
    </Section>
  );
};

export default TitleDescriptionSection;
