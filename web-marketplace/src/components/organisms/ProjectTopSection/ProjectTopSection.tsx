import LazyLoad from 'react-lazyload';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Grid, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import GlanceCard from 'web-components/src/components/cards/GlanceCard';
import { ActionCard } from 'web-components/src/components/molecules/ActionCard/ActionCard';
import { RoundLogoItemsList } from 'web-components/src/components/molecules/RoundLogoItemsList/RoundLogoItemsList';
import { ImpactTags } from 'web-components/src/components/organisms/ImpactTags/ImpactTags';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import Section from 'web-components/src/components/section';
import { Body, Label, Title } from 'web-components/src/components/typography';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  ECOSYSTEM_LABEL,
  PROJECT_ACTIVITY_LABEL,
  SEE_LESS,
  SEE_MORE,
} from 'lib/constants/shared.constants';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { IS_REGEN } from 'lib/env';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllCreditCertificationQuery } from 'lib/queries/react-query/sanity/getAllCreditCertificationQuery/getAllCreditCertificationQuery';
import { getAllCreditTypeQuery } from 'lib/queries/react-query/sanity/getAllCreditTypeQuery/getAllCreditTypeQuery';
import { getAllOffsetMethodQuery } from 'lib/queries/react-query/sanity/getAllOffsetMethodQuery/getAllOffsetMethodQuery';
import { getAllProjectRatingQuery } from 'lib/queries/react-query/sanity/getAllProjectRatingQuery/getAllProjectRatingQuery';

import useImpact from 'pages/CreditClassDetails/hooks/useImpact';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from 'components/templates/ProjectDetails/ProjectDetails.config';
import { Prefinance } from 'components/templates/ProjectDetails/ProjectDetails.Prefinance';
import { useTags } from 'hooks/useTags';

import { ProjectBatchTotals } from '../../molecules';
import { ProjectTopSectionCreditClassCard } from './ProjectTopSection.CreditClassCard';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import { ProjectTopSectionProps } from './ProjectTopSection.types';
import {
  getIconsMapping,
  getRatingsAndCertificationsData,
  parseMethodologies,
  parseOffChainProject,
  parseProjectMetadata,
  parseProjectPageMetadata,
} from './ProjectTopSection.utils';

