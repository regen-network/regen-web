import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import { GettingStartedResourcesCard } from 'web-components/lib/components/cards/GettingStartedResourcesCard';
import { SliderSection } from 'web-components/lib/components/section/SliderSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import { getLinkTarget } from 'web-components/lib/utils/linkTarget';

import { GettingStartedResourcesSectionFieldsFragment } from 'generated/sanity-graphql';
import { getBtnHref } from 'lib/button';
import { getSanityImgSrc } from 'lib/imgSrc';

import { Link } from 'components/atoms';

const GettingStartedResourcesSection: React.FC<
  React.PropsWithChildren<{
    section: GettingStartedResourcesSectionFieldsFragment;
  }>
> = ({ section }) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SliderSection
      title={section.header || 'Resources for Getting Started'}
      // titleAlign={isMobile ? 'left' : 'center'}
      slidesToShow={2}
      items={
        section.resourcesCards?.map((item, i) => (
          <GettingStartedResourcesCard
            // className={styles.card}
            key={i}
            header={item?.header || ''}
            description={item?.descriptionRaw || ''}
            imageUrl={getSanityImgSrc(item?.image)}
            mobileImageUrl={getSanityImgSrc(item?.mobileImage)}
            links={
              item?.links?.map(link => ({
                buttonText: link?.buttonText || '',
                buttonHref: getBtnHref(link),
                buttonTarget: getLinkTarget(link?.buttonBlankTarget),
              })) || []
            }
            linkComponent={Link}
          />
        )) || []
      }
    />
  );
};

export { GettingStartedResourcesSection };
