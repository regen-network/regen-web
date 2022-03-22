import React, { useState } from 'react';
import { Box, Collapse, useTheme } from '@mui/material';
import Title from 'web-components/lib/components/title';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { formatDate } from 'web-components/lib/utils/format';

import { LinkWithArrow } from '../atoms';
import { LineItemLabelAbove } from '.';
import { VcsProjectMetadataLD } from '../../types/project/vcs-project';

export interface MetadataProps {
  metadata?: VcsProjectMetadataLD;
  creditClass?: any;
  creditClassVersion?: any;
  additionalCertification?: any;
}

const AdditionalProjectMetadata: React.FC<MetadataProps> = ({
  metadata,
  creditClass,
  creditClassVersion,
  additionalCertification,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  if (!metadata) return null;
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
          <LineItemLabelAbove
            label="offset generation method"
            data={
              metadata?.['http://regen.network/offsetGenerationMethod'] ||
              (!!creditClass &&
                creditClassVersion?.metadata?.[
                  'http://regen.network/offsetGenerationMethod'
                ])
            }
          />
          {metadata?.['http://regen.network/projectActivity']?.[
            'http://schema.org/name'
          ] && (
            <LineItemLabelAbove
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
          <LineItemLabelAbove
            label="vcs project id"
            data={metadata?.['http://regen.network/vcsProjectId']?.['@value']}
          />
          <LineItemLabelAbove
            label="vcs project type"
            data={metadata?.['http://regen.network/vcsProjectType']}
          />
          <LineItemLabelAbove
            label="project start date"
            data={
              !!metadata?.['http://regen.network/projectStartDate']?.[
                '@value'
              ] &&
              formatDate(
                metadata?.['http://regen.network/projectStartDate']?.['@value'],
              )
            }
          />
          <LineItemLabelAbove
            label="project end date"
            data={
              !!metadata?.['http://regen.network/projectEndDate']?.['@value'] &&
              formatDate(
                metadata?.['http://regen.network/projectEndDate']?.['@value'],
              )
            }
          />
          {creditClass && additionalCertification && (
            <LineItemLabelAbove
              label="additional certification"
              data={
                <LinkWithArrow
                  link={additionalCertification?.['http://schema.org/url']}
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
