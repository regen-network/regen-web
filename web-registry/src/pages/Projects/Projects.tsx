import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, SelectChangeEvent } from '@mui/material';
import { QueryProjectsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { Body, Subtitle } from 'web-components/lib/components/typography';

import {
  fetchSimplePrice,
  GECKO_REGEN_ID,
  GECKO_USD_CURRENCY,
} from 'lib/coingecko';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow';

import useEcocreditQuery from '../../hooks/useEcocreditQuery';
import { useQuerySellOrders } from '../../hooks/useQuerySellOrders';
import { useProjectsSellOrders } from './hooks/useProjectsSellOrders';
import { useSortProjects } from './hooks/useSortProjects';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  sortOptions,
} from './Projects.config';
import { ProjectWithOrderData } from './Projects.types';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);
  const { data, loading } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });
  const regenPriceQuery = useQuery(['regenPrice'], () =>
    fetchSimplePrice({ ids: GECKO_REGEN_ID, vsCurrencies: GECKO_USD_CURRENCY }),
  );
  const { sellOrdersResponse } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const projects = data?.projects;
  const { projectsWithOrderData, loading: loadingOrders } =
    useProjectsSellOrders({
      projects,
      sellOrders,
      regenPrice: regenPriceQuery?.data?.regen?.usd,
    });

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  const sortedProjects = useSortProjects({
    projects: projectsWithOrderData,
    sort,
  });

  if (loading || loadingOrders) return <Loading />;
  return (
    <Flex
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderColor: 'grey.100',
        px: [6, 8.75],
        pt: 8.75,
        pb: 25,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 338px))',
          gridGap: '1.125rem',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Flex flex={1} sx={{ gridColumn: '1 / -1' }}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            sx={{ pb: 5 }}
          >
            <Flex>
              <Subtitle size="lg">Projects</Subtitle>
              <Body size="lg"> ({projectsWithOrderData.length})</Body>
            </Flex>
            <Flex alignItems="center" sx={{ width: ['60%', 'auto'] }}>
              <Box sx={{ width: [0, 63], visibility: ['hidden', 'visible'] }}>
                <Body size="xs">Sort by:</Body>
              </Box>
              <SelectTextFieldBase
                options={sortOptions}
                defaultStyle={false}
                onChange={handleSort}
              />
            </Flex>
          </Flex>
        </Flex>
        {sortedProjects?.map(project => (
          <Box key={project?.id}>
            <ProjectCard
              name={project?.name}
              imgSrc={project?.imgSrc}
              place={project?.place}
              area={project?.area}
              areaUnit={project?.areaUnit}
              onButtonClick={() => setSelectedProject(project)}
              purchaseInfo={project.purchaseInfo}
              onClick={() => navigate(`/projects/${project.id}`)}
              imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
              apiServerUrl={API_URI}
              truncateTitle={true}
              sx={{ width: 338, height: 479 }}
            />
          </Box>
        ))}
      </Box>
      <BuySellOrderFlow selectedProject={selectedProject} />
    </Flex>
  );
};
