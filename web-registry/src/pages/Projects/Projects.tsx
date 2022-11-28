import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, SelectChangeEvent } from '@mui/material';
import { spacing } from 'styles/spacing';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { Body, Subtitle } from 'web-components/lib/components/typography';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';

import { useProjects } from './hooks/useProjects';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  sortOptions,
} from './Projects.config';
import { ProjectWithOrderData } from './Projects.types';

export const Projects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);

  const { projects, loading } = useProjects(sort);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  if (loading) return <Loading />;

  return (
    <Flex
      sx={{
        bgcolor: 'grey.50',
        borderTop: 1,
        borderColor: 'grey.100',
        py: [6, 8.75],
        pt: 8.75,
        pb: 25,
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))',
          gridGap: '1.125rem',
          flex: 1,
          justifyContent: 'center',
          maxWidth: theme => ({
            xs: '100%',
            lg: theme.typography.pxToRem(1400),
          }),
          ...spacing.header,
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
              <Body size="lg"> ({projects.length})</Body>
            </Flex>
            <Flex alignItems="center" sx={{ width: { xs: '60%', md: 'auto' } }}>
              <Box
                sx={{
                  width: [0, 0, 63],
                  visibility: { xs: 'hidden', md: 'visible' },
                }}
              >
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
        {projects?.map(project => (
          <Box key={project?.id}>
            <ProjectCard
              id={project?.id}
              name={project?.name}
              creditClassId={project?.creditClassId}
              imgSrc={project?.imgSrc}
              place={project?.place}
              area={project?.area}
              areaUnit={project?.areaUnit}
              onButtonClick={() => {
                setSelectedProject(project);
                setIsBuyFlowStarted(true);
              }}
              purchaseInfo={project.purchaseInfo}
              onClick={() => navigate(`/projects/${project.id}`)}
              imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
              apiServerUrl={API_URI}
              truncateTitle={true}
              sx={{ width: 400, height: 479 }}
            />
          </Box>
        ))}
      </Box>
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        selectedProject={selectedProject}
      />
    </Flex>
  );
};
