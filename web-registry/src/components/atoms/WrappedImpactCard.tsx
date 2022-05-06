import React from 'react';

import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import { BlockContent } from 'web-components/lib/components/block-content';
import {
  EcologicalOutcomeFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

/**
 * ImpactCard wrapping content from Sanity
 */
const WrappedImpactCard: React.FC<{
  outcome: Maybe<EcologicalOutcomeFieldsFragment>;
}> = ({ outcome }) => {
  return (
    <ImpactCard
      name={outcome?.title || ''}
      imgSrc={getSanityImgSrc(outcome?.image)}
      description={<BlockContent content={outcome?.descriptionRaw} />}
      largeFontSize
    />
  );
};

export { WrappedImpactCard };
