import { useLoaderData } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';

import { Flex } from 'web-components/src/components/box';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import { Loading } from 'web-components/src/components/loading';
import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';

import { useProjectByOnChainIdQuery } from 'generated/graphql';
import { BatchInfoWithSupply } from 'types/ledger/ecocredit';
import type { CreditBatchMetadataIntersectionLD } from 'lib/db/types/json-ld';
import { useWallet } from 'lib/wallet/wallet';

import { NotFoundPage } from 'pages/NotFound/NotFound';
import { Link } from 'components/atoms';
import {
  BatchInfoGrid,
  BatchMetadata,
  BatchTotalsGrid,
} from 'components/molecules';
import { useEcocredits } from 'hooks';

export const BatchDetails: React.FC = () => {
  const { batch, metadata } = useLoaderData() as {
    batch: BatchInfoWithSupply;
    metadata: CreditBatchMetadataIntersectionLD | null;
  };
  const walletContext = useWallet();
  const accountAddress = walletContext.wallet?.address;
  const { credits: userEcocredits } = useEcocredits({
    address: accountAddress,
  });
  const isUserBatch = userEcocredits.some(c => c.denom === batch.denom);

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

  if (dbLoading) return <Loading />;

  // TODO placeholder until we have a more descriptive not found graphic
  if (!dbLoading && (!batch || error)) return <NotFoundPage />;

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
          <Title variant="h2">
            <Trans>Credit Batch Details</Trans>
          </Title>
          {isUserBatch && (
            <OutlinedButton
              sx={{ maxWidth: 'max-content', px: 7 }}
              size="small"
              component={Link}
              href="/dashboard/portfolio"
            >
              <Trans>view in portfolio</Trans>
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
                <Trans>All credits</Trans>
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
