import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import { VCSProjectMetadataLD } from '../../generated/json-ld';
import { LinkWithArrow } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '.';

export interface MetadataProps {
  metadata?: Partial<VCSProjectMetadataLD>;
}

const ProjectMetadataVCS: React.FC<MetadataProps> = ({ metadata }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const projectId = metadata?.['regen:vcsProjectId'];

  if (!metadata || !projectId) {
    return null;
  }

  const startDate = metadata?.['regen:projectStartDate']?.['@value'];
  const endDate = metadata?.['regen:projectEndDate']?.['@value'];
  const methodology = metadata?.['regen:vcsMethodology'];

  const LineItem = (props: LineItemLabelAboveProps): JSX.Element => (
    <LineItemLabelAbove sx={{ mb: { xs: 6, sm: 8 } }} {...props} />
  );

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
          {projectId && (
            <LineItem
              label="vcs project id"
              data={
                <LinkWithArrow
                  label={projectId.toString()}
                  href={metadata?.['regen:vcsProjectPage']?.['@value'] || ''}
                />
              }
            />
          )}
          {methodology && (
            <LineItem
              label="methodology"
              data={
                <LinkWithArrow
                  label={methodology?.['schema:name']}
                  href={methodology?.['schema:url']?.['@value'] || ''}
                />
              }
            />
          )}
          <LineItem
            label="offset generation method"
            data={metadata?.['regen:offsetGenerationMethod']}
          />
          {metadata?.['regen:projectActivity']?.['schema:name'] && (
            <LineItem
              label="project activity"
              data={
                <LinkWithArrow
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
          <LineItem
            label="vcs project type"
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

export { ProjectMetadataVCS };
