import LazyLoad from 'react-lazyload';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Box, Grid, Skeleton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import { ActionCard } from 'web-components/lib/components/molecules/ActionCard/ActionCard';
import { ProjectTagType } from 'web-components/lib/components/molecules/ProjectTag/ProjectTag.types';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import Section from 'web-components/lib/components/section';
import { Body, Label, Title } from 'web-components/lib/components/typography';

import {
  useAllProjectActivityQuery,
  useAllProjectEcosystemQuery,
} from 'generated/sanity-graphql';
import { useLedger } from 'ledger';
import { client as sanityClient } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getCreditTypeQuery } from 'lib/queries/react-query/ecocredit/getCreditTypeQuery/getCreditTypeQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';

import { usePartyInfos } from 'pages/ProfileEdit/hooks/usePartyInfos';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  MAPBOX_TOKEN,
} from 'components/templates/ProjectDetails/ProjectDetails.config';

import { ProjectBatchTotals } from '../../molecules';
import { ProjectTopSectionCreditClassCard } from './ProjectTopSection.CreditClassCard';
import {
  ProjectTopSectionQuoteMark,
  useProjectTopSectionStyles,
} from './ProjectTopSection.styles';
import { ProjectTopSectionProps } from './ProjectTopSection.types';
import {
  getDisplayAdmin,
  getOffsetGenerationMethod,
  getProjectActivityIconsMapping,
  getProjectEcosystemIconsMapping,
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
  sanityCreditTypeData,
  geojson,
  isGISFile,
  onChainProjectId,
  loading,
  landOwner,
  landSteward,
  projectDeveloper,
  projectVerifier,
  projectWithOrderData,
  soldOutProjectsIds,
  batchData,
  otcCard,
}: ProjectTopSectionProps): JSX.Element {
  const { classes } = useProjectTopSectionStyles();
  const { ecocreditClient, dataClient } = useLedger();

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: onChainProject?.admin ?? '',
      enabled: !!onChainProject?.admin && !!graphqlClient && !!csrfData,
    }),
  );
  const { party, defaultAvatar } = usePartyInfos({ partyByAddr });

  const { creditClass } = parseOffChainProject(offChainProject);

  const { projectName, area, areaUnit, placeName, projectMethodology } =
    parseProjectMetadata(projectMetadata);

  const { glanceText, primaryDescription, quote } =
    parseProjectPageMetadata(projectPageMetadata);

  /* Credit class info from on chain metadata or Sanity */

  const onChainCreditClassId =
    creditClass?.onChainId ?? onChainProjectId?.split('-')?.[0];
  const { data: creditClassOnChain } = useQuery(
    getClassQuery({
      client: ecocreditClient,
      request: {
        classId: onChainCreditClassId ?? '',
      },
      enabled: !!ecocreditClient && !!onChainCreditClassId,
    }),
  );
  const { data: creditClassMetadataData } = useQuery(
    getMetadataQuery({
      iri: creditClassOnChain?.class?.metadata,
      enabled: !!dataClient && !!creditClassOnChain?.class?.metadata,
      dataClient,
    }),
  );
  const creditClassMetadata = creditClassMetadataData as CreditClassMetadataLD;

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

  const creditTypeSanity = sanityCreditTypeData?.allCreditType?.find(
    creditType =>
      creditType.name?.toLowerCase() === creditTypeData?.creditType?.name,
  );
  const { data: allProjectActivityData } = useAllProjectActivityQuery({
    client: sanityClient,
  });
  const { data: allProjectEcosystemData } = useAllProjectEcosystemQuery({
    client: sanityClient,
  });
  const projectActivityIconsMapping = getProjectActivityIconsMapping({
    allProjectActivityData,
  });
  const projectEcosystemIconsMapping = getProjectEcosystemIconsMapping({
    allProjectEcosystemData,
  });

  const displayName =
    projectName ?? (onChainProjectId && `Project ${onChainProjectId}`) ?? '';
  const creditClassMethodology = parseMethodologies({
    methodologies: creditClassMetadata?.['regen:approvedMethodologies'],
  });
  const methodology = projectMethodology ?? creditClassMethodology;
  const generationMethod = getOffsetGenerationMethod(creditClassMetadata);

  const projectActivity =
    projectMetadata?.['regen:projectActivity']?.['schema:name'];
  const activityTags: ProjectTagType[] | undefined = projectActivity
    ? [
        {
          name: projectActivity,
          icon: {
            src: projectActivityIconsMapping?.[projectActivity] ?? '',
          },
        },
      ]
    : undefined;

  const ecosystemTags: ProjectTagType[] | undefined = creditClassMetadata?.[
    'regen:ecosystemType'
  ]?.map(ecosystem => ({
    name: ecosystem,
    icon: {
      src: projectEcosystemIconsMapping?.[ecosystem] ?? '',
    },
  }));

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
            generationMethod={generationMethod}
            methodology={methodology}
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
        <Grid item xs={12} md={4} sx={{ pt: { xs: 10, sm: 'inherit' } }}>
          <ProjectTopCard
            projectAdmin={getDisplayAdmin(
              onChainProject?.admin,
              party,
              defaultAvatar,
            )}
            projectDeveloper={projectDeveloper}
            projectVerifier={projectVerifier}
            landSteward={landSteward}
            landOwner={landOwner}
            activities={activityTags}
            ecosystems={ecosystemTags}
          />
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
