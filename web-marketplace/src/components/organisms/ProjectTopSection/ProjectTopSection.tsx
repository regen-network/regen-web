import LazyLoad from 'react-lazyload';
import { Box, Grid, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { TRANSPARENT_PIXEL } from 'utils/image/transparentPixel';

import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import { ProjectImpactCardProps } from 'web-components/lib/components/cards/ProjectImpactCard/ProjectImpactCard';
import { ActionCard } from 'web-components/lib/components/molecules/ActionCard/ActionCard';
import { RoundLogoItemsList } from 'web-components/lib/components/molecules/RoundLogoItemsList/RoundLogoItemsList';
import { ImpactTags } from 'web-components/lib/components/organisms/ImpactTags/ImpactTags';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getSanityImgSrc } from 'lib/imgSrc';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getAllCreditCertificationQuery } from 'lib/queries/react-query/sanity/getAllCreditCertificationQuery/getAllCreditCertificationQuery';
import { getAllCreditTypeQuery } from 'lib/queries/react-query/sanity/getAllCreditTypeQuery/getAllCreditTypeQuery';
import { getAllOffsetMethodQuery } from 'lib/queries/react-query/sanity/getAllOffsetMethodQuery/getAllOffsetMethodQuery';
import { getAllProjectRatingQuery } from 'lib/queries/react-query/sanity/getAllProjectRatingQuery/getAllProjectRatingQuery';

import {
  normalizeCoBenefit,
  normalizePrimaryImpact,
} from 'pages/CreditClassDetails/CreditClassDetails.utils';
import useCoBenefits from 'pages/CreditClassDetails/hooks/useCoBenefits';
import useImpact from 'pages/CreditClassDetails/hooks/useImpact';
import usePrimaryImpact from 'pages/CreditClassDetails/hooks/usePrimaryImpact';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from 'components/templates/ProjectDetails/ProjectDetails.config';
import { useTags } from 'hooks/useTags';

import { ProjectBatchTotals } from '../../molecules';
import { PRIMARY_IMPACT } from './ProjectTopSection.constants';
import { ProjectTopSectionCreditClassCard } from './ProjectTopSection.CreditClassCard';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import { ProjectTopSectionProps } from './ProjectTopSection.types';
import {
  getIconsMapping,
  getRatingsAndCertificationsData,
  getSdgsImages,
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
}: ProjectTopSectionProps): JSX.Element {
  const { classes } = useProjectTopSectionStyles();
  const { ecocreditClient } = useLedger();

  const {
    projectName,
    area,
    areaUnit,
    placeName,
    projectMethodology,
    ratings,
  } = parseProjectMetadata(projectMetadata, onChainProjectId);

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
      creditType.name?.toLowerCase() === creditTypeData?.creditType?.name,
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
  });

  const displayName =
    projectName ?? (onChainProjectId && `Project ${onChainProjectId}`) ?? '';
  const creditClassMethodology = parseMethodologies({
    methodologies: creditClassMetadata?.['regen:approvedMethodologies'],
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
  const ecosystemTypes = creditClassMetadata?.['regen:ecosystemType'];
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
  });

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ pr: { md: 19 } }}>
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
          <ProjectTopSectionCreditClassCard
            creditClassSanity={creditClassSanity}
            creditClassMetadata={creditClassMetadata as CreditClassMetadataLD}
            onChainCreditClassId={onChainCreditClassId}
            creditTypeName={creditTypeData?.creditType?.name}
            creditTypeImage={creditTypeSanity?.image?.asset?.url}
            generationMethods={generationMethods}
            methodology={methodology}
            program={program}
          />
          <Box>
            {batchData?.totals && (
              <ProjectBatchTotals
                projectWithOrderData={projectWithOrderData}
                soldOutProjectsIds={soldOutProjectsIds}
                totals={batchData.totals}
                sx={{
                  mt: { xs: 10, sm: 12, md: 16 },
                  mb: { xs: 10, sm: 12, md: 25 },
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
        <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 5 } }}>
          <ImpactTags
            activities={activityTags}
            ecosystems={ecosystemTags}
            impact={impact}
          />
          {ratingsAndCertificationsData && (
            <RoundLogoItemsList
              {...ratingsAndCertificationsData}
              sx={{ mt: 5 }}
            />
          )}
          {otcCard && (
            <Box sx={{ mt: 5 }}>
              <ActionCard {...otcCard} variant="column" />
            </Box>
          )}
        </Grid>
      </Grid>
    </Section>
  );
}

export { ProjectTopSection };
