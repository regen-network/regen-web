import React from 'react';

import ProjectImpactCard, {
  ProjectImpactCardProps as Impact,
} from 'web-components/lib/components/cards/ProjectImpactCard';
import { getOptimizedImageSrc } from 'web-components/lib/utils/optimizedImageSrc';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';

interface ProjectImpactProps {
  impacts: Impact[];
  title?: string;
  classes?: {
    root?: string;
  };
}

function ImpactSection({ impacts, title, classes }: ProjectImpactProps): JSX.Element {
  const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
  const apiServerUrl = process.env.REACT_APP_API_URI;

  return (
    <SliderSection
      classes={classes}
      title={title || 'Impact'}
      items={impacts.map((impact, index) => (
        <ProjectImpactCard
          key={index}
          name={impact.name}
          description={impact.description}
          imgSrc={getOptimizedImageSrc(impact.imgSrc, imageStorageBaseUrl, apiServerUrl)}
          monitored={impact.monitored}
        />
      ))}
    />
  );
}

export { ImpactSection };
