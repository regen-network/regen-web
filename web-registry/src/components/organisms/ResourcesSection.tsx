import React from 'react';

import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';
import { Resource } from '../../mocks/cms-duplicates';

interface ProjectImpactProps {
  resources: Resource[];
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
        items={resources.map(resource => (
          <ResourcesCard
            key={resource.title}
            target={resource?.target || '_self'}
            title={resource.title}
            description={resource.description}
            image={{ publicURL: resource.imgSrc }}
            buttonText={resource?.btnText}
            link={resource.href}
          />
        ))}
      />
    </div>
  );
}

export { ResourcesSection };
