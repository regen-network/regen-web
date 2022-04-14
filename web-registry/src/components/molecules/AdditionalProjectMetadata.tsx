import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import Title from 'web-components/lib/components/title';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { formatDate } from 'web-components/lib/utils/format';

import { LinkWithArrow, LinkWithArrowProps } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '../molecules';
import { VcsProjectMetadataLD } from '../../types/project/vcs-project';

export interface MetadataProps {
  // metadata?: VcsProjectMetadataLD;
  metadata?: any;
}

const AdditionalProjectMetadata: React.FC<MetadataProps> = ({ metadata }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  if (!metadata) return null;
  const projectId =
    metadata?.['http://regen.network/vcsProjectId']?.[0]?.['@value'];

  console.log('metadata ', metadata);
  console.log('projectId ', projectId);
  if (!projectId) return null;

  const startDate =
    metadata?.['http://regen.network/projectStartDate']?.[0]?.['@value'];
  const endDate =
    metadata?.['http://regen.network/projectEndDate']?.[0]?.['@value'];

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
            data={
              metadata?.['http://regen.network/offsetGenerationMethod']?.[0]?.[
                '@value'
              ]
            }
          />
          {!!metadata?.['http://regen.network/projectActivity']?.[0]?.[
            'http://schema.org/name'
          ] && (
            <LineItem
              label="project activity"
              data={
                <ArrowLink
                  href={
                    metadata?.['http://regen.network/projectActivity']?.[0]?.[
                      'http://schema.org/url'
                    ]?.[0]?.['@value']
                  }
                  label={
                    metadata?.['http://regen.network/projectActivity']?.[0]?.[
                      'http://schema.org/name'
                    ]?.[0]?.['@value']
                  }
                />
              }
            />
          )}
          {!!projectId && (
            <LineItem
              label="vcs project id"
              data={
                <ArrowLink
                  label={projectId.toString()}
                  href={
                    metadata?.['http://regen.network/vcsProjectPage']?.[0]?.[
                      '@value'
                    ]
                  }
                />
              }
            />
          )}
          <LineItem
            label="vcs project type"
            data={
              metadata?.['http://regen.network/vcsProjectType']?.[0]?.['value']
            }
          />
          {!!startDate && (
            <LineItem label="project start date" data={formatDate(startDate)} />
          )}
          {!!startDate && (
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
