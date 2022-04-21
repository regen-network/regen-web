import React from 'react';
import { Box, Grid, SxProps, Theme } from '@mui/material';
import dayjs from 'dayjs';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Body } from 'web-components/lib/components/typography';
import { LinkWithArrow } from '../atoms';

export const BatchInfoGrid: React.FC<{
  batch: BatchInfoWithSupply;
  projectHandle: string;
  sx?: SxProps<Theme>;
}> = ({ batch, projectHandle: project, sx }) => (
  <Grid
    container
    rowGap={6}
    columnGap={2}
    sx={{ justifyContent: 'space-between', ...sx }}
  >
    <GridItem>
      <BatchDetail label="Batch Denom">{batch.batch_denom}</BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Project">
        <Box component="span" sx={{ textTransform: 'capitalize' }}>
          <LinkWithArrow label={project} href={`/projects/${project}`} />
        </Box>
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Credit Class">
        <LinkWithArrow
          href={`/credit-classes/${batch.class_id}`}
          label={batch.class_id}
        />
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Batch start and end date">
        {batchDate(batch.start_date) + ' - ' + batchDate(batch.end_date)}
      </BatchDetail>
    </GridItem>
  </Grid>
);

const batchDate = (date: string | Date): string =>
  dayjs(date).format('MMM D, YYYY');

const GridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);

const BatchDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label}>
    <Body size="lg" sx={{ display: 'flex', alignItems: 'center' }}>
      {children}
    </Body>
  </LabeledDetail>
);
