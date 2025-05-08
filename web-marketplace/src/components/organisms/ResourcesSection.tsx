import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { SliderSection } from 'web-components/src/components/section/SliderSection';

import { Maybe, ResourceFieldsFragment } from 'generated/sanity-graphql';

import { WrappedResourcesCard } from 'components/atoms/WrappedResourcesCard';

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
  const { _ } = useLingui();

  return (
    <div>
      <SliderSection
        classes={classes}
        title={title || _(msg`Resources`)}
        items={
          resources?.map((resource, i) => (
            <WrappedResourcesCard
              key={resource?.lastUpdated + i}
              resource={resource}
            />
          )) || []
        }
      />
    </div>
  );
}

export { ResourcesSection };
