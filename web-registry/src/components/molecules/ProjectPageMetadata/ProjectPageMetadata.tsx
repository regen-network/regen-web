import React, { useState } from 'react';
import { Box, Collapse, Grid, useTheme } from '@mui/material';

import { ExpandButton } from 'web-components/lib/components/buttons/ExpandButton';
import { Body, Title } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';
import { pluralize } from 'web-components/lib/utils/pluralize';

import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';

import { ArrowLink } from '../../atoms/MetadataArrowLink';
import { MetaDetail } from '../MetaDetail';

interface MetadataProps {
  metadata?: AnchoredProjectMetadataLD;
}

const ProjectPageMetadata: React.FC<React.PropsWithChildren<MetadataProps>> = ({
  metadata,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  if (!metadata) return null;

  // Common
  const startDate = metadata?.['regen:projectStartDate'];
  const endDate = metadata?.['regen:projectEndDate'];
  const offsetGenerationMethods = metadata?.['regen:offsetGenerationMethod'];
  const methodsCount = offsetGenerationMethods?.length;
  const projectActivity = metadata?.['regen:projectActivity'];
  const projectType = metadata?.['regen:projectType'];

  // VCS
  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  const methodology = metadata?.['regen:vcsMethodology'];

  // CFC
  const cfcProjectId = metadata?.['regen:cfcProjectId'];
  const projectDesignDocument = metadata?.['regen:projectDesignDocument'];
  const offsetProtocol = metadata?.['regen:offsetProtocol'];

  // Toucan
  const toucanProjectTokenId = metadata?.['regen:toucanProjectTokenId'];
  const approvedMethodologies =
    metadata?.['regen:approvedMethodologies']?.['schema:itemListElement'];
  const methodologyCount = approvedMethodologies?.length;

  return (
    <Box sx={{ pt: 8 }}>
      <Title variant="h5">Additional Info</Title>
      <Collapse collapsedSize={theme.spacing(24)} in={expanded}>
        <Box sx={{ py: 8 }}>
          <Grid container spacing={8}>
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
            {offsetGenerationMethods && methodsCount && methodsCount > 0 && (
              <MetaDetail
                label={pluralize(methodsCount, 'offset generation method')}
                data={
                  <>
                    {offsetGenerationMethods.map((method, i) => (
                      <Body key={i} size="xl">
                        {method}
                      </Body>
                    ))}
                  </>
                }
              />
            )}
            {projectActivity?.['schema:name'] && (
              <MetaDetail
                label="project activity"
                data={
                  <ArrowLink
                    href={projectActivity?.['schema:url'] || ''}
                    label={projectActivity?.['schema:name']}
                  />
                }
              />
            )}
            {approvedMethodologies && methodologyCount && methodologyCount > 0 && (
              <MetaDetail
                label={`methodolog${methodologyCount > 1 ? 'ies' : 'y'}`}
                data={
                  <>
                    {approvedMethodologies.map(methodology => (
                      <ArrowLink
                        label={methodology?.['schema:name']}
                        href={methodology?.['schema:url'] || ''}
                      />
                    ))}
                  </>
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
            {offsetProtocol && (
              <MetaDetail
                label="offset protocol"
                data={
                  <ArrowLink
                    label={offsetProtocol?.['schema:name']}
                    href={offsetProtocol?.['schema:url'] || ''}
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

export { ProjectPageMetadata };
