import React from 'react';
import { Box, Grid } from '@mui/material';

import InfoTooltipWithIcon from 'web-components/lib/components/tooltip/InfoTooltipWithIcon';
import { Body, Label } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';

import { ArrowLink } from '../../atoms/MetadataArrowLink';
import { MetaDetail } from '../MetaDetail';
import {
  PROJECT_PAGE_METADATA_HELPER_TEXT,
  PROJECT_PAGE_METADATA_ID_TOOLTIP,
} from './ProjectPageMetadata.constants';

interface MetadataProps {
  metadata?: AnchoredProjectMetadataLD;
  onChainProjectId?: string;
}

const ProjectPageMetadata: React.FC<React.PropsWithChildren<MetadataProps>> = ({
  metadata,
  onChainProjectId,
}) => {
  if (!metadata) return null;

  // Common
  const startDate = metadata?.['regen:projectStartDate'];
  const endDate = metadata?.['regen:projectEndDate'];
  const projectType = metadata?.['regen:projectType'];

  // VCS
  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  const methodology = metadata?.['regen:vcsMethodology'];

  // CFC
  const cfcProjectId = metadata?.['regen:cfcProjectId'];
  const projectDesignDocument = metadata?.['regen:projectDesignDocument'];

  // Toucan
  const toucanProjectTokenId = metadata?.['regen:toucanProjectTokenId'];

  return (
    <Box
      sx={{
        p: 8,
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'info.light',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Body size="lg">{PROJECT_PAGE_METADATA_HELPER_TEXT}</Body>
      <Box sx={{ pt: 7 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Label size="xs" sx={{ mr: 1 }}>
                project id:
              </Label>
              <InfoTooltipWithIcon
                title={PROJECT_PAGE_METADATA_ID_TOOLTIP}
                outlined
              />
            </Box>
            <Body size="xl">{onChainProjectId}</Body>
          </Grid>
          {methodology && (
            <MetaDetail
              label="methodology"
              data={
                <ArrowLink
                  label={methodology?.['schema:name']}
                  href={methodology?.['schema:url'] || ''}
                />
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
                  href={metadata?.['regen:vcsProjectPage'] || ''}
                />
              }
            />
          )}
          {projectType && (
            <MetaDetail
              label={`${vcsProjectId ? 'vcs ' : ''}project type`}
              data={projectType}
            />
          )}
          {projectDesignDocument && (
            <MetaDetail
              label="documents"
              data={
                <ArrowLink
                  label="Project Design Document"
                  href={projectDesignDocument}
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
                  href={metadata?.['regen:cfcProjectPage'] || ''}
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
    </Box>
  );
};

export { ProjectPageMetadata };
