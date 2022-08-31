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
    () =>
      ecocreditData?.projects?.filter(
        project => project.metadata && project.id !== projectId,
      ),
    [ecocreditData?.projects, projectId],
  );

  const projectsSelection = useMemo(
    () => _.shuffle(projects).slice(0, PROJECTS_LIMIT),
    [projects],
  );

  const { projectsWithOrderData } = useProjectsSellOrders({
    projects: projectsSelection,
    sellOrders,
  });

  return projectsWithOrderData;
}
