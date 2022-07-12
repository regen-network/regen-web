// import { useState } from 'react';
import { Grid } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// import ErrorBanner from 'web-components/lib/components//banner/ErrorBanner';
// import ProjectCard from 'web-components/lib/components/cards/ProjectCard';

import { DashboardTemplate } from 'components/templates';
import { CreateCreditClassCard } from 'components/molecules/CreateCreditClassCard';

export const MyCreditClasses = (): JSX.Element => {
  // const [error, setError] = useState<string | null>(null);
  // const { wallet } = useWallet();
  // const navigate = useNavigate();
  // const [createProject] = useCreateProjectMutation();
  // const [createWallet] = useCreateWalletMutation();
  // const { data: walletData } = useWalletByAddrQuery({
  //   variables: {
  //     addr: wallet?.address as string,
  //   },
  //   fetchPolicy: 'cache-and-network',
  // });

  // const projects = walletData?.walletByAddr?.projectsByWalletId?.nodes;
  // const isFirstProject = !projects || projects?.length < 1;
  const isFirstCreditClass = false;

  async function submitCreateCreditClass(): Promise<void> {
    return Promise.resolve();
  }

  return (
    <DashboardTemplate
      sx={{
        display: 'flex',
        pt: 10,
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <CreateCreditClassCard
            isFirstCreditClass={isFirstCreditClass}
            onClick={submitCreateCreditClass}
          />
        </Grid>
        {/* TODO: ProjectCards used below temporarily. Will probably be a new variation for this purpose */}
        {/* {projects?.map((project, i) => (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ProjectCard
              name={project?.handle || project?.id}
              imgSrc={''}
              place="TODO"
              area={0}
              areaUnit="ha"
            />
          </Grid>
        ))} */}
      </Grid>
      {/* {error && <ErrorBanner text={error} />} */}
    </DashboardTemplate>
  );
};
