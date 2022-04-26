import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import { Title } from 'web-components/lib/components/typography';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { formatDate } from 'web-components/lib/utils/format';

import { LinkWithArrow, LinkWithArrowProps } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '../molecules';
import { VCSProjectMetadataLD } from '../../generated/json-ld';

export interface MetadataProps {
  metadata?: VCSProjectMetadataLD;
}

const AdditionalProjectMetadata: React.FC<MetadataProps> = ({ metadata }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const projectId = metadata?.['regen:vcsProjectId']?.['@value'];

  if (!metadata || !projectId) {
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
      <Title variant="h5">Additional Metadata</Title>
      <Collapse collapsedSize={theme.spacing(24)} in={expanded}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            pt: 8,
          }}
        >
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
                    ]
                  }
                  label={metadata?.['regen:projectActivity']?.['schema:name']}
                />
              }
            />
          )}
          {projectId && (
            <LineItem
              label="vcs project id"
              data={
                <ArrowLink
                  label={projectId.toString()}
                  href={metadata?.['regen:vcsProjectPage']?.['@value']}
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
          pl: '0px !important',
          pr: '0px !important',
          '& p, svg': { fontSize: { xs: '12px' } },
          '&:hover': { bgcolor: 'transparent !important' },
        }}
        onClick={() => setExpanded(!expanded)}
        text="see"
        expanded={expanded}
      />
    </Box>
  );
};

export { AdditionalProjectMetadata };