function ProjectTopSection({
  offChainProject,
  onChainProject,
  projectMetadata,
  projectPageMetadata,
  creditClassSanity,
  geojson,
  isGISFile,
  onChainProjectId,
  loading,
  projectWithOrderData,
  soldOutProjectsIds,
  batchData,
  otcCard,
  creditClassOnChain,
  creditClassMetadata,
  onChainCreditClassId,
  program,
  projectPrefinancing,
  isSoldOut,
}: ProjectTopSectionProps): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useProjectTopSectionStyles();
  const { ecocreditClient } = useLedger();

  const {
    projectName,
    area,
    areaUnit,
    placeName,
    projectMethodology,
    ratings,
  } = parseProjectMetadata(_, projectMetadata, onChainProjectId);

  const { glanceText, primaryDescription, quote } =
    parseProjectPageMetadata(projectPageMetadata);

  const { data: creditTypeData } = useQuery(
    getCreditTypeQuery({
      client: ecocreditClient,
      request: {
        abbreviation: creditClassOnChain?.class?.creditTypeAbbrev,
      },
      enabled:
        !!ecocreditClient && !!creditClassOnChain?.class?.creditTypeAbbrev,
    }),
  );

  const { data: sanityCreditTypeData } = useQuery(
    getAllCreditTypeQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const creditTypeSanity = sanityCreditTypeData?.allCreditType?.find(
    creditType =>
      creditType.name?.toLowerCase() ===
      creditTypeData?.creditType?.name?.toLowerCase(),
  );
  const { data: sanityOffsetMethodData } = useQuery(
    getAllOffsetMethodQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const { data: allProjectRatingData } = useQuery(
    getAllProjectRatingQuery({
      sanityClient,
    }),
  );
  const { data: allCreditCertification } = useQuery(
    getAllCreditCertificationQuery({
      sanityClient,
    }),
  );

  const projectRatingIconsMapping = getIconsMapping({
    data: allProjectRatingData?.allProjectRating,
  });
  const creditCertificationIconsMapping = getIconsMapping({
    data: allCreditCertification?.allCreditCertification,
  });
  const offsetMethodIconsMapping = getIconsMapping({
    data: sanityOffsetMethodData?.allOffsetMethod,
  });

  const certifications = creditClassMetadata?.['regen:certifications'];

  const ratingsAndCertificationsData = getRatingsAndCertificationsData({
    ratings,
    ratingIcons: projectRatingIconsMapping,
    certifications,
    certificationIcons: creditCertificationIconsMapping,
    _,
  });

  const displayName =
    projectName ??
    (onChainProjectId && _(msg`Project ${onChainProjectId}`)) ??
    '';
  const creditClassMethodology = parseMethodologies({
    methodologies: creditClassMetadata?.['regen:approvedMethodologies'],
    _,
  });
  const methodology = projectMethodology ?? creditClassMethodology;
  const generationMethods = creditClassMetadata?.[
    'regen:offsetGenerationMethod'
  ]?.map(method => ({
    name: method,
    icon: { src: offsetMethodIconsMapping?.[method] ?? '' },
  }));

  const projectActivity =
    projectMetadata?.['regen:projectActivity']?.['schema:name'];
  const ecosystemTypes =
    projectMetadata?.['regen:ecosystemType'] ||
    creditClassMetadata?.['regen:ecosystemType'];
  const { activityTags, ecosystemTags } = useTags({
    activities: projectActivity ? [projectActivity] : undefined,
    ecosystemTypes,
  });

  const { offChainPrimaryImpactIRI, offChainCoBenefitsIRIs } =
    parseOffChainProject(offChainProject);
  const impact = useImpact({
    offChainPrimaryImpactIRI,
    offChainCoBenefitsIRIs,
    creditClassMetadata,
    projectMetadata,
  });

  const columnLayout =
    (activityTags && activityTags.length > 0) ||
    (ecosystemTags && ecosystemTags.length > 0) ||
    impact.length > 0 ||
    !!ratingsAndCertificationsData ||
    !!otcCard;

  return (
    <Section classes={{ root: classes.section }}>
      <Grid
        container
        sx={!columnLayout ? { maxWidth: 700, margin: '0 auto' } : undefined}
      >
        <Grid
          item
          xs={12}
          md={columnLayout ? 8 : 12}
          sx={columnLayout ? { pr: { md: 19 } } : undefined}
        >
          {loading ? (
            <Skeleton height={124} />
          ) : (
            <Title variant="h1">{displayName}</Title>
          )}
          <Box sx={{ pt: { xs: 5, sm: 6 } }}>
            <ProjectPlaceInfo
              iconClassName={classes.icon}
              // TODO Format on-chain jurisdiction if no anchored location
              place={placeName ?? onChainProject?.jurisdiction ?? ''}
              area={Number(area)}
              areaUnit={areaUnit}
            />
          </Box>
          {/* Used to prevent layout shift */}
          {(!offChainProject ||
            isGISFile === undefined ||
            (isGISFile && !geojson)) &&
            loading && <Skeleton height={200} />}
          {geojson && isGISFile && glanceText && (
            <LazyLoad offset={50} once>
              <Box sx={{ pt: 6 }}>
                <GlanceCard
                  text={glanceText}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  geojson={geojson}
                  isGISFile={isGISFile}
                  mapboxToken={MAPBOX_TOKEN}
                />
              </Box>
            </LazyLoad>
          )}
          {/* Used to prevent layout shift */}
          {loading && <Skeleton height={200} />}
          {primaryDescription && (
            <Body size="xl" mobileSize="md" py={[3.75, 6]}>
              {primaryDescription}
            </Body>
          )}
          {projectPrefinancing && (
            <Prefinance
              projectPrefinancing={projectPrefinancing}
              isSoldOut={isSoldOut}
            />
          )}
          <ProjectTopSectionCreditClassCard
            creditClassSanity={creditClassSanity}
            creditClassMetadata={creditClassMetadata as CreditClassMetadataLD}
            onChainCreditClassId={onChainCreditClassId}
            creditTypeName={
              creditTypeSanity?.category?.name ||
              creditTypeData?.creditType?.name
            }
            creditTypeImage={creditTypeSanity?.category?.icon?.asset?.url}
            generationMethods={generationMethods}
            methodology={methodology}
            program={program}
          />
          <Box>
            {onChainProjectId && batchData?.totals && (
              <ProjectBatchTotals
                projectWithOrderData={projectWithOrderData}
                soldOutProjectsIds={soldOutProjectsIds}
                totals={batchData.totals}
                sx={{
                  mt: { xs: 10, sm: 12, md: 16 },
                  mb: quote ? { xs: 10, sm: 12, md: 25 } : {},
                }}
              />
            )}
          </Box>
          {quote && (
            <div>
              <Title
                variant="h4"
                className={classes.tagline}
                sx={{ ml: { xs: 4, sm: 4.5 } }}
              >
                <ProjectTopSectionQuoteMark
                  sx={{ top: 16, left: { xs: -15, sm: -18 } }}
                >
                  “
                </ProjectTopSectionQuoteMark>
                <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
                  {quote['regen:quote']}
                </Box>
                <ProjectTopSectionQuoteMark
                  sx={{ ml: -2.5, bottom: { xs: 14, sm: 16 } }}
                >
                  ”
                </ProjectTopSectionQuoteMark>
              </Title>
              <Label mobileSize="xs" color="secondary.main" pt={[4, 5.5]}>
                {quote['schema:name']}
              </Label>
              <Body mobileSize="xs">{quote['schema:jobTitle']}</Body>
            </div>
          )}
        </Grid>
        {columnLayout && (
          <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 5 } }}>
            <ImpactTags
              seeMoreText={_(SEE_MORE)}
              seeLessText={_(SEE_LESS)}
              activities={activityTags}
              ecosystems={ecosystemTags}
              impact={[...impact]}
              activitiesLabel={_(PROJECT_ACTIVITY_LABEL)}
              ecosystemLabel={_(ECOSYSTEM_LABEL)}
              overrideIconColor={!IS_REGEN}
            />
            {ratingsAndCertificationsData && (
              <RoundLogoItemsList
                {...ratingsAndCertificationsData}
                sx={{ mb: { xs: 7.5, sm: 10 } }}
              />
            )}
            {otcCard && IS_REGEN && (
              <Box>
                <ActionCard {...otcCard} variant="column" />
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </Section>
  );
}

export { ProjectTopSection };
