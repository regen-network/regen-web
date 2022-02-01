import React from 'react';

import { SliderSection } from 'web-components/lib/components/section/SliderSection';
import { ResourceFieldsFragment, Maybe } from '../../generated/sanity-graphql';
import { WrappedResourcesCard } from '../atoms/WrappedResourcesCard';

interface ProjectImpactProps {
  resources?: Maybe<Array<Maybe<ResourceFieldsFragment>>>;
  title?: string;
  classes?: {
    root?: string;
    titleWrap?: string;
  };
}

function ResourcesSection({
  resources,
  title,
  classes,
}: ProjectImpactProps): JSX.Element {
  return (
    <div>
      <SliderSection
        classes={classes}
        title={title || 'Resources'}
        items={
          resources?.map(resource => (
            <WrappedResourcesCard resource={resource} />
          )) || []
        }
      />
    </div>
  );
}

export { ResourcesSection };
