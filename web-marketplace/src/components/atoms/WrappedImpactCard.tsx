import React from 'react';

import { BlockContent } from 'web-components/src/components/block-content';
import ImpactCard from 'web-components/src/components/cards/ImpactCard';

import {
  EcologicalOutcomeFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
import { getSanityImgSrc } from '../../lib/imgSrc';

/**
 * ImpactCard wrapping content from Sanity
 */
const WrappedImpactCard: React.FC<
  React.PropsWithChildren<{
    outcome: Maybe<EcologicalOutcomeFieldsFragment>;
  }>
> = ({ outcome }) => {
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
