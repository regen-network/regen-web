import { useLingui } from '@lingui/react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { sxToArray } from 'utils/mui/sxToArray';

import { BlockContent } from 'web-components/src/components/block-content';
import { CredibilityCard } from 'web-components/src/components/cards/CredibilityCard/CredibilityCard';
import Section from 'web-components/src/components/section';
import ResponsiveSlider from 'web-components/src/components/sliders/ResponsiveSlider';
import { Body, Label, Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';
import { cn } from 'web-components/src/utils/styles/cn';

import { IS_REGEN, IS_TERRASOS, MARKETPLACE_APP_URL } from 'lib/env';

import { Link } from 'components/atoms';

import { DetailsSectionButton } from './DetailsSection.Button';
import {
  CREDIT,
  TERRASOS_PROJECT_DESCRIPTION,
  TERRASOS_PROJECT_LINK_TEXT,
  VIEW_CREDIT_CLASS_DOC,
  VIEW_METHODOLOGY,
} from './DetailsSection.constants';
import { DetailsSectionCredit } from './DetailsSection.Credit';
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
  projectId,
  sx = [],
}) => {
  const { _ } = useLingui();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const hasCredibilityCards = header && credibilityCards?.length;
  const hasClassInfo = header && (methodology || creditClassDoc);
  const isSectionDisplayed = hasCredibilityCards || hasClassInfo || !!children;

  return (
    <>
      {isSectionDisplayed && (
        <div className="overflow-x-hidden pb-[80px] sm:pb-[100px]">
          <Section visibleOverflow sx={{ root: [...sxToArray(sx)] }}>
            {(hasCredibilityCards || hasClassInfo) && (
              <Grid
                container
                sx={{ pb: { xs: 7.5, sm: 12.5 } }}
                wrap="nowrap"
                flexDirection={{ xs: 'column', tablet: 'row' }}
                justifyContent="space-between"
              >
                <Grid item>
                  <Label size="sm" mobileSize="sm" color="info.main">
                    {header.label}
                  </Label>
                  <Title variant="h2" py={3}>
                    {header.title}
                  </Title>
                  <Body
                    size="lg"
                    mobileSize="md"
                    className={cn(
                      'relative z-10',
                      IS_REGEN && 'max-w-[600px] xl:max-w-[718px]',
                      IS_TERRASOS && 'max-w-[718px]',
                    )}
                  >
                    {IS_REGEN ? (
                      <BlockContent content={header.descriptionRaw} />
                    ) : (
                      <div>
                        {_(TERRASOS_PROJECT_DESCRIPTION)}
                        <Link
                          href={`${MARKETPLACE_APP_URL}/project/${projectId}`}
                          className="ml-3"
                        >
                          {_(TERRASOS_PROJECT_LINK_TEXT)}
                        </Link>
                      </div>
                    )}
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
                          label={_(VIEW_CREDIT_CLASS_DOC)}
                        />
                      )}
                      {methodology && (
                        <DetailsSectionButton
                          href={methodology['schema:url']}
                          label={_(VIEW_METHODOLOGY)}
                        />
                      )}
                    </Grid>
                  )}
                </Grid>
                {credit?.creditImage &&
                  credit?.creditTypeImage &&
                  credit?.creditTypeUnit && (
                    <Grid item pt={{ xs: 7.5, tablet: 11.25 }}>
                      <Grid
                        container
                        justifyContent="space-evenly"
                        wrap="nowrap"
                      >
                        <DetailsSectionCredit
                          src={credit.creditImage}
                          label={_(CREDIT)}
                        />
                        <Grid
                          item
                          className="pt-[16px] sm:pt-[18px] px-30 text-[40px] font-muli bg-clip-text text-[transparent] bg-[linear-gradient(206deg,#7D9AA2_0%,#9AD3BE_50%,#D1E2C7_100%)]"
                        >
                          =
                        </Grid>
                        <DetailsSectionCredit
                          src={credit.creditTypeImage}
                          label={credit.creditTypeUnit}
                          learnMore={credit.creditTypeUnitDefinition}
                        />
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            )}
            {children}
          </Section>

          {hasCredibilityCards && (
            <ResponsiveSlider
              classes={{ headerWrap: 'align-flex-end pb-[14px] sm:pb-[34px]' }}
              visibleOverflow
              arrows
              mobileItemWidth="90%"
              itemWidth="85%"
              infinite={false}
              slidesToShow={isMobile ? 1 : 2}
              padding={theme.spacing(2.5)}
              className={`${projectId ? 'md:-mt-[90px]' : ''} pt-0`}
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
        </div>
      )}
    </>
  );
};
