import React from 'react';

import Section from 'web-components/lib/components/section';

import { GettingStartedResourcesSectionFieldsFragment } from 'generated/sanity-graphql';
import { BridgeInfo } from 'generated/sanity-graphql';

const GettingStartedResourcesSection: React.FC<
  React.PropsWithChildren<{
    section: GettingStartedResourcesSectionFieldsFragment;
  }>
> = ({ section }) => {
  return (
    <SliderSection
        title={section.header || 'Resources for Getting Started'}
        items={
          items?.map((item, i) => (
            <ArticleCard
              className={styles.card}
              key={i}
              url={item?.href || ''}
              name={item?.title || ''}
              author={item?.author || ''}
              type={item?.type || ''}
              imgSrc={getSanityImgSrc(item?.image)}
              date={getFormattedDate(item?.date)}
              play={item?.type === 'video'}
            />
          )) || []
        }
      />
  );
};

export { GettingStartedResourcesSection };
