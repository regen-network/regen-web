import React, { useState } from 'react';
import { Box, Collapse, Grid, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { ProjectMetadataIntersectionLD } from '../../../generated/json-ld';
import { ArrowLink } from '../../atoms/MetadataArrowLink';
import { MetaDetail } from '../MetaDetail';

export interface MetadataProps {
  metadata?: Partial<ProjectMetadataIntersectionLD>;
  projectId?: string;
}

const ProjectPageMetadata: React.FC<React.PropsWithChildren<MetadataProps>> = ({
  metadata,
  projectId,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  if (!metadata || !projectId) {
    return null;
  }

  // Common
  const startDate = metadata?.['regen:projectStartDate']?.['@value'];
  const endDate = metadata?.['regen:projectEndDate']?.['@value'];
  const offsetGenerationMethod =
    metadata?.['regen:offsetGenerationMethod'] ||
    metadata?.['http://regen.network/offsetGenerationMethod'];
  const projectActivity = metadata?.['regen:projectActivity'];
  const projectType = metadata?.['regen:projectType'];

  // VCS
  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  const methodology = metadata?.['regen:vcsMethodology'];

  // CFC
  const cfcProjectId = metadata?.['regen:cfcProjectId'];
  const projectDesignDocument = metadata?.['regen:projectDesignDocument'];
  const offsetProtocol = metadata?.['regen:offsetProtocol'];

  // Toucan
  const toucanProjectTokenId = metadata?.['regen:toucanProjectTokenId'];
  const approvedMethodologies = metadata?.['regen:approvedMethodologies'];
  const methodologyCount = approvedMethodologies?.length;

  return (
    <Box sx={{ pt: 8 }}>
      <Title variant="h5">Additional Info</Title>
      <Collapse collapsedSize={theme.spacing(24)} in={expanded}>
        <Box sx={{ py: 8 }}>
          <Grid container spacing={8}>
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
            {approvedMethodologies && methodologyCount && methodologyCount > 0 && (
              <MetaDetail
                label={`methodolog${methodologyCount > 1 ? 'ies' : 'y'}`}
                data={
                  <>
                    {approvedMethodologies.map(methodology => (
                      <ArrowLink
                        label={methodology?.['schema:name']}
                        href={methodology?.['schema:url']?.['@value'] || ''}
                      />
                    ))}
                  </>
                }
              />
            )}
            {toucanProjectTokenId && (
              <MetaDetail
                label="toucan project token id"
                data={
                  <ArrowLink
                    label={toucanProjectTokenId.toString()}
                    href={metadata?.['regen:toucanURI'] || ''}
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
            {offsetGenerationMethod && (
              <MetaDetail
                label="offset generation method"
                data={offsetGenerationMethod}
              />
            )}
            {projectActivity?.['schema:name'] && (
              <MetaDetail
                label="project activity"
                data={
                  <ArrowLink
                    href={projectActivity?.['schema:url']?.['@value'] || ''}
                    label={projectActivity?.['schema:name']}
                  />
                }
              />
            )}
            {projectType && (
              <MetaDetail
                label={`${vcsProjectId ? 'vcs ' : ''}project type`}
                data={metadata?.['regen:projectType']}
              />
            )}
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
            {startDate && (
              <MetaDetail
                label="project start date"
                data={formatDate(startDate)}
              />
            )}
            {endDate && (
              <MetaDetail label="project end date" data={formatDate(endDate)} />
            )}
          </Grid>
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

export { ProjectPageMetadata };
