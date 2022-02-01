import React from 'react';

import ProjectImpactCard from 'web-components/lib/components/cards/ProjectImpactCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';
import { BlockContent } from 'web-components/lib/components/block-content';

import {
  EcologicalImpactRelation,
  Maybe,
} from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

interface ProjectImpactProps {
  impacts?: Maybe<Array<Maybe<EcologicalImpactRelation>>>;
  title?: string;
  classes?: {
    root?: string;
  };
}

function ImpactSection({
  impacts,
  title,
  classes,
}: ProjectImpactProps): JSX.Element {
  return (
    <SliderSection
      classes={classes}
      title={title || 'Impact'}
      items={
        impacts?.map((impact, index) => (
          <ProjectImpactCard
            key={index}
            name={impact?.ecologicalImpact?.name || ''}
            description={
              <BlockContent
                content={impact?.ecologicalImpact?.descriptionRaw}
              />
            }
            imgSrc={getSanityImgSrc(impact?.ecologicalImpact?.image)}
            monitored={impact?.primary ? true : false}
          />
        )) || []
      }
    />
  );
}

export { ImpactSection };
