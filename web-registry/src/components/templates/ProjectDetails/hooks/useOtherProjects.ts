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
    const _projectsSelected: ProjectWithOrderData[] = [];
    // first, selection of projects with sell orders
    if (projectsWithSellOrders.length > 0) {
      _projectsSelected.push(
        ..._.shuffle(projectsWithSellOrders).slice(0, PROJECTS_LIMIT),
      );
    }

    // if no selection of projects with sell orders
    if (_projectsSelected.length === 0)
      return _.shuffle(projectsWithOrderData).slice(0, PROJECTS_LIMIT);

    // if selection is more than necessary
    if (_projectsSelected.length > PROJECTS_LIMIT)
      return _.shuffle(_projectsSelected).slice(0, PROJECTS_LIMIT);

    // if there are projects in the selection, but they are not enough for the limit
    if (_projectsSelected.length < PROJECTS_LIMIT) {
      const numProjects = PROJECTS_LIMIT - _projectsSelected.length;
      const additionalProjects = projectsWithOrderData.filter(
        p1 => !_projectsSelected.some(p2 => p1.id === p2.id),
      );
      _projectsSelected.push(
        ..._.shuffle(additionalProjects).slice(0, numProjects),
      );
    }

    return _projectsSelected;
  }, [projectsWithSellOrders, projectsWithOrderData]);

  return projectsSelected;
}
