import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

import { getBatchWithSupplyForDenom } from '../lib/ecocredit';
import {
  LabeledDetail,
  LabeledNumber,
} from 'web-components/lib/components/text-layouts';
import { useBatchDetailsQuery } from '../generated/graphql';

import type { BatchInfoWithSupply } from '../types/ledger/ecocredit';

// this is similar to `formatDate` in web-components, but different format.
// Could pass the format to that function, but it would be more code overall
// compared to just using dayjs
const batchDate = (date: string | Date): string =>
  dayjs(date).format('MMM D, YYYY');

const GridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);

const BatchDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label}>
    <Typography sx={{ fontSize: { xs: 16, sm: 18 } }}>{children}</Typography>
  </LabeledDetail>
);

const MetaDetail: React.FC<{ label: string }> = ({ label, children }) => (
  <LabeledDetail label={label} styles={{ label: { fontSize: { xs: 12 } } }}>
    <Typography sx={{ fontSize: 16 }}>{children}</Typography>
  </LabeledDetail>
);

const BatchInfo: React.FC<{ batch: BatchInfoWithSupply; project: string }> = ({
  batch,
  project,
}) => (
  <Grid
    container
    rowGap={6}
    columnGap={2}
    sx={{ justifyContent: 'space-between' }}
  >
    <GridItem>
      <BatchDetail label="Batch Denom">{batch.batch_denom}</BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Project">
        <Box component="span" sx={{ textTransform: 'capitalize' }}>
          {project}
        </Box>
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Credit Class">{batch.class_id}</BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Batch start and end date">
        {batchDate(batch.start_date) + ' - ' + batchDate(batch.end_date)}
      </BatchDetail>
    </GridItem>
  </Grid>
);

const BatchTotals: React.FC<{ batch: BatchInfoWithSupply }> = ({ batch }) => (
  <>
    <Title variant="h5">All credits</Title>
    <Grid
      container
      rowGap={6}
      columnGap={2}
      sx={{ pt: 8, justifyContent: 'space-between' }}
    >
      <GridItem>
        <LabeledNumber
          label="Total Credits Issued"
          number={batch.total_amount}
        />
      </GridItem>
      <GridItem>
        <LabeledNumber label="Credits Tradable" number={batch.total_amount} />
      </GridItem>
      <GridItem>
        <LabeledNumber label="Credits Retired" number={batch.retired_supply} />
      </GridItem>
      <GridItem>
        <LabeledNumber
          label="Credits Cancelled"
          number={batch.amount_cancelled}
        />
      </GridItem>
    </Grid>
  </>
);

const BatchMetadata: React.FC<{ data: any }> = () => (
  <Box
    sx={{
      py: 7,
      px: 5,
      backgroundColor: 'primary.main',
      border: 1,
      borderColor: 'info.light',
    }}
  >
    <Title variant="h5">Metadata</Title>
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MetaDetail label="vcs retirement serial number">TODO</MetaDetail>
      <MetaDetail label="batch monitoring report">TODO</MetaDetail>
      <MetaDetail label="Batch verification report">TODO</MetaDetail>
    </Box>
  </Box>
);

export const BatchDetails: React.FC = () => {
  const { batchDenom } = useParams();
  const [batch, setBatch] = useState<BatchInfoWithSupply>();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (batchDenom) {
        const batch = await getBatchWithSupplyForDenom(batchDenom).catch(
          console.error, // eslint-disable-line
        );
        if (batch) setBatch(batch);
      }
    };
    fetch();
  }, [batchDenom]);

  const { data: offchainData } = useBatchDetailsQuery({
    skip: !batchDenom,
    variables: { batchDenom: batchDenom as string },
  });
  const project = offchainData?.creditVintageByBatchDenom?.projectByProjectId;
  const projectHandle = project?.handle || '';
  const metadata = project?.metadata || {};

  if (!batch) return null;

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      {/* default `Section` padding is higher on mobile - 22.25 is default above small */}
      <Section sx={{ pt: [12, 22.25], pb: 22.25 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title variant="h2">Credit Batch Details</Title>
          <OutlinedButton sx={{ maxWidth: 'max-content', px: 7 }} size="small">
            view in portfolio
          </OutlinedButton>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ py: 10, borderBottom: 1, borderColor: 'grey.100' }}>
              <BatchInfo batch={batch} project={projectHandle} />
            </Box>
            <Box sx={{ py: 10 }}>
              <BatchTotals batch={batch} />
            </Box>
          </Box>
          <Box
            sx={{
              my: [0, 10],
              ml: [0, 10],
              width: ['100%', '370px'],
            }}
          >
            <BatchMetadata data={metadata} />
          </Box>
        </Box>
      </Section>
    </Box>
  );
};
