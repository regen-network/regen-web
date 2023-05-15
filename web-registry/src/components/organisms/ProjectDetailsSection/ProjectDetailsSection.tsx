import { BlockContent } from 'web-components/lib/components/block-content';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { ProjectDetailsSectionProps } from './ProjectDetailsSection.types';

export const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({
  header,
  credibilityCards,
}) => {
  return header && credibilityCards?.length ? (
    <Section>
      <Label size="sm" mobileSize="sm" color="info.main">
        {header.label}
      </Label>
      <Title variant="h2" py={3}>
        {header.title}
      </Title>
      <Body size="lg" mobileSize="md">
        <BlockContent content={header.descriptionRaw} />
      </Body>
    </Section>
  ) : null;
};
