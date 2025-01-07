import { useEffect, useMemo } from 'react';
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
  buyingOptionsFiltersAtom,
  creditClassInitialFiltersAtom,
  creditClassSelectedFiltersAtom,
  environmentTypeFiltersAtom,
  marketTypeFiltersAtom,
  projectsSortAtom,
  regionFiltersAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { CREDIT_CLASS_FILTERS_TO_DESELECT, IS_REGEN } from 'lib/env';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';

import { Link } from 'components/atoms';
import { GettingStartedResourcesSection } from 'components/molecules';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';

import { PROJECTS_PER_PAGE } from './AllProjects/AllProjects.config';
import { normalizeCreditClassFilters } from './AllProjects/AllProjects.normalizers';
import ProjectFilterBody from './AllProjects/AllProjects.ProjectFilterBody';
import { useFetchCreditClasses } from './hooks/useFetchCreditClasses';
import { useProjects } from './hooks/useProjects';
import { useResetFilters } from './hooks/useResetFilters';
import { normalizeBuyingOptionsFilter } from './Projects.normalizers';

const Projects = (): JSX.Element => {
  const { _ } = useLingui();
  const { page: routePage } = useParams();
  const location = useLocation();
  const [useCommunityProjects, setUseCommunityProjects] = useAtom(
    useCommunityProjectsAtom,
  );
  const [sort] = useAtom(projectsSortAtom);
  const [creditClassSelectedFilters, setCreditClassSelectedFilters] = useAtom(
    creditClassSelectedFiltersAtom,
  );
  const [creditClassInitialFilters, setCreditClassInitialFilters] = useAtom(
    creditClassInitialFiltersAtom,
  );
  const [environmentTypeFilters, setEnvironmentTypeFilters] = useAtom(
    environmentTypeFiltersAtom,
  );
  const [regionFilters, setRegionFilters] = useAtom(regionFiltersAtom);
  const [marketTypeFilters, setMarketTypeFilters] = useAtom(
    marketTypeFiltersAtom,
  );
  const [buyingOptionsFilters, setBuyingOptionsFilterAtom] = useAtom(
    buyingOptionsFiltersAtom,
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
    filteredSellOrders,
    sanityProjects,
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

  const { resetFilters, showResetButton } = useResetFilters();

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

  const { creditClassFilters } = normalizeCreditClassFilters({
    creditClassesWithMetadata,
    sanityCreditClassesData,
    allOnChainProjects,
    haveOffChainProjects,
    _,
  });
  const buyingOptionsFilterOptions = normalizeBuyingOptionsFilter({
    filteredSellOrders,
    sanityProjects,
    _,
  });
  console.log('buyingOptionsFilterOptions', buyingOptionsFilterOptions);

  useEffect(() => {
    // Check all the credit class filters by default
    if (
      Object.keys(creditClassSelectedFilters).length !==
      creditClassFilters.length
    ) {
      const _creditClassInitialFilters = creditClassFilters.reduce(
        (acc, creditClassFilter) => {
          return {
            ...acc,
            [creditClassFilter.path]: CREDIT_CLASS_FILTERS_TO_DESELECT.includes(
              creditClassFilter.path,
            )
              ? false
              : true,
          };
        },
        {},
      );
      setCreditClassInitialFilters(_creditClassInitialFilters);
      setCreditClassSelectedFilters(_creditClassInitialFilters);
    }
  }, [
    creditClassFilters,
    creditClassSelectedFilters,
    setCreditClassInitialFilters,
    setCreditClassSelectedFilters,
  ]);

  return (
    <>
      <div
        className="lg:grid grid-cols-[auto_minmax(310px,750px)] xl:grid-cols-[auto_minmax(310px,1120px)] block justify-center"
        style={{
          background:
            'linear-gradient(90deg, rgba(var(--ac-neutral-0)) 0%, rgba(var(--ac-neutral-0)) 50%, rgba(var(--ac-neutral-100)) 50%, rgba(var(--ac-neutral-100)) 100%)',
          //'rgba(var(--ac-neutral-100))',
        }}
      >
        <div className="w-[310px] py-[43px] px-[20px] hidden lg:block">
          <ProjectFilterBody
            allProjects={allProjects}
            resetFilters={resetFilters}
            showResetButton={showResetButton}
            hasCommunityProjects={hasCommunityProjects}
            creditClassFilters={creditClassFilters}
          />
        </div>
        <div
          className={cn(
            'bg-ac-neutral-100 pt-25 sm:pt-40 px-[16px] md:px-25 sm:25 pb-[80px] sm:pb-[100px] max-w-[1400px] grid gap-[18px] justify-center lg:justify-start grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
            { 'lg:block': projectsCount === 0 },
            { 'h-fit': projectsCount !== 0 },
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
              creditClassFilters,
            }}
          />
        </div>
      </div>
      {gettingStartedResourcesSection && IS_REGEN && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}
    </>
  );
};

export { Projects };
