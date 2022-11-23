import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Flex } from 'web-components/lib/components/box';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { Loading } from 'web-components/lib/components/loading';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { CreditBatchMetadataIntersectionLD } from 'web-components/lib/types/rdf/credit-batch-intersection-ld';

import { useProjectByOnChainIdQuery } from 'generated/graphql';
import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import { getBatchWithSupplyForDenom } from 'lib/ecocredit/api';
import { getMetadata } from 'lib/metadata-graph';
import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { Link } from 'components/atoms';
import {
  BatchInfoGrid,
  BatchMetadata,
  BatchTotalsGrid,
} from 'components/molecules';
import { useEcocredits } from 'hooks';

export const BatchDetails: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { batchDenom } = useParams();
  const [ledgerLoading, setLedgerLoading] = useState(true);
  const [batch, setBatch] = useState<BatchInfoWithSupply>();
  const [metadata, setMetadata] =
    useState<Partial<CreditBatchMetadataIntersectionLD>>();
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;
  const { credits: userEcocredits } = useEcocredits({
    address: accountAddress,
  });
  const isUserBatch = userEcocredits.some(c => c.denom === batchDenom);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (batchDenom) {
        try {
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
      } else {
        setLedgerLoading(false);
      }
    };
    fetch();
  }, [batchDenom]);

  const onChainId = batch?.projectId || '';
  const {
    data: offchainData,
    loading: dbLoading,
    error,
  } = useProjectByOnChainIdQuery({
    skip: !onChainId,
    variables: {
      onChainId,
    },
  });

  const project = offchainData?.projectByOnChainId;
  const loading = ledgerLoading || dbLoading;

  if (loading) return <Loading />;

  // TODO placeholder until we have a more descriptive not found graphic
  if (!loading && (!batch || error)) return <NotFoundPage />;

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
              component={Link}
              href="/ecocredits/portfolio"
            >
              view in portfolio
            </OutlinedButton>
          )}
        </Box>
        {batch && (
          <Box sx={{ display: 'flex', flexWrap: ['wrap', 'nowrap'] }}>
            <Flex col sx={{ width: '100%' }}>
              <BatchInfoGrid
                batch={batch}
                projectOnChainId={onChainId}
                projectName={project?.metadata?.['schema:name'] || onChainId}
                sx={{ py: 10, borderBottom: 1, borderColor: 'grey.100' }}
              />
              <Title variant="h5" sx={{ mt: 10, mb: 8 }}>
                All credits
              </Title>
              <BatchTotalsGrid batch={batch} />
            </Flex>
            <Box
              sx={{
                pt: 10,
                mb: [0, 10],
                ml: [0, 10],
                minWidth: ['100%', '33%', '370px'],
              }}
            >
              <BatchMetadata data={metadata} />
            </Box>
          </Box>
        )}
      </Section>
    </Box>
  );
};
