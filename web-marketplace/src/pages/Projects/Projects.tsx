import { useMemo } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';

import {
  useAllProjectsPageQuery,
  useAllSoldOutProjectsQuery,
} from 'generated/sanity-graphql';
import {
  creditClassSelectedFiltersAtom,
  projectsSortAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { client as sanityClient } from 'lib/clients/sanity';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';

import { Link } from 'components/atoms';
import { GettingStartedResourcesSection } from 'components/molecules';
import { useAllSoldOutProjectsIds } from 'components/organisms/ProjectCardsSection/hooks/useSoldOutProjectsIds';

import { PROJECTS_PER_PAGE } from './AllProjects/AllProjects.config';
import { useProjects } from './hooks/useProjects';

const Projects = (): JSX.Element => {
  const { _ } = useLingui();
  const { page: routePage } = useParams();
  const location = useLocation();
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const [sort] = useAtom(projectsSortAtom);
  const [creditClassSelectedFilters] = useAtom(creditClassSelectedFiltersAtom);

  const { data: allHomePageData, isFetching: isFetchingAllHomePage } = useQuery(
    getAllHomePageQuery({ sanityClient, enabled: !!sanityClient }),
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

  return (
    <>
      <div className="bg-grey-100 pt-25 sm:pt-40 px-15 sm:25 pb-[80px] sm:pb-[100px]">
        <div className="max-w-[1400px] m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-[18px] justify-center">
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
      {gettingStartedResourcesSection && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}
    </>
  );
};

export { Projects };
