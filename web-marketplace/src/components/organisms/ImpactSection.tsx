import React from 'react';

import { BlockContent } from 'web-components/src/components/block-content';
import ProjectImpactCard from 'web-components/src/components/cards/ProjectImpactCard/ProjectImpactCard';
import { SliderSection } from 'web-components/src/components/section/SliderSection';

import {
  EcologicalImpactRelation,
  Maybe,
} from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';
import {
  CO_BENEFIT,
  PRIMARY_IMPACT,
} from './ProjectTopSection/ProjectTopSection.constants';

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
            label={impact?.primary ? PRIMARY_IMPACT : CO_BENEFIT}
          />
        )) || []
      }
    />
  );
}

export { ImpactSection };
