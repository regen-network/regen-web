import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { Loading } from 'web-components/lib/components/loading';
import { VCSBatchMetadataLD } from 'web-components/lib/types/rdf/C01-verified-carbon-standard-batch';

import { getBatchWithSupplyForDenom } from '../lib/ecocredit/api';
import { getMetadata } from '../lib/metadata-graph';
import { useProjectsByMetadataQuery } from '../generated/graphql';

import type { BatchInfoWithSupply } from '../types/ledger/ecocredit';
import {
  BatchInfoGrid,
  BatchMetadata,
  BatchTotalsGrid,
} from '../components/molecules';
import { NotFoundPage } from './NotFound';
import { useWallet } from '../lib/wallet';
import { useEcocredits } from '../hooks';

export const BatchDetails: React.FC = () => {
  const { batchDenom } = useParams();
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [batch, setBatch] = useState<BatchInfoWithSupply>();
  const [metadata, setMetadata] = useState<VCSBatchMetadataLD>();
  const navigate = useNavigate();
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;
  const { credits: userEcocredits } = useEcocredits(accountAddress);
  const isUserBatch = userEcocredits.some(c => c.batch_denom === batchDenom);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (batchDenom) {
        try {
          setLedgerLoading(true);
          const batch = await getBatchWithSupplyForDenom(batchDenom);
          setBatch(batch);
          if (batch.metadata) {
            const data = await getMetadata(batch.metadata);
            setMetadata(data);
          }
        } catch (err) {
          console.error(err); // eslint-disable-line no-console
        } finally {
          setLedgerLoading(false);
        }
      }
    };
    fetch();
  }, [batchDenom]);

  const vcsProjectId = metadata?.['regen:vcsProjectId'];
  const {
    data: offchainData,
    loading: dbLoading,
    error,
  } = useProjectsByMetadataQuery({
    skip: !vcsProjectId,
    variables: {
      metadata: {
        'regen:vcsProjectId': vcsProjectId,
      },
    },
  });

  const project = offchainData?.allProjects?.nodes?.[0];

  if (ledgerLoading || dbLoading) return <Loading />;

  // TODO placeholder until we have a more descriptive not found graphic
  if (!batch || error) return <NotFoundPage />;

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      {/* default `Section` padding is higher on mobile - 22.25 is default above small */}
      <Section sx={{ root: { pt: [12, 22.25], pb: 22.25 } }}>
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
          {isUserBatch && (
            <OutlinedButton
              sx={{ maxWidth: 'max-content', px: 7 }}
              size="small"
              onClick={() => navigate('/ecocredits/dashboard')}
            >
              view in portfolio
            </OutlinedButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: ['wrap', 'nowrap'] }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <BatchInfoGrid
              batch={batch}
              projectHandle={project?.handle}
              projectName={project?.metadata?.['schema:name']}
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
