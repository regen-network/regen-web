import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useMediaQuery, useTheme } from '@mui/material';

import { GettingStartedResourcesCard } from 'web-components/src/components/cards/GettingStartedResourcesCard';
import { Root } from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

import { GettingStartedResourcesSectionFieldsFragment } from 'generated/sanity-graphql';
import { getBtnHref } from 'lib/button';
import { getSanityImgSrc } from 'lib/imgSrc';

import { Link } from 'components/atoms';

const GettingStartedResourcesSection: React.FC<
  React.PropsWithChildren<{
    section: GettingStartedResourcesSectionFieldsFragment;
  }>
> = ({ section }) => {
  const { _ } = useLingui();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="overflow-x-hidden pb-[80px] sm:pb-[120px]">
      <Root>
        <Title className="text-left sm:text-center" variant="h2" align="center">
          {section.header || _(msg`Resources for Getting Started`)}
        </Title>
      </Root>
      <ResponsiveSlider
        visibleOverflow
        mobileItemWidth="80%"
        infinite={false}
        slidesToShow={isMobile ? 1 : 2}
        items={
          section.resourcesCards?.map((item, i) => (
            <GettingStartedResourcesCard
              key={i}
              header={item?.header}
              description={item?.descriptionRaw}
              imageUrl={getSanityImgSrc(item?.image)}
              mobileImageUrl={getSanityImgSrc(item?.mobileImage)}
              links={
                item?.links?.map(link => ({
                  buttonText: link?.buttonText,
                  buttonHref: getBtnHref(link),
                  buttonTarget: getLinkTarget(link?.buttonBlankTarget),
                })) || []
              }
              linkComponent={Link}
            />
          )) || []
        }
      />
    </div>
  );
};

export { GettingStartedResourcesSection };
