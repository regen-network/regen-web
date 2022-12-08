import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material';
import { spacing } from 'styles/spacing';

import { Flex } from 'web-components/lib/components/box';
import { ProjectCard } from 'web-components/lib/components/cards/ProjectCard';
import SelectTextFieldBase from 'web-components/lib/components/inputs/SelectTextFieldBase';
import { Loading } from 'web-components/lib/components/loading';
import { Pagination } from 'web-components/lib/components/pagination/Pagination';
import { Body, Subtitle } from 'web-components/lib/components/typography';
import { pxToRem } from 'web-components/lib/theme/muiTheme';

import { useAllProjectsPageQuery } from 'generated/sanity-graphql';
import { client as sanityClient } from 'sanity';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { GettingStartedResourcesSection } from 'components/molecules';

import { useProjects } from './hooks/useProjects';
import {
  API_URI,
  IMAGE_STORAGE_BASE_URL,
  PROJECTS_PER_PAGE,
  sortOptions,
} from './Projects.config';
import { ProjectWithOrderData } from './Projects.types';

export const Projects: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { page: routePage } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Page index starts at 1 for route
  // Page index starts at 0 for logic
  const page = Number(routePage) - 1;

  const { data: sanityProjectsPageData } = useAllProjectsPageQuery({
    client: sanityClient,
  });
  const gettingStartedResourcesSection =
    sanityProjectsPageData?.allProjectsPage?.[0]
      ?.gettingStartedResourcesSection;

  const [sort, setSort] = useState<string>(sortOptions[0].value);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData | null>(null);

  const { projects, projectsCount, pagesCount, loading } = useProjects({
    sort,
    offset: page * PROJECTS_PER_PAGE,
  });

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);

  const handleSort = (event: SelectChangeEvent<unknown>): void => {
    setSort(event.target.value as string);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Flex
        sx={{
          bgcolor: 'grey.50',
          borderTop: 1,
          borderColor: 'grey.100',
          pt: 8.75,
          pb: { xs: 8.75, md: 43.5 },
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
                <Body size="lg"> ({projectsCount})</Body>
              </Flex>
              <Flex
                alignItems="center"
                sx={{ width: { xs: '60%', md: 'auto' } }}
              >
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
                onClick={() => navigate(`/project/${project.id}`)}
                imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                apiServerUrl={API_URI}
                truncateTitle={true}
                sx={{ width: 400, height: 479 }}
              />
            </Box>
          ))}
          <Flex
            sx={{
              gridColumn: '1/-1',
              mt: pxToRem(28),
              justifyContent: { xs: 'center', tablet: 'end' },
            }}
          >
            <Pagination
              count={pagesCount}
              page={Number(routePage)}
              onChange={(event, value) => navigate(`/projects/${value}`)}
              size={isMobile ? 'small' : 'large'}
            />
          </Flex>
        </Box>
        <BuySellOrderFlow
          isFlowStarted={isBuyFlowStarted}
          setIsFlowStarted={setIsBuyFlowStarted}
          projects={selectedProject && [selectedProject]}
        />
      </Flex>
      {gettingStartedResourcesSection && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}
    </>
  );
};
