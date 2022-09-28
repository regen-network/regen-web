import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { CFCProjectMetadataLD } from '../../generated/json-ld';
import { LinkWithArrow, LinkWithArrowProps } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '.';

export interface CFCMetadataProps {
  metadata?: CFCProjectMetadataLD;
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

  const LineItem = (props: LineItemLabelAboveProps): JSX.Element => (
    <LineItemLabelAbove sx={{ mb: { xs: 6, sm: 8 } }} {...props} />
  );

  const ArrowLink = (props: LinkWithArrowProps): JSX.Element => (
    <LinkWithArrow sx={{ fontSize: { xs: '18px', sm: '22px' } }} {...props} />
  );

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
          <LineItem label="project id" data={projectId} />
          <LineItem
            label="documents"
            data={
              <ArrowLink
                label="Project Design Document"
                href={
                  metadata?.['regen:projectDesignDocument']?.['@value'] || ''
                }
              />
            }
          />
          <LineItem
            label="offset generation method"
            data={metadata?.['regen:offsetGenerationMethod']}
          />
          {metadata?.['regen:projectActivity']?.['schema:name'] && (
            <LineItem
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
          {cfcProjectId && (
            <LineItem
              label="reference id (cfc project id)"
              data={
                <ArrowLink
                  label={cfcProjectId}
                  href={metadata?.['regen:cfcProjectPage']?.['@value'] || ''}
                />
              }
            />
          )}
          <LineItem
            label="project type"
            data={metadata?.['regen:projectType']}
          />
          {startDate && (
            <LineItem label="project start date" data={formatDate(startDate)} />
          )}
          {endDate && (
            <LineItem label="project end date" data={formatDate(endDate)} />
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
