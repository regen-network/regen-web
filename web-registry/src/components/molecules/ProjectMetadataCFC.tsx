import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { CFCProjectMetadataLD } from '../../generated/json-ld';
import { LinkWithArrow } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '.';

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

  const LineItem = (props: LineItemLabelAboveProps): JSX.Element => (
    <LineItemLabelAbove sx={{ mb: { xs: 6, sm: 8 } }} {...props} />
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
              <LinkWithArrow
                label="Project Design Document"
                href={metadata?.['regen:projectDesignDocument'] || ''}
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
                <LinkWithArrow
                  label={metadata?.['regen:projectActivity']?.['schema:name']}
                  href={
                    metadata?.['regen:projectActivity']?.['schema:url']?.[
                      '@value'
                    ] || ''
                  }
                />
              }
            />
          )}
          {cfcProjectId && (
            <LineItem
              label="reference id (cfc project id)"
              data={
                <LinkWithArrow
                  label={cfcProjectId}
                  href={metadata?.['regen:cfcProjectPage'] || ''}
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
