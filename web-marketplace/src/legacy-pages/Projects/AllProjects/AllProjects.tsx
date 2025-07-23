'use client';

import React, { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import { getClientConfig } from 'clients/Clients.config';
import { useAtom } from 'jotai';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

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

import { projectsSortAtom } from 'lib/atoms/projects.atoms';
import {
  DRAFT_TEXT,
  EMPTY_OPTION_TEXT,
  getProjectCardBodyTextMapping,
  getProjectCardButtonMapping,
  getProjectCardPurchaseDetailsTitleMapping,
} from 'lib/constants/shared.constants';
import { COLOR_SCHEME, IS_REGEN, IS_TERRASOS } from 'lib/env';
import { useTracker } from 'lib/tracker/useTracker';

import { TebuBannerWrapper } from 'components/organisms/TebuBannerWrapper/TebuBannerWrapper';
import { useOnBuyButtonClick } from 'hooks/useOnBuyButtonClick.legacy';

import { useResetFilters } from '../hooks/useResetFilters';
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
import ProjectFilterMobile from './AllProjects.ProjectFilterMobile';
import { TerrasosCredits } from './AllProjects.TerrasosCredits';
import { getCreditsTooltip } from './utils/getCreditsTooltip';
import { getIsSoldOut } from './utils/getIsSoldOut';

export const AllProjects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const { page: routePage } = useParams() as { page?: string };
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationSearch = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';
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

  const { showResetButton, resetFilters, numberOfSelectedFilters } =
    useResetFilters();

  const [sort, setSort] = useAtom(projectsSortAtom);

  const {
    allProjects,
    projects,
    projectsCount,
    hasCommunityProjects,
    pagesCount,
    soldOutProjectsIds,
    loading,
    creditClassFilterOptions,
    buyingOptionsFilterOptions,
  } = useProjectsContext();

  const sortOptionsTranslated = useMemo(
    () =>
      sortOptions.map(option => ({
        label: _(option.label),
        value: option.value,
      })),
    [_],
  );

  const onBuyButtonClick = useOnBuyButtonClick();

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  if (loading)
    return <Loading sx={{ gridColumn: '1 / -1', height: { sm: '50vh' } }} />;

  return (
    <>
      <Flex flex={1} sx={{ gridColumn: '1 / -1' }}>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          flex={1}
          sx={{
            pb: 5,
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
            mt: { lg: '-77px' },
          }}
        >
          <ProjectFilterMobile
            allProjects={allProjects}
            resetFilters={resetFilters}
            showResetButton={showResetButton}
            numberOfSelectedFilters={numberOfSelectedFilters}
            className="lg:hidden w-full mb-15 mr-0"
            hasCommunityProjects={hasCommunityProjects}
            creditClassFilterOptions={creditClassFilterOptions}
            buyingOptionsFilterOptions={buyingOptionsFilterOptions}
          />

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
              onClick={() => router.push(`/project/${project.id}`)}
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
          className="lg:mt-[36px]"
        >
          <>
            {showResetButton && (
              <Box
                onClick={resetFilters}
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
            onChange={(event, value) =>
              router.push(`/projects/${value}${locationSearch}`)
            }
            size={isMobile ? 'small' : 'large'}
            colorScheme={COLOR_SCHEME}
          />
        </Flex>
      )}
    </>
  );
};
