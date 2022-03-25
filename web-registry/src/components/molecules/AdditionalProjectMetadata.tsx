import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import Title from 'web-components/lib/components/title';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { formatDate } from 'web-components/lib/utils/format';

import { LinkWithArrow } from '../atoms';
import { LineItemLabelAbove, LineItemLabelAboveProps } from '../molecules';
import { VcsProjectMetadataLD } from '../../types/project/vcs-project';

export interface MetadataProps {
  metadata?: VcsProjectMetadataLD;
}

const AdditionalProjectMetadata: React.FC<MetadataProps> = ({ metadata }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const projectId = metadata?.['http://regen.network/vcsProjectId']?.['@value'];

  if (!metadata || !projectId) {
    return null;
  }

  const additionalCertification =
    metadata?.['http://regen.network/additionalCertification'];
  const startDate =
    metadata?.['http://regen.network/projectStartDate']?.['@value'];
  const endDate = metadata?.['http://regen.network/projectEndDate']?.['@value'];

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
          <LineItem
            label="offset generation method"
            data={metadata?.['http://regen.network/offsetGenerationMethod']}
          />
          {metadata?.['http://regen.network/projectActivity']?.[
            'http://schema.org/name'
          ] && (
            <LineItem
              label="project activity"
              data={
                <LinkWithArrow
                  link={
                    metadata?.['http://regen.network/projectActivity']?.[
                      'http://schema.org/url'
                    ]?.['@value']
                  }
                  label={
                    metadata?.['http://regen.network/projectActivity']?.[
                      'http://schema.org/name'
                    ]
                  }
                />
              }
            />
          )}
          {projectId && (
            <LineItem
              label="vcs project id"
              data={
                <LinkWithArrow
                  label={projectId.toString()}
                  link={
                    metadata?.['http://regen.network/vcsProjectPage']?.[
                      '@value'
                    ]
                  }
                />
              }
            />
          )}
          <LineItem
            label="vcs project type"
            data={metadata?.['http://regen.network/vcsProjectType']}
          />
          <LineItem
            label="project start date"
            data={!!startDate && formatDate(startDate)}
          />
          <LineItem
            label="project end date"
            data={!!endDate && formatDate(endDate)}
          />
          {additionalCertification && (
            <LineItem
              label="additional certification"
              data={
                <LinkWithArrow
                  link={
                    additionalCertification?.['http://schema.org/url']?.[
                      '@value'
                    ]
                  }
                  label={additionalCertification?.['http://schema.org/name']}
                />
              }
            />
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
