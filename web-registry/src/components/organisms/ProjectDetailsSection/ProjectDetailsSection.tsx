import { Box, useMediaQuery, useTheme } from '@mui/material';

import { BlockContent } from 'web-components/lib/components/block-content';
import { CredibilityCard } from 'web-components/lib/components/cards/CredibilityCard/CredibilityCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { useSectionStyles } from './ProjectDetailsSection.styles';
import { ProjectDetailsSectionProps } from './ProjectDetailsSection.types';

export const ProjectDetailsSection: React.FC<ProjectDetailsSectionProps> = ({
  header,
  credibilityCards,
}) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classes } = useSectionStyles();

  return header && credibilityCards?.length ? (
    <Section visibleOverflow sx={{ root: { pb: [20, 21.25] } }}>
      <ResponsiveSlider
        renderTitle={() => (
          <Box>
            <Label size="sm" mobileSize="sm" color="info.main">
              {header.label}
            </Label>
            <Title variant="h2" py={3}>
              {header.title}
            </Title>
            <Body size="lg" mobileSize="md" maxWidth={718}>
              <BlockContent content={header.descriptionRaw} />
            </Body>
          </Box>
        )}
        visibleOverflow
        arrows
        mobileItemWidth="90%"
        itemWidth="85%"
        infinite={false}
        slidesToShow={isMobile ? 1 : 2}
        classes={{ headerWrap: classes.headerWrap }}
        padding={theme.spacing(2.5)}
        items={credibilityCards.map((card, index) => (
          <CredibilityCard
            index={index}
            title={card?.credibilityCard?.title as string}
            descriptionRaw={card?.credibilityCard?.descriptionRaw}
            icon={card?.credibilityCard?.icon?.asset?.url}
            claims={
              card?.claims?.map(claim => ({
                description: claim?.description as string,
              })) || []
            }
          />
        ))}
      />
    </Section>
  ) : null;
};
