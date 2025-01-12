import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getClientConfig } from 'clients/Clients.config';
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
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import {
  creditClassSelectedFiltersAtom,
  environmentTypeFiltersAtom,
  marketTypeFiltersAtom,
  projectsSortAtom,
  regionFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import {
  DRAFT_TEXT,
  EMPTY_OPTION_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import {
  COLOR_SCHEME,
  CREDIT_CLASS_FILTERS_TO_DESELECT,
  IS_REGEN,
  IS_TERRASOS,
} from 'lib/env';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { useTracker } from 'lib/tracker/useTracker';

import { TebuBannerWrapper } from 'components/organisms/TebuBannerWrapper/TebuBannerWrapper';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick';

import { useFetchCreditClasses } from '../hooks/useFetchCreditClasses';
import { useProjectsContext } from '../Projects.context';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  sortOptions,
} from './AllProjects.config';
import {
  COMPLIANCE_MARKET,
  EMPTY_PROJECTS_LABEL,
  RESET_FILTERS_LABEL,
  VOLUNTARY_MARKET,
} from './AllProjects.constants';
import { normalizeCreditClassFilters } from './AllProjects.normalizers';
import {
  getActiveFilterIds,
  getResetFilters,
  getSetActiveFilters,
  getShowResetButton,
} from './AllProjects.ProjectFilter.utils';
import ProjectFilterMobile from './AllProjects.ProjectFilterMobile';
import { SideFilter } from './AllProjects.SideFilter';
import { TerrasosCredits } from './AllProjects.TerrasosCredits';
import { getCreditsTooltip } from './utils/getCreditsTooltip';
import { getIsSoldOut } from './utils/getIsSoldOut';

export const AllProjects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { page: routePage } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { track } = useTracker();
  const config = getClientConfig();

  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);
  const purchaseDetailsTitles = useMemo(
    () => getProjectCardPurchaseDetailsTitleMapping(_),
    [_],
  );
  const buttons = useMemo(() => getProjectCardButtonMapping(_), [_]);

  const [useCommunityProjects, setUseCommunityProjects] = useAtom(
    useCommunityProjectsAtom,
  );
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );

  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );
  const setActiveFilters = (filters: string[]) =>
    getSetActiveFilters({
      filterIds: filters,
      setMarketTypeFilters,
      setEnvironmentTypeFilters,
      setRegionFilters,
      marketTypeFilters,
      environmentTypeFilters,
      regionFilters,
    });

  const activeFilterIds = getActiveFilterIds({
    marketTypeFilters,
    environmentTypeFilters,
    regionFilters,
  });

  const resetFilters = getResetFilters({
    setMarketTypeFilters,
    setEnvironmentTypeFilters,
    setRegionFilters,
  });

  const showResetButton = getShowResetButton({
    marketTypeFilters,
    environmentTypeFilters,
    regionFilters,
  });

  const {
    creditClassesWithMetadata,
    isLoading: isCreditClassesWithMetadataLoading,
  } = useFetchCreditClasses();

  const {
    data: sanityCreditClassesData,
    isLoading: isSanityCreditClassesLoading,
  } = useQuery(
    getAllSanityCreditClassesQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const [sort, setSort] = useAtom(projectsSortAtom);

  const {
    allProjects,
    allOnChainProjects,
    projects,
    projectsCount,
    haveOffChainProjects,
    hasCommunityProjects,
    pagesCount,
    soldOutProjectsIds,
    loading,
  } = useProjectsContext();

  const { creditClassFilters } = normalizeCreditClassFilters({
    creditClassesWithMetadata,
    sanityCreditClassesData,
    allOnChainProjects,
    haveOffChainProjects,
    _,
  });

  const sortOptionsTranslated = useMemo(
    () =>
      sortOptions.map(option => ({
        label: _(option.label),
        value: option.value,
      })),
    [_],
  );

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
            [creditClassFilter.path]: CREDIT_CLASS_FILTERS_TO_DESELECT.includes(
              creditClassFilter.path,
            )
              ? false
              : true,
          };
        }, {}),
      );
  }, [
    creditClassFilters,
    creditClassSelectedFilters,
    setCreditClassSelectedFilters,
  ]);

  const onBuyButtonClick = useOnBuyButtonClick();

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
    return <Loading sx={{ gridColumn: '1 / -1', height: { sm: '50vh' } }} />;

  return (
    <>
      <Flex
        flex={1}
        sx={{ gridColumn: '1 / -1' }}
        className={IS_REGEN ? 'xl:mt-[-78px]' : undefined}
      >
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          flex={1}
          sx={{
            pb: 5,
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
          className={IS_TERRASOS ? 'lg:hidden' : undefined}
        >
          {IS_REGEN && (
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
          )}
          {IS_TERRASOS && (
            <ProjectFilterMobile
              allProjects={allProjects}
              activeFilters={activeFilterIds}
              setActiveFilters={setActiveFilters}
              resetFilters={resetFilters}
              showResetButton={showResetButton}
              sx={{
                mb: { xs: 3.75, lg: 0 },
                mr: { xs: 0, lg: 7.5 },
                width: { xs: '100%', lg: 'auto' },
              }}
              className="lg:hidden"
            />
          )}
          {IS_REGEN && (
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
                <Trans>Sort by:</Trans>
              </Body>
              <SelectTextFieldBase
                emptyOptionText={_(EMPTY_OPTION_TEXT)}
                className="w-[100%]"
                defaultValue={sort}
                options={sortOptionsTranslated}
                defaultStyle={false}
                onChange={handleSort}
                sx={{ width: 'fit-content' }}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
      {IS_TERRASOS && (
        <TebuBannerWrapper
          className={cn(
            '-mt-15 mb-3 col-span-full',
            projectsCount === 0
              ? 'sm:mt-[56px] sm:mb-[48px]'
              : 'sm:mt-20 sm:mb-30',
          )}
        />
      )}
      {projects?.map(project => {
        const isSoldOut = getIsSoldOut({ project, soldOutProjectsIds });
        const isComplianceProject =
          project.marketType?.includes(COMPLIANCE_MARKET) ?? false;

        const isVoluntaryProject =
          project.marketType?.includes(VOLUNTARY_MARKET) ?? false;
        const complianceCredits = project.complianceCredits;

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
              onButtonClick={
                IS_TERRASOS
                  ? undefined
                  : () => {
                      onBuyButtonClick({
                        projectId: project?.id,
                        cardSellOrders: project?.cardSellOrders,
                        loading,
                      });
                    }
              }
              purchaseInfo={project.purchaseInfo || {}}
              onClick={() => navigate(`/project/${project.id}`)}
              imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
              apiServerUrl={API_URI}
              truncateTitle={true}
              sx={{
                width: { xs: '100%', md: 400 },
                height: 479,
              }}
              track={track}
              isSoldOut={isSoldOut}
              creditsTooltip={getCreditsTooltip({
                isSoldOut,
                project,
                _,
              })}
              program={IS_REGEN ? project.program : undefined}
              projectPrefinancing={project.projectPrefinancing}
              offChain={config.buyButton ? project.offChain : true}
              draftText={_(DRAFT_TEXT)}
              bodyTexts={bodyTexts}
              purchaseDetailsTitles={purchaseDetailsTitles}
              buttons={buttons}
              useProjectCardButton={IS_REGEN}
              creditsChildren={
                IS_TERRASOS ? (
                  <TerrasosCredits
                    project={project}
                    isVoluntaryProject={isVoluntaryProject}
                    isComplianceProject={isComplianceProject}
                    complianceCredits={complianceCredits.creditsAvailable}
                  />
                ) : null
              }
            />
          </Box>
        );
      })}
      {projectsCount === 0 && (
        <EmptyState
          message={_(EMPTY_PROJECTS_LABEL)}
          icon={<NoProjectIcon sx={{ fontSize: 100 }} />}
          sx={{ gridColumn: '1 / -1', backgroundColor: 'info.light' }}
          className={IS_TERRASOS ? 'lg:mt-[36px]' : undefined}
        >
          <>
            {showFiltersReset && (
              <Box
                onClick={IS_REGEN ? resetFilter : resetFilters}
                sx={{
                  color: 'secondary.main',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                {_(RESET_FILTERS_LABEL)}
              </Box>
            )}
          </>
        </EmptyState>
      )}
      {pagesCount > 1 && (
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
            colorScheme={COLOR_SCHEME}
          />
        </Flex>
      )}
    </>
  );
};
