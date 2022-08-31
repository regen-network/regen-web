import { useMemo } from 'react';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import _ from 'lodash';

import { useProjectsSellOrders } from 'pages/Projects/hooks/useProjectsSellOrders';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { useEcocreditQuery } from 'hooks';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

const PROJECTS_LIMIT = 3;

export default function useOtherProjects(
  projectId: string,
): ProjectWithOrderData[] {
  const { data: ecocreditData } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });

  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  const projects = useMemo(
    () => ecocreditData?.projects?.filter(project => project.id !== projectId),
    [ecocreditData?.projects, projectId],
  );

  const { projectsWithOrderData } = useProjectsSellOrders({
    projects,
    sellOrders,
  });

  const projectsWithSellOrders = useMemo(
    () =>
      projectsWithOrderData.filter(project => project.sellOrders.length > 0),
    [projectsWithOrderData],
  );

  const projectsSelected = useMemo(() => {
    const _projectsSelected = [];
    if (projectsWithSellOrders.length > 0) {
      _projectsSelected.push(
        ..._.shuffle(projectsWithSellOrders).slice(0, PROJECTS_LIMIT),
      );
    }

    if (_projectsSelected.length < PROJECTS_LIMIT) {
      _projectsSelected.push(
        ..._.shuffle(projectsWithOrderData).slice(
          0,
          PROJECTS_LIMIT - _projectsSelected.length,
        ),
      );
    }

    return _projectsSelected;
  }, [projectsWithSellOrders, projectsWithOrderData]);

  return projectsSelected;
}
