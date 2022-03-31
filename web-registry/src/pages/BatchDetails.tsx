import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

import { getBatchWithSupplyForDenom } from '../lib/ecocredit';
import { getMetadata } from '../lib/metadata-graph';
import { useBatchDetailsQuery } from '../generated/graphql';

import type { BatchInfoWithSupply } from '../types/ledger/ecocredit';
import type { BatchMetadataLD } from '../generated/json-ld';
import {
  BatchInfoGrid,
  BatchMetadata,
  BatchTotalsGrid,
} from '../components/molecules';

export const BatchDetails: React.FC = () => {
  const { batchDenom } = useParams();
  const [batch, setBatch] = useState<BatchInfoWithSupply>();
  const [metadata, setMetadata] = useState<BatchMetadataLD>();

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (batchDenom) {
        try {
          const batch = await getBatchWithSupplyForDenom(batchDenom);
          setBatch(batch);
          if (batch.metadata) {
            const { data } = await getMetadata(batch.metadata);
            setMetadata(data.metadata);
          }
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
  const projectHandle =
    offchainData?.creditVintageByBatchDenom?.projectByProjectId?.handle || '';

  if (!batch) return null;
  // TODO should there be a not found component or redirect?

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
            <BatchInfoGrid
              batch={batch}
              projectHandle={projectHandle}
              sx={{ py: 10, borderBottom: 1, borderColor: 'grey.100' }}
            />
            <Title variant="h5" sx={{ mt: 10, mb: 8 }}>
              All credits
            </Title>
            <BatchTotalsGrid batch={batch} />
          </Box>
          <Box
            sx={{
              my: [0, 10],
              ml: [0, 10],
              minWidth: ['100%', '33%', '370px'],
            }}
          >
            <Box
              sx={{
                py: 7,
                px: 5,
                backgroundColor: 'primary.main',
                border: 1,
                borderColor: 'info.light',
              }}
            >
              <Title variant="h5" sx={{ mb: 4 }}>
                Metadata
              </Title>
              <BatchMetadata data={metadata} />
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
};
