import React from 'react';

import { SliderSection } from 'web-components/lib/components/section/SliderSection';
<<<<<<< HEAD
import { ResourceFieldsFragment, Maybe } from '../../generated/sanity-graphql';
import { WrappedResourcesCard } from '../atoms/WrappedResourcesCard';
=======

import { Maybe, ResourceFieldsFragment } from 'generated/sanity-graphql';

import { WrappedResourcesCard } from 'components/atoms/WrappedResourcesCard';
>>>>>>> 92528156 (David/eslint simple import sort (#1075))

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
