import React, { useState } from 'react';
import { Box, Collapse } from '@mui/material';
import { useTheme } from '@mui/styles';
import Title from 'web-components/lib/components/title';
import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { formatDate } from 'web-components/lib/utils/format';
import { Theme } from 'web-components/lib/theme/muiTheme';

import { LinkWithArrow } from '../atoms';
import { LineItemLabelAbove } from '../molecules';

export interface MetadataProps {
  metadata: any;
  creditClass: any;
  creditClassVersion: any;
  additionalCertification: any;
}

const AdditionalMetadata: React.FC<MetadataProps> = ({
  metadata,
  creditClass,
  creditClassVersion,
  additionalCertification,
}) => {
  const theme = useTheme<Theme>();
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
              metadata?.['regen:offsetGenerationMethod'] ||
              (!!creditClass &&
                creditClassVersion?.metadata?.[
                  'http://regen.network/offsetGenerationMethod'
                ])
            }
          />
          <LineItemLabelAbove
            label="project activity"
            data={metadata?.['regen:projectActivity']}
          />
          <LineItemLabelAbove
            label="vcs project id"
            data={metadata?.['regen:vcsProjectId']?.['@value']}
          />
          <LineItemLabelAbove
            label="vcs project type"
            data={metadata?.['regen:vcsProjectType']}
          />
          <LineItemLabelAbove
            label="project start date"
            data={
              metadata?.['regen:projectStartDate']?.['@value'] &&
              formatDate(metadata?.['regen:projectStartDate']?.['@value'])
            }
          />
          <LineItemLabelAbove
            label="project end date"
            data={
              metadata?.['regen:projectEndDate']?.['@value'] &&
              formatDate(metadata?.['regen:projectEndDate']?.['@value'])
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

export { AdditionalMetadata };
