import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

import { BlockContent } from 'web-components/lib/components/block-content';
import { CredibilityCard } from 'web-components/lib/components/cards/CredibilityCard/CredibilityCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { DetailsSectionButton } from './DetailsSection.Button';
import {
  VIEW_CREDIT_CLASS_DOC,
  VIEW_METHODOLOGY,
} from './DetailsSection.constants';
import { useSectionStyles } from './DetailsSection.styles';
import { DetailsSectionProps } from './DetailsSection.types';

export const DetailsSection: React.FC<
  React.PropsWithChildren<DetailsSectionProps>
> = ({ header, credibilityCards, methodology, creditClassDoc, children }) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classes } = useSectionStyles();

  const hasCredibilityCards = header && credibilityCards?.length;
  const hasClassInfo = header && (methodology || creditClassDoc);

  return (
    <Section visibleOverflow sx={{ root: { pb: [20, 21.25] } }}>
      {(hasCredibilityCards || hasClassInfo) && (
        <Box sx={{ pb: { xs: 7.5, sm: 12.5 } }}>
          <Label size="sm" mobileSize="sm" color="info.main">
            {header.label}
          </Label>
          <Title variant="h2" py={3}>
            {header.title}
          </Title>
          <Body size="lg" mobileSize="md" maxWidth={718}>
            <BlockContent content={header.descriptionRaw} />
          </Body>
          {hasClassInfo && (
            <Grid container pt={5} pr={{ xs: 11.25, tablet: 0 }} spacing={3}>
              {creditClassDoc && (
                <DetailsSectionButton
                  href={creditClassDoc['schema:url']}
                  label={VIEW_CREDIT_CLASS_DOC}
                />
              )}
              {methodology && (
                <DetailsSectionButton
                  href={methodology['schema:url']}
                  label={VIEW_METHODOLOGY}
                />
              )}
            </Grid>
          )}
        </Box>
      )}
      {children}
      {hasCredibilityCards && (
        <ResponsiveSlider
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
      )}
    </Section>
  );
};
