import { useMemo } from 'react';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { useEcocreditQuery } from 'hooks';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';
// import { useMoreProjectsQuery } from '../../../../generated/graphql';

const PROJECTS_COUNT = 3;

// TODO - just offchain projects, missing onchain

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export default function useOtherProjects(projectId: string) {
//   const { data: projectsData } = useMoreProjectsQuery();
//   const allProjects = projectsData?.allProjects?.nodes;
//   return allProjects?.filter(p => p?.handle !== projectId);
// }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useOtherProjects(projectId: string) {
  const { data: ecocreditData } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const projects = useMemo(
    () => ecocreditData?.projects?.filter(project => project.metadata),
    [ecocreditData?.projects],
  );

  const { projectsWithOrderData, loading: loadingProjects } =
    useProjectsSellOrders({
      projects,
      sellOrders,
      limit: PROJECTS_COUNT,
    });
  // const sortedProjects = useSortProjects({
  //   projects: projectsWithOrderData,
  //   sort: PROJECTS_SORT,
  // });

  // eslint-disable-next-line no-console
  console.log('projectsWithOrderData', loadingProjects, projectsWithOrderData);
  return projectsWithOrderData;
}
