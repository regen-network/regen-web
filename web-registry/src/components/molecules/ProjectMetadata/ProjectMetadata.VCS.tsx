import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { VCSProjectMetadataLD } from '../../../generated/json-ld';
import { ArrowLink } from '../../atoms/MetadataArrowLink';
import { MetaDetail } from './ProjectMetadata.MetaDetail';

export interface MetadataProps {
  metadata?: Partial<VCSProjectMetadataLD>;
  projectId?: string;
}

const ProjectMetadataVCS: React.FC<MetadataProps> = ({
  metadata,
  projectId,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const vcsProjectId = metadata?.['regen:vcsProjectId'];

  if (!metadata || !projectId) {
    return null;
  }

  const startDate = metadata?.['regen:projectStartDate']?.['@value'];
  const endDate = metadata?.['regen:projectEndDate']?.['@value'];
  const methodology = metadata?.['regen:vcsMethodology'];

  return (
    <Box sx={{ pt: 8 }}>
      <Title variant="h5">Additional Metadata</Title>
      <Collapse collapsedSize={theme.spacing(24)} in={expanded}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            pt: 8,
          }}
        >
          <MetaDetail label="project id" data={projectId} />
          {methodology && (
            <MetaDetail
              label="methodology"
              data={
                <ArrowLink
                  label={methodology?.['schema:name']}
                  href={methodology?.['schema:url']?.['@value'] || ''}
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
          {metadata?.['regen:projectActivity']?.['schema:name'] && (
            <MetaDetail
              label="project activity"
              data={
                <ArrowLink
                  href={
                    metadata?.['regen:projectActivity']?.['schema:url']?.[
                      '@value'
                    ] || ''
                  }
                  label={metadata?.['regen:projectActivity']?.['schema:name']}
                />
              }
            />
          )}
          {vcsProjectId && (
            <MetaDetail
              label="vcs project id"
              data={
                <ArrowLink
                  label={vcsProjectId.toString()}
                  href={metadata?.['regen:vcsProjectPage']?.['@value'] || ''}
                />
              }
            />
          )}
          <MetaDetail
            label="vcs project type"
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

export { ProjectMetadataVCS };
