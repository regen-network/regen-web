import React from 'react';
import { Box, Grid } from '@mui/material';

import InfoTooltipWithIcon from 'web-components/src/components/tooltip/InfoTooltipWithIcon';
import { Body, Label } from 'web-components/src/components/typography';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import {
  getFieldLabel,
  getFieldType,
  getProjectUnknownFields,
} from 'lib/rdf/rdf.unknown-fields';

import { MetaDetail } from '../MetaDetail/MetaDetail';
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
  if (!onChainProjectId && !metadata) return null;

  // Common
  const startDate = metadata?.['regen:projectStartDate'];
  const endDate = metadata?.['regen:projectEndDate'];
  const projectType = metadata?.['regen:projectType'];

  // VCS
  const vcsProjectId = metadata?.['regen:vcsProjectId'];

  // CFC
  const cfcProjectId = metadata?.['regen:cfcProjectId'];
  const projectDesignDocument = metadata?.['regen:projectDesignDocument'];

  // Toucan
  const toucanProjectTokenId = metadata?.['regen:toucanProjectTokenId'];

  const unknownFields = metadata ? getProjectUnknownFields(metadata) : [];

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
      {metadata && (
        <Body sx={{ pb: 7 }} size="lg">
          {PROJECT_PAGE_METADATA_HELPER_TEXT}
        </Body>
      )}
      <Box>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} sx={{ flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Label size="xs" sx={{ mr: 1 }}>
                project id
              </Label>
              <InfoTooltipWithIcon
                title={PROJECT_PAGE_METADATA_ID_TOOLTIP}
                outlined
              />
            </Box>
            <Body size="xl">{onChainProjectId}</Body>
          </Grid>

          <MetaDetail
            label="toucan project token id"
            value={
              toucanProjectTokenId && {
                'schema:name': toucanProjectTokenId.toString(),
                'schema:url': metadata?.['regen:toucanURI'],
              }
            }
          />
          <MetaDetail
            label="vcs project id"
            value={
              vcsProjectId && {
                'schema:name': vcsProjectId.toString(),
                'schema:url': metadata?.['regen:vcsProjectPage'],
              }
            }
          />
          <MetaDetail
            label={`${vcsProjectId ? 'vcs ' : ''}project type`}
            value={projectType}
          />
          <MetaDetail
            label="documents"
            value={
              projectDesignDocument && {
                'schema:name': 'Project Design Document',
                'schema:url': projectDesignDocument,
              }
            }
          />
          <MetaDetail
            label="reference id (cfc project id)"
            value={
              cfcProjectId && {
                'schema:name': cfcProjectId,
                'schema:url': metadata?.['regen:cfcProjectPage'],
              }
            }
          />
          <MetaDetail
            label="project start date"
            value={startDate}
            rdfType={getFieldType(
              'regen:projectStartDate',
              metadata?.['@context'],
            )}
          />
          <MetaDetail
            label="project end date"
            value={endDate}
            rdfType={getFieldType(
              'regen:projectEndDate',
              metadata?.['@context'],
            )}
          />
          {unknownFields.map(([fieldName, value]) => (
            <MetaDetail
              key={fieldName}
              label={getFieldLabel(fieldName)}
              value={value}
              rdfType={getFieldType(fieldName, metadata?.['@context'])}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export { ProjectPageMetadata };
