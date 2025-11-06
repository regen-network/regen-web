'use client';

import { Box, Skeleton, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { ProjectCardBodyTextsMapping } from 'web-components/src/components/cards/ProjectCard/ProjectCard.types';

import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';

import { JURISDICTION_REGEX } from './ProjectDetails.constant';
import { parseMedia, ParseMediaParams } from './ProjectDetails.Media.utils';

const ProjectMedia = dynamic(
  () => import('web-components/src/components/sliders/ProjectMedia'),
  {
    loading: () => <Skeleton className="h-[224px] sm:h-[400px]" />,
    ssr: false,
  },
);

type Props = ParseMediaParams & {
  jurisdiction?: string;
  isPrefinanceProject?: boolean | null;
  bodyTexts: ProjectCardBodyTextsMapping;
};

function Media({
  onChainProjectMetadata,
  offChainProjectMetadata,
  geojson,
  jurisdiction,
  bodyTexts,
  isPrefinanceProject,
}: Props): JSX.Element {
  const theme = useTheme();

  const countryCodeMatch = jurisdiction?.match(JURISDICTION_REGEX);
  const countryCode = countryCodeMatch?.[3] || countryCodeMatch?.[1];

  const { data: geocodingJurisdictionData } = useQuery(
    getGeocodingQuery({
      request: { query: countryCode },
      enabled: !!countryCode,
    }),
  );

  const mediaData = parseMedia({
    onChainProjectMetadata,
    offChainProjectMetadata,
    geojson,
    geocodingJurisdictionData,
  });

  return (
    <>
      {mediaData.assets.length > 0 && (
        <Box sx={{ pt: { xs: 0, sm: 12.5 } }}>
          <ProjectMedia
            bodyTexts={bodyTexts}
            gridView
            assets={mediaData.assets}
            apiServerUrl={mediaData.apiServerUrl}
            imageStorageBaseUrl={mediaData.imageStorageBaseUrl}
            imageCredits={mediaData.imageCredits}
            isPrefinanceProject={isPrefinanceProject}
          />
        </Box>
      )}
    </>
  );
}

export { Media };
