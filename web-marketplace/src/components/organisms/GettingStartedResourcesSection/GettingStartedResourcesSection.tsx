import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

import { GettingStartedResourcesCard } from 'web-components/src/components/cards/GettingStartedResourcesCard';
import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Theme } from 'web-components/src/theme/muiTheme';
import { getLinkTarget } from 'web-components/src/utils/linkTarget';

import { GettingStartedResourcesSectionFieldsFragment } from 'generated/sanity-graphql';
import { getBtnHref } from 'lib/button';
import { getSanityImgSrc } from 'lib/imgSrc';

import { Link } from 'components/atoms';

import { useSectionStyles } from './GettingStartedResourcesSection.styles';

const GettingStartedResourcesSection: React.FC<
  React.PropsWithChildren<{
    section: GettingStartedResourcesSectionFieldsFragment;
  }>
> = ({ section }) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classes } = useSectionStyles();

  return (
    <Section
      visibleOverflow
      title={section.header || 'Resources for Getting Started'}
      sx={{ root: { pb: { xs: 20, sm: 30 } } }}
      classes={{ title: classes.title }}
    >
      <ResponsiveSlider
        visibleOverflow
        mobileItemWidth="80%"
        infinite={false}
        slidesToShow={isMobile ? 1 : 2}
        classes={{ root: classes.root }}
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
    </Section>
  );
};

export { GettingStartedResourcesSection };
