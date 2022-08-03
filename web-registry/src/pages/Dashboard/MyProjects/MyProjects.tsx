import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import ErrorBanner from 'web-components/lib/components//banner/ErrorBanner';
import { CreateProjectCard } from 'web-components/lib/components/cards/CreateCards/CreateProjectCard';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import {
  useCreateProjectMutation,
  useCreateWalletMutation,
  useWalletByAddrQuery,
} from 'generated/graphql';
import { getProjectPageBaseData } from 'lib/rdf';
import { useWallet } from 'lib/wallet';

const MyProjects = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWallet();
  const navigate = useNavigate();
  const [createProject] = useCreateProjectMutation();
  const [createWallet] = useCreateWalletMutation();
  const { data: walletData } = useWalletByAddrQuery({
    variables: {
      addr: wallet?.address as string,
    },
    fetchPolicy: 'cache-and-network',
  });

  const projects = walletData?.walletByAddr?.projectsByWalletId?.nodes;
  const isFirstProject = !projects || projects?.length < 1;

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
    let walletId = walletData?.walletByAddr?.id;
    if (!walletId) {
      walletId = await submitCreateWallet();
    }

    try {
      const res = await createProject({
        variables: {
          input: {
            project: {
              walletId,
              metadata: getProjectPageBaseData(),
            },
          },
        },
      });
      const projectId = res?.data?.createProject?.project?.id;
      if (projectId) {
        navigate(`/project-pages/${projectId}/choose-credit-class`);
      }
    } catch (e) {
      setError('Error creating project');
    }
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <CreateProjectCard
            isFirstProject={isFirstProject}
            onClick={submitCreateProject}
          />
        </Grid>
        {/* TODO: ProjectCards used below temporarily. Will probably be a new variation for this purpose */}
        {projects?.map((project, i) => (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ProjectCard
              name={project?.handle || project?.id}
              imgSrc={''}
              place="TODO"
              area={0}
              areaUnit="ha"
            />
          </Grid>
        ))}
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};

export { MyProjects };
