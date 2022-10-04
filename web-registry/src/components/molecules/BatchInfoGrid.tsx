import React from 'react';
import { Box, Grid, SxProps, Theme } from '@mui/material';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';
import { formatDate } from 'web-components/lib/utils/format';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';
import { LinkWithArrow } from '../atoms';

export const BatchInfoGrid: React.FC<{
  batch: BatchInfoWithSupply;
  projectOnChainId?: string | null;
  projectName?: string;
  sx?: SxProps<Theme>;
}> = ({ batch, projectOnChainId, projectName, sx }) => (
  <Grid
    container
    rowGap={6}
    columnGap={2}
    sx={{ justifyContent: 'space-between', ...sx }}
  >
    <GridItem>
      <BatchDetail label="Batch Denom">{batch.denom}</BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Project">
        <Box component="span" sx={{ textTransform: 'capitalize' }}>
          <LinkWithArrow
            label={projectName || '-'}
            href={projectOnChainId ? `/projects/${projectOnChainId}` : ''}
          />
        </Box>
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Credit Class">
        <LinkWithArrow
          target="_self"
          href={`/credit-classes/${batch.classId}`}
          label={batch?.classId || '-'}
        />
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Batch start and end date">
        {batchDate(batch?.startDate) + ' - ' + batchDate(batch?.endDate)}
      </BatchDetail>
    </GridItem>
  </Grid>
);

const batchDate = (date?: string | Date): string => {
  if (!date) return '-';
  return formatDate(date, 'MMM D, YYYY', true);
};

const GridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);

const BatchDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label}>
    <Body
      size="xl"
      styleLinks={false}
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      {children}
    </Body>
  </LabeledDetail>
);
