import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Flex } from 'web-components/src/components/box';
import { ProjectCard } from 'web-components/src/components/cards/ProjectCard';
import { EmptyState } from 'web-components/src/components/empty-state/EmptyState';
import { NoProjectIcon } from 'web-components/src/components/icons/NoProjectIcon';
import SelectTextFieldBase from 'web-components/src/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/src/components/loading';
import { Pagination } from 'web-components/src/components/pagination/Pagination';
import { Body } from 'web-components/src/components/typography';
import { pxToRem } from 'web-components/src/theme/muiTheme';

import { useAllSoldOutProjectsQuery } from 'generated/sanity-graphql';
import {
  creditClassSelectedFiltersAtom,
  projectsSortAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';

import { useFetchCreditClasses } from '../hooks/useFetchCreditClasses';
import { useProjectsContext } from '../Projects.context';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  sortOptions,
} from './AllProjects.config';
import {
  EMPTY_PROJECTS_LABEL,
  RESET_FILTERS_LABEL,
} from './AllProjects.constants';
import { normalizeCreditClassFilters } from './AllProjects.normalizers';
import { SideFilter } from './AllProjects.SideFilter';
import { ProjectWithOrderData } from './AllProjects.types';
import { getCreditsTooltip } from './utils/getCreditsTooltip';
import { getIsSoldOut } from './utils/getIsSoldOut';

export const AllProjects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { page: routePage } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { track } = useTracker();
  const location = useLocation();
  const [useCommunityProjects, setUseCommunityProjects] = useAtom(
    useCommunityProjectsAtom,
  );
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );

  // Page index starts at 1 for route
  // Page index starts at 0 for logic
  const page = Number(routePage) - 1;

  const {
    creditClassesWithMetadata,
    isLoading: isCreditClassesWithMetadataLoading,
  } = useFetchCreditClasses();

  const {
    data: sanityCreditClassesData,
    isLoading: isSanityCreditClassesLoading,
  } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const { data: sanitySoldOutProjects } = useAllSoldOutProjectsQuery({
    client: sanityClient,
  });
  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

  const [sort, setSort] = useAtom(projectsSortAtom);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);

  const {
    allProjects,
    projects,
    projectsCount,
    haveOffChainProjects,
    hasCommunityProjects,
    pagesCount,
  } = useProjectsContext();

  const { creditClassFilters } = normalizeCreditClassFilters({
    creditClassesWithMetadata,
    sanityCreditClassesData,
    allProjects,
    haveOffChainProjects,
  });

  useEffect(() => {
    // Check all the credit class filters by default
    if (
      Object.keys(creditClassSelectedFilters).length !==
      creditClassFilters.length
    )
      setCreditClassSelectedFilters(
        creditClassFilters.reduce((acc, creditClassFilter) => {
          return {
            ...acc,
            [creditClassFilter.path]: true,
          };
        }, {}),
      );
  }, [
    creditClassFilters,
    creditClassSelectedFilters,
    setCreditClassSelectedFilters,
  ]);

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

  if (isSanityCreditClassesLoading || isCreditClassesWithMetadataLoading)
    return <Loading sx={{ gridColumn: '1 / -1' }} />;

  return (
    <>
      <Flex flex={1} sx={{ gridColumn: '1 / -1' }} className="xl:mt-[-78px]">
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          flex={1}
          sx={{
            pb: 5,
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
        >
          <SideFilter
            creditClassFilters={creditClassFilters}
            hasCommunityProjects={hasCommunityProjects}
            showFiltersReset={showFiltersReset}
            resetFilter={resetFilter}
            sx={{
              mb: { xs: 3.75, lg: 0 },
              mr: { xs: 0, lg: 7.5 },
              width: { xs: '100%', lg: 'auto' },
            }}
          />
          <Flex
            sx={{
              order: { xs: 1, lg: 2 },
              alignItems: 'center',
              width: { xs: '100%', lg: 'auto' },
            }}
          >
            <Body
              size="xs"
              sx={{
                width: [0, 0, 0, 43],
                display: { xs: 'none', md: 'block' },
                whiteSpace: 'nowrap',
                mr: 2,
                color: 'info.dark',
                fontWeight: 700,
              }}
            >
              Sort by:
            </Body>
            <SelectTextFieldBase
              className="w-[100%]"
              defaultValue={sort}
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
              purchaseInfo={project.purchaseInfo || {}}
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
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={selectedProject && [selectedProject]}
        track={track}
        location={location}
      />
    </>
  );
};
