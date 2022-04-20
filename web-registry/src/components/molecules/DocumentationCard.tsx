import React from 'react';

import { ImageLeftCard } from 'web-components/lib/components/cards/ImageLeftCard';
import {
  Body,
  ButtonText,
  Title,
} from 'web-components/lib/components/typography';
import { Box } from '@mui/material';

const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.REACT_APP_API_URI;

interface DocumentationCardProps {
  mainTitle: string;
  cardTitle: string;
  version?: string;
  program?: string;
  imageSrc: string;
  imageAlt?: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon?: JSX.Element;
  buttonBlankTarget?: boolean;
}

const Detail: React.FC<{ label: string }> = ({ children, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', mr: 4 }}>
    <ButtonText size="xs" mr={1}>
      {label}
    </ButtonText>
    <Body size="sm">{children}</Body>
  </Box>
);

function DocumentationCard({
  mainTitle,
  cardTitle,
  imageSrc,
  imageAlt,
  buttonText,
  buttonUrl,
  buttonBlankTarget,
  buttonIcon,
  version,
  program,
}: DocumentationCardProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mb: 17 }}>
      <Title variant="h3" pb={8}>
        {mainTitle}
      </Title>
      <ImageLeftCard
        title={cardTitle}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        buttonIcon={buttonIcon}
        buttonBlankTarget={buttonBlankTarget}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
      >
        <Box sx={{ display: 'flex' }}>
          {version && <Detail label="version:">{version}</Detail>}
          {program && <Detail label="program:">{program}</Detail>}
        </Box>
      </ImageLeftCard>
    </Box>
  );
}

export { DocumentationCard };
