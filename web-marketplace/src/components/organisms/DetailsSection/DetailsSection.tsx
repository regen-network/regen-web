import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import { BlockContent } from 'web-components/lib/components/block-content';
import { CredibilityCard } from 'web-components/lib/components/cards/CredibilityCard/CredibilityCard';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import { Body, Label, Title } from 'web-components/lib/components/typography';
import { headerFontFamily, Theme } from 'web-components/lib/theme/muiTheme';

import { DetailsSectionButton } from './DetailsSection.Button';
import {
  CREDIT,
  VIEW_CREDIT_CLASS_DOC,
  VIEW_METHODOLOGY,
} from './DetailsSection.constants';
import { DetailsSectionCredit } from './DetailsSection.Credit';
import { useSectionStyles } from './DetailsSection.styles';
import { DetailsSectionProps } from './DetailsSection.types';

export const DetailsSection: React.FC<
  React.PropsWithChildren<DetailsSectionProps>
> = ({
  header,
  credibilityCards,
  methodology,
  creditClassDoc,
  credit,
  children,
  sx = [],
}) => {
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { classes } = useSectionStyles();

  const hasCredibilityCards = header && credibilityCards?.length;
  const hasClassInfo = header && (methodology || creditClassDoc);

  return (
    <div>
      <Section
        visibleOverflow
        sx={{ root: [{ pb: [20, 25] }, ...sxToArray(sx)] }}
      >
        {(hasCredibilityCards || hasClassInfo) && (
          <Grid
            container
            sx={{ pb: { xs: 7.5, sm: 12.5 } }}
            wrap="nowrap"
            flexDirection={{ xs: 'column', tablet: 'row' }}
          >
            <Grid item>
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
                <Grid
                  container
                  pt={5}
                  pr={{ xs: 11.25, tablet: 0 }}
                  spacing={3}
                >
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
            </Grid>
            {credit?.creditImage &&
              credit?.creditTypeImage &&
              credit?.creditTypeUnit && (
                <Grid item pt={{ xs: 7.5, tablet: 11.25 }}>
                  <Grid container justifyContent="space-evenly" wrap="nowrap">
                    <DetailsSectionCredit
                      src={credit.creditImage}
                      label={CREDIT}
                    />
                    <Grid
                      item
                      sx={{
                        background:
                          'linear-gradient(206deg, #7D9AA2 0%, #9AD3BE 50%, #D1E2C7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color': 'transparent',
                        '-moz-background-clip': 'text',
                        '-moz-text-fill-color': 'transparent',
                      }}
                      pt={{ xs: 4, sm: 4.5 }}
                      px={7.5}
                      fontSize={40}
                      fontFamily={headerFontFamily}
                    >
                      =
                    </Grid>
                    <DetailsSectionCredit
                      src={credit.creditTypeImage}
                      label={credit.creditTypeUnit}
                    />
                  </Grid>
                </Grid>
              )}
          </Grid>
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
    </div>
  );
};
