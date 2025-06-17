import React from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box, Grid, SxProps, Theme } from '@mui/material';

import { LabeledDetail } from 'web-components/src/components/text-layouts';
import { Body } from 'web-components/src/components/typography';
import {
  DATE_FORMAT_SECONDARY,
  formatDate,
} from 'web-components/src/utils/format';

import type { BatchInfoWithSupply } from '../../types/ledger/ecocredit';
import { LinkWithArrow } from '../atoms';

export const BatchInfoGrid: React.FC<
  React.PropsWithChildren<{
    batch: BatchInfoWithSupply;
    projectOnChainId?: string | null;
    projectName?: string;
    sx?: SxProps<Theme>;
  }>
> = ({ batch, projectOnChainId, projectName, sx }) => {
  const { _ } = useLingui();

  return (
    <Grid
      container
      rowGap={6}
      columnGap={2}
      sx={{ justifyContent: 'space-between', ...sx }}
    >
      <GridItem>
        <BatchDetail label={_(msg`Batch Denom`)}>{batch.denom}</BatchDetail>
      </GridItem>
      <GridItem>
        <BatchDetail label={_(msg`Project`)}>
          <Box component="span" sx={{ textTransform: 'capitalize' }}>
            <LinkWithArrow
              label={projectName || '-'}
              href={projectOnChainId ? `/project/${projectOnChainId}` : ''}
            />
          </Box>
        </BatchDetail>
      </GridItem>
      <GridItem>
        <BatchDetail label={_(msg`Credit Class`)}>
          <LinkWithArrow
            target="_self"
            href={`/credit-classes/${batch.classId}`}
            label={batch?.classId || '-'}
          />
        </BatchDetail>
      </GridItem>
      <GridItem>
        <BatchDetail label={_(msg`Batch start and end date`)}>
          {batchDate(batch?.startDate) + ' - ' + batchDate(batch?.endDate)}
        </BatchDetail>
      </GridItem>
    </Grid>
  );
};

const batchDate = (date?: string | Date): string => {
  if (!date) return '-';
  return formatDate(date, DATE_FORMAT_SECONDARY, true);
};

const GridItem: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <Grid item xs={12} sm={5}>
    {children}
  </Grid>
);

const BatchDetail: React.FC<React.PropsWithChildren<{ label: string }>> = ({
  label,
  children,
}) => (
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
