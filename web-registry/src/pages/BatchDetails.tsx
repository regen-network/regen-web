import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import SmallArrowIcon from 'web-components/lib/components/icons/SmallArrowIcon';

import { getBatchWithSupplyForDenom } from '../lib/ecocredit';
import {
  LabeledDetail,
  LabeledNumber,
} from 'web-components/lib/components/text-layouts';
import { useBatchDetailsQuery } from '../generated/graphql';
import { Link } from '../components/atoms';

import type { BatchInfoWithSupply } from '../types/ledger/ecocredit';

const batchDate = (date: string | Date): string =>
  dayjs(date).format('MMM D, YYYY');

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
          <Link
            sx={{ color: 'primary.contrastText' }}
            href={`/projects/${project}`}
          >
            {project} <SmallArrowIcon sx={{ ml: 2 }} />
          </Link>
        </Box>
      </BatchDetail>
    </GridItem>
    <GridItem>
      <BatchDetail label="Credit Class">
        <Link
          sx={{ color: 'primary.contrastText' }}
          href={`/credit-classes/${batch.class_id}`}
        >
          {batch.class_id} <SmallArrowIcon sx={{ ml: 2 }} />
        </Link>
      </BatchDetail>
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

const BatchMetadata: React.FC<{ data: any }> = ({ data }) => {
  const regenField = (key: string): string => `http://regen.network/${key}`;
  return (
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
        <MetaDetail label="vcs retirement serial number">
          {data[regenField('serialNumber')]}
        </MetaDetail>
        <MetaDetail label="batch monitoring report">TODO</MetaDetail>
        <MetaDetail label="Batch verification report">TODO</MetaDetail>
      </Box>
    </Box>
  );
};

export const BatchDetails: React.FC = () => {
  const { batchDenom } = useParams();
  const [batch, setBatch] = useState<BatchInfoWithSupply>();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (batchDenom) {
        try {
          const batch = await getBatchWithSupplyForDenom(batchDenom);
          setBatch(batch);
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        }
      }
    };
    fetch();
  }, [batchDenom]);

  const { data: offchainData } = useBatchDetailsQuery({
    skip: !batchDenom,
    variables: { batchDenom: batchDenom as string },
  });
  const vintage = offchainData?.creditVintageByBatchDenom;
  const projectHandle = vintage?.projectByProjectId?.handle || '';
  const metadata = vintage?.metadata || {};

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
        <Box sx={{ display: 'flex', flexWrap: ['wrap', 'nowrap'] }}>
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
              minWidth: ['100%', '33%', '370px'],
            }}
          >
            <BatchMetadata data={metadata} />
          </Box>
        </Box>
      </Section>
    </Box>
  );
};
