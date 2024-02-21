import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';

import { IconTabProps } from 'web-components/src/components/tabs/IconTab';
import { IconTabs } from 'web-components/src/components/tabs/IconTabs';
import { Title } from 'web-components/src/components/typography';

import { useAllProjectsPageQuery } from 'generated/sanity-graphql';
import {
  creditClassSelectedFiltersAtom,
  projectsSortAtom,
  useCommunityProjectsAtom,
} from 'lib/atoms/projects.atoms';
import { client as sanityClient } from 'lib/clients/sanity';

import { Link } from 'components/atoms';
import { GettingStartedResourcesSection } from 'components/molecules';

import { useProjects } from './AllProjects/hooks/useProjects';

const Projects = (): JSX.Element => {
  const location = useLocation();
  const [useCommunityProjects] = useAtom(useCommunityProjectsAtom);
  const [sort] = useAtom(projectsSortAtom);
  const [creditClassSelectedFilters] = useAtom(creditClassSelectedFiltersAtom);

  const { prefinanceProjectsCount, projectsCount } = useProjects({
    sort,
    useCommunityProjects,
    creditClassFilter: creditClassSelectedFilters,
  });

  const tabs: IconTabProps[] = useMemo(
    () => [
      {
        label: (
          <Title variant="h4">
            All projects{' '}
            <span className="font-medium text-grey-400">({projectsCount})</span>
          </Title>
        ),
        href: '/projects/1',
      },
      {
        hidden: !prefinanceProjectsCount,
        label: (
          <Title variant="h4">
            Prefinance projects{' '}
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

  return (
    <>
      <div className="bg-grey-100 pt-25 sm:pt-40 px-15 sm:25">
        <div className="max-w-[1400px] m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,400px))] gap-[18px] justify-center">
          <IconTabs
            className="col-[1/-1]"
            aria-label="projects tabs"
            tabs={tabs}
            activeTab={activeTab}
            linkComponent={Link}
            mobileFullWidth
          />

          <Outlet />
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
