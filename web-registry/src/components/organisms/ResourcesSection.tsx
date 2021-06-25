import React from 'react';

import ResourcesCard, { ResourcesCardProps } from 'web-components/lib/components/cards/ResourcesCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';

interface ProjectImpactProps {
  resources: ResourcesCardProps[];
  title?: string;
  classes?: {
    root?: string;
    titleWrap?: string;
  };
}

function ResourcesSection({ resources, title, classes }: ProjectImpactProps): JSX.Element {
  return (
    <div>
      <SliderSection
        classes={classes}
        title={title || 'Resources'}
        items={resources.map((resource, index) => (
          <ResourcesCard
            target={resource.target || '_self'}
            title={resource.title}
            description={resource.description}
            image={resource.image}
            buttonText={resource.buttonText}
            link={resource.link}
          />
        ))}
      />
    </div>
  );
}

export { ResourcesSection };
