import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { CFCProjectMetadataLD } from '../../../generated/json-ld';
import { ArrowLink } from '../../atoms/MetadataArrowLink';
import { MetaDetail } from './ProjectMetadata.MetaDetail';

export interface CFCMetadataProps {
  metadata?: Partial<CFCProjectMetadataLD>;
  projectId?: string;
}

const ProjectMetadataCFC: React.FC<CFCMetadataProps> = ({
  metadata,
  projectId,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const cfcProjectId = metadata?.['regen:cfcProjectId'];

  if (!metadata || !cfcProjectId) {
    return null;
  }

  const startDate = metadata?.['regen:projectStartDate']?.['@value'];
  const endDate = metadata?.['regen:projectEndDate']?.['@value'];
  const offsetProtocol = metadata?.['regen:offsetProtocol'];
  const projectDesignDocument = metadata?.['regen:projectDesignDocument'];
  const projectActivity = metadata?.['regen:projectActivity'];

  return (
    <Box sx={{ pt: 8 }}>
      <Title variant="h5">Additional Info</Title>
      <Collapse collapsedSize={theme.spacing(24)} in={expanded}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            pt: 8,
          }}
        >
          <MetaDetail label="project id" data={projectId} />
          {projectDesignDocument && (
            <MetaDetail
              label="documents"
              data={
                <ArrowLink
                  label="Project Design Document"
                  href={String(projectDesignDocument?.['@value']) || ''}
                />
              }
            />
          )}
          <MetaDetail
            label="offset generation method"
            data={
              metadata?.['regen:offsetGenerationMethod'] ||
              metadata?.['http://regen.network/offsetGenerationMethod']
            }
          />
          {projectActivity?.['schema:name'] && (
            <MetaDetail
              label="project activity"
              data={
                <ArrowLink
                  label={projectActivity?.['schema:name']}
                  href={projectActivity?.['schema:url']?.['@value'] || ''}
                />
              }
            />
          )}
          {cfcProjectId && (
            <MetaDetail
              label="reference id (cfc project id)"
              data={
                <ArrowLink
                  label={cfcProjectId}
                  href={metadata?.['regen:cfcProjectPage']?.['@value'] || ''}
                />
              }
            />
          )}
          {offsetProtocol && (
            <MetaDetail
              label="offset protocol"
              data={
                <ArrowLink
                  label={offsetProtocol?.['schema:name']}
                  href={offsetProtocol?.['schema:url']?.['@value'] || ''}
                />
              }
            />
          )}
          <MetaDetail
            label="project type"
            data={metadata?.['regen:projectType']}
          />
          {startDate && (
            <MetaDetail
              label="project start date"
              data={formatDate(startDate)}
            />
          )}
          {endDate && (
            <MetaDetail label="project end date" data={formatDate(endDate)} />
          )}
        </Box>
      </Collapse>
      <ExpandButton
        sx={{
          mt: 2,
          px: [0],
          ':hover': { bgcolor: 'transparent !important' },
        }}
        onClick={() => setExpanded(!expanded)}
        text="see"
        size="small"
        expanded={expanded}
      />
    </Box>
  );
};

export { ProjectMetadataCFC };
