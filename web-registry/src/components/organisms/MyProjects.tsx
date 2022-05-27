import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom'; TODO Issue: regen-network/regen-registry#913

import CreateProjectCard from 'web-components/lib/components/cards/CreateProjectCard';
import ErrorBanner from 'web-components/lib/components//banner/ErrorBanner';

import { useWallet } from '../../../src/lib/wallet';
import {
  useCreateProjectMutation,
  useGetWalletByAddressQuery,
  useCreateWalletMutation,
} from '../../generated/graphql';

const MyProjects: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWallet();
  // const navigate = useNavigate(); TODO Issue: regen-network/regen-registry#913
  const [createProject] = useCreateProjectMutation();
  const [createWallet] = useCreateWalletMutation();
  const { data: walletData } = useGetWalletByAddressQuery({
    variables: {
      walletAddress: wallet?.address as string,
    },
    fetchPolicy: 'cache-and-network',
  });

  const projects =
    walletData?.getWalletByAddress?.nodes?.[0]?.projectsByWalletId?.nodes;
  const isFirstProject = !!projects && projects?.length < 1;

  async function submitCreateWallet(): Promise<void> {
    if (!wallet?.address) return Promise.reject();
    try {
      const res = await createWallet({
        variables: {
          input: {
            wallet: {
              addr: wallet.address,
            },
          },
        },
      });
      const newWalletId = res.data?.createWallet?.wallet?.id;
      if (newWalletId) {
        return newWalletId;
      }
    } catch (e) {
      setError('Error adding wallet address to database');
    }
  }

  async function submitCreateProject(): Promise<void> {
    let walletId = walletData?.getWalletByAddress?.nodes?.[0]?.id;
    if (!walletId) {
      walletId = await submitCreateWallet();
    }

    try {
      const res = await createProject({
        variables: {
          input: {
            project: {
              walletId,
            },
          },
        },
      });
      const projectId = res?.data?.createProject?.project?.id;
      if (projectId) {
        // navigate(`/projects/${projectId}/choose-credit-class`); TODO Issue: regen-network/regen-registry#913
      }
    } catch (e) {
      setError('Error creating project');
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        py: 10,
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <CreateProjectCard
            isFirstProject={isFirstProject}
            onClick={submitCreateProject}
          />
        </Grid>
      </Grid>
      {error && <ErrorBanner text={error} />}
    </Box>
  );
};

export { MyProjects };
