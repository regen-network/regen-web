import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { spacing } from 'styles/spacing';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import { EmptyState } from 'web-components/lib/components/empty-state/EmptyState';
import { NoProjectIcon } from 'web-components/lib/components/icons/NoProjectIcon';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { Pagination } from 'web-components/lib/components/pagination/Pagination';
import { Body, Subtitle } from 'web-components/lib/components/typography';
import { pxToRem } from 'web-components/lib/theme/muiTheme';

import {
  useAllProjectsPageQuery,
  useAllSoldOutProjectsQuery,
} from 'generated/sanity-graphql';
import { client as sanityClient } from 'lib/clients/sanity';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { GettingStartedResourcesSection } from 'components/molecules';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';

import { useFetchCreditClasses } from './hooks/useFetchCreditClasses';
import { useProjects } from './hooks/useProjects';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  PROJECTS_PER_PAGE,
  sortOptions,
} from './Projects.config';
import {
  EMPTY_PROJECTS_LABEL,
  RESET_FILTERS_LABEL,
} from './Projects.constants';
import { normalizeCreditClassFilters } from './Projects.normalizers';
import { ProjectsSideFilter } from './Projects.SideFilter';
import { ProjectWithOrderData } from './Projects.types';
import { getCreditsTooltip } from './utils/getCreditsTooltip';
import { getIsSoldOut } from './utils/getIsSoldOut';

export const Projects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { page: routePage } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { track } = useTracker();
  const location = useLocation();
  const [useCommunityProjects, setUseCommunityProjects] = useState<
    boolean | undefined
  >(undefined);
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useState(
    {},
  );

  // Page index starts at 1 for route
  // Page index starts at 0 for logic
  const page = Number(routePage) - 1;

  const { creditClassesWithMetadata } = useFetchCreditClasses();

  const { data: sanityCreditClassesData } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const { creditClassFilters } = normalizeCreditClassFilters({
    creditClassesWithMetadata,
    sanityCreditClassesData,
  });

  const { data: sanityProjectsPageData } = useAllProjectsPageQuery({
    client: sanityClient,
  });

  const gettingStartedResourcesSection =
    sanityProjectsPageData?.allProjectsPage?.[0]
      ?.gettingStartedResourcesSection;

  const { data: sanitySoldOutProjects } = useAllSoldOutProjectsQuery({
    client: sanityClient,
  });
  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);

  const { projects, projectsCount, pagesCount, loading, hasCommunityProjects } =
    useProjects({
      sort,
      offset: page * PROJECTS_PER_PAGE,
      useCommunityProjects,
      creditClassFilter: creditClassSelectedFilters,
    });

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  const showFiltersReset =
    useCommunityProjects !== undefined ||
    Object.keys(creditClassSelectedFilters).length > 0;

  const resetFilter = () => {
    setCreditClassSelectedFilters({});
    setUseCommunityProjects(undefined);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Flex
        sx={{
          bgcolor: 'grey.50',
          pt: { xs: 6, md: 8.75 },
          pb: { xs: 20, md: 25 },
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
            gridGap: '1.125rem',
            flex: 1,
            justifyContent: 'center',
            maxWidth: theme => ({
              xs: '100%',
              lg: theme.typography.pxToRem(1400),
            }),
            ...spacing.header,
          }}
        >
          <Flex flex={1} sx={{ gridColumn: '1 / -1' }}>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flex={1}
              sx={{
                pb: 5,
                flexWrap: { xs: 'wrap', lg: 'nowrap' },
              }}
            >
              <Flex
                order={0}
                flexGrow={1}
                alignItems="center"
                sx={{ mr: { md: 4 } }}
              >
                <Subtitle size="lg">Projects</Subtitle>
                <Body size="lg" sx={{ whiteSpace: 'initial' }}>
                  {' '}
                  ({projectsCount})
                </Body>
              </Flex>
              <ProjectsSideFilter
                creditClassSelectedFilters={creditClassSelectedFilters}
                creditClassFilters={creditClassFilters}
                hasCommunityProjects={hasCommunityProjects}
                useCommunityProjects={useCommunityProjects}
                showFiltersReset={showFiltersReset}
                setCreditClassFilter={setCreditClassSelectedFilters}
                setUseCommunityProjects={setUseCommunityProjects}
                resetFilter={resetFilter}
                sx={{
                  mt: { xs: 6.25, lg: 0 },
                  mr: { xs: 0, lg: 7.5 },
                  width: { xs: '100%', lg: 'auto' },
                  order: { xs: 2, lg: 1 },
                }}
              />
              <Flex
                sx={{
                  order: { xs: 1, lg: 2 },
                  alignItems: 'center',
                }}
              >
                <Body
                  size="xs"
                  sx={{
                    width: [0, 0, 0, 43],
                    visibility: { xs: 'hidden', lg: 'visible' },
                    whiteSpace: 'nowrap',
                    mr: 2,
                    color: 'info.dark',
                    fontWeight: 700,
                  }}
                >
                  Sort by:
                </Body>
                <SelectTextFieldBase
                  options={sortOptions}
                  defaultStyle={false}
                  onChange={handleSort}
                  sx={{ width: 'fit-content' }}
                />
              </Flex>
            </Flex>
          </Flex>
          {projects?.map(project => {
            const isSoldOut = getIsSoldOut({ project, soldOutProjectsIds });
            return (
              <Box key={project?.id}>
                <ProjectCard
                  id={project?.id}
                  name={project?.name}
                  creditClassId={project?.creditClassId}
                  imgSrc={project?.imgSrc}
                  place={project?.place}
                  area={project?.area}
                  areaUnit={project?.areaUnit}
                  onButtonClick={() => {
                    setSelectedProject(project);
                    setIsBuyFlowStarted(true);
                  }}
                  purchaseInfo={project.purchaseInfo}
                  onClick={() => navigate(`/project/${project.id}`)}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                  truncateTitle={true}
                  sx={{ width: 400, height: 479 }}
                  track={track}
                  isSoldOut={isSoldOut}
                  creditsTooltip={getCreditsTooltip({ isSoldOut, project })}
                  program={project.program}
                />
              </Box>
            );
          })}
          {projectsCount === 0 && (
            <EmptyState
              message={EMPTY_PROJECTS_LABEL}
              icon={<NoProjectIcon sx={{ fontSize: 100 }} />}
              sx={{ gridColumn: '1 / -1', backgroundColor: 'info.light' }}
            >
              <>
                {showFiltersReset && (
                  <Box
                    onClick={resetFilter}
                    sx={{
                      color: 'secondary.main',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {RESET_FILTERS_LABEL}
                  </Box>
                )}
              </>
            </EmptyState>
          )}
          <Flex
            sx={{
              gridColumn: '1/-1',
              mt: pxToRem(28),
              justifyContent: { xs: 'center', tablet: 'end' },
            }}
          >
            <Pagination
              count={pagesCount}
              page={Number(routePage)}
              onChange={(event, value) => navigate(`/projects/${value}`)}
              size={isMobile ? 'small' : 'large'}
            />
          </Flex>
        </Box>
        <BuySellOrderFlow
          isFlowStarted={isBuyFlowStarted}
          setIsFlowStarted={setIsBuyFlowStarted}
          projects={selectedProject && [selectedProject]}
          track={track}
          location={location}
        />
      </Flex>
      {gettingStartedResourcesSection && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}
    </>
  );
};
