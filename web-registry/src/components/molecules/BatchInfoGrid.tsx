import React from 'react';
import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';
import dayjs from 'dayjs';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';

import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';
import { LabeledDetail } from 'web-components/lib/components/text-layouts';
import { Link } from '../atoms';

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
          <ArrowLink href={`/projects/${project}`}>{project}</ArrowLink>
        </Box>
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Credit Class">
        <ArrowLink href={`/credit-classes/${batch.class_id}`}>
          {batch.class_id}
        </ArrowLink>
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

const ArrowLink: React.FC<{ href: string }> = ({ href, children }) => (
  <Link sx={{ color: 'primary.contrastText' }} href={href}>
    {children} <SmallArrowIcon sx={{ ml: 2 }} />
  </Link>
);

const GridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);

const BatchDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label}>
    <Typography
      sx={{ display: 'flex', alignItems: 'center', fontSize: [16, 18] }}
    >
      {children}
    </Typography>
  </LabeledDetail>
);
