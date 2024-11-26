import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';
import { useAtom } from 'jotai';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';

import {
  useAllProjectsPageQuery,
  useAllSoldOutProjectsQuery,
} from 'generated/sanity-graphql';
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
import { IS_REGEN, IS_TERRASOS } from 'lib/env';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';

import { Link } from 'components/atoms';
import { GettingStartedResourcesSection } from 'components/molecules';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';

import { PROJECTS_PER_PAGE } from './AllProjects/AllProjects.config';
import {
  getActiveFilterIds,
  getResetFilters,
  getSetActiveFilters,
  getShowResetButton,
} from './AllProjects/AllProjects.ProjectFilter.utils';
import ProjectFilterBody from './AllProjects/AllProjects.ProjectFilterBody';
import { useProjects } from './hooks/useProjects';

const Projects = (): JSX.Element => {
  const { _ } = useLingui();
  const { page: routePage } = useParams();
  const location = useLocation();
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const [sort] = useAtom(projectsSortAtom);
  const [creditClassSelectedFilters] = useAtom(creditClassSelectedFiltersAtom);
  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data: allHomePageData } = useQuery(
    getAllHomePageQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );
  const sortPinnedIds =
    allHomePageData?.allHomePage?.[0]?.projectsSection?.projects?.map(project =>
      String(project?.projectId),
    );

  // Page index starts at 1 for route
  // Page index starts at 0 for logic
  const page = Number(routePage) - 1;

  const {
    allProjects,
    allOnChainProjects,
    haveOffChainProjects,
    projects,
    projectsCount,
    pagesCount,
    hasCommunityProjects,
    prefinanceProjectsCount,
    prefinanceProjects,
  } = useProjects({
    sort,
    offset: page * PROJECTS_PER_PAGE,
    useCommunityProjects,
    creditClassFilter: creditClassSelectedFilters,
    regionFilter: regionFilters,
    environmentTypeFilter: environmentTypeFilters,
    marketTypeFilter: marketTypeFilters,
    sortPinnedIds,
  });

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: (
          <Title variant="h4" mobileVariant="body1">
            <Trans>All projects</Trans>{' '}
            <span className="font-medium text-grey-400">({projectsCount})</span>
          </Title>
        ),
        href: '/projects/1',
      },
      {
        hidden: !prefinanceProjectsCount,
        label: (
          <Title variant="h4" mobileVariant="body1">
            <Trans>Prefinance projects</Trans>{' '}
            <span className="font-medium text-grey-400">
              ({prefinanceProjectsCount})
            </span>
          </Title>
        ),
        href: '/projects/prefinance',
      },
    ],
    [projectsCount, prefinanceProjectsCount],
  );

  const activeTab = Math.max(
    tabs
      .filter(tab => !tab.hidden)
      .findIndex(tab => location.pathname.includes(tab.href ?? '')),
    0,
  );

  const { data: sanityProjectsPageData } = useAllProjectsPageQuery({
    client: sanityClient,
  });

  const gettingStartedResourcesSection =
    sanityProjectsPageData?.allProjectsPage?.[0]
      ?.gettingStartedResourcesSection;

  const prefinanceProjectsContent =
    sanityProjectsPageData?.allProjectsPage?.[0]?.prefinanceProjects;

  const { data: sanitySoldOutProjects } = useAllSoldOutProjectsQuery({
    client: sanityClient,
  });
  const soldOutProjectsIds = useAllSoldOutProjectsIds({
    sanitySoldOutProjects,
  });

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

  return (
    <>
      <div
        className={cn(
          {
            'lg:grid grid-cols-[auto_minmax(310px,750px)] xl:grid-cols-[auto_minmax(310px,1120px)]':
              IS_TERRASOS,
          },
          { '': !IS_TERRASOS },
          'block justify-center',
        )}
        style={{
          background: IS_TERRASOS
            ? 'linear-gradient(90deg, rgba(var(--ac-neutral-0)) 0%, rgba(var(--ac-neutral-0)) 50%, rgba(var(--ac-neutral-100)) 50%, rgba(var(--ac-neutral-100)) 100%)'
            : 'rgba(var(--ac-neutral-100))',
        }}
      >
        <div
          className={cn('w-[310px] py-[43px] px-[20px] hidden', {
            'lg:block': IS_TERRASOS,
          })}
        >
          <ProjectFilterBody
            allProjects={allProjects}
            activeFilters={activeFilterIds}
            setActiveFilters={setActiveFilters}
            resetFilters={resetFilters}
            showResetButton={showResetButton}
          />
        </div>
        <div
          className={cn(
            'bg-ac-neutral-100 pt-25 sm:pt-40 px-[16px] md:px-25 sm:25 pb-[80px] sm:pb-[100px] max-w-[1400px] gap-[18px] justify-center',
            {
              'lg:justify-start grid-cols-[repeat(auto-fit,minmax(300px,1fr))]':
                IS_TERRASOS,
            },
            {
              'mx-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))]':
                !IS_TERRASOS,
            },
            { grid: projectsCount !== 0 || IS_REGEN },
          )}
        >
          <IconTabs
            className="col-[1/-1]"
            aria-label={_(msg`projects tabs`)}
            tabs={tabs}
            activeTab={activeTab}
            linkComponent={Link}
            mobileFullWidth
            sxs={{
              tab: {
                innerContainer: {
                  '&:first-child': {
                    marginRight: { sm: 7 },
                  },
                },
              },
            }}
          />
          <Outlet
            context={{
              allProjects,
              allOnChainProjects,
              haveOffChainProjects,
              projects,
              projectsCount,
              pagesCount,
              hasCommunityProjects,
              prefinanceProjectsCount,
              prefinanceProjects,
              prefinanceProjectsContent,
              soldOutProjectsIds,
            }}
          />
        </div>
      </div>
      {gettingStartedResourcesSection && !IS_TERRASOS && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}
    </>
  );
};

export { Projects };
