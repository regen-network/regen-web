import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { CardItem } from 'web-components/lib/components/modal/TxModal';
import { Title } from 'web-components/lib/components/typography';
import { truncateHash } from 'web-components/lib/utils/truncate';

import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';

import { Link } from '../../components/atoms';
import { OnboardingFormTemplate } from '../../components/templates';
import { getHashUrl } from '../../lib/block-explorer';
import { useCreateProjectContext } from '../ProjectCreate';

const ProjectFinished: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { deliverTxResponse } = useCreateProjectContext();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const graphqlClient = useApolloClient();
  const { data, isLoading } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      id: projectId,
    }),
  );

  const projectOnChainId = data?.data?.projectById?.onChainId || '';

  return (
    <OnboardingFormTemplate
      activeStep={2}
      title="Project has been created!"
      loading={isLoading}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <OnBoardingCard>
          <Title variant="h5">Create Project</Title>
          <CardItem
            label="project id"
            value={{
              name: projectOnChainId,
            }}
            linkComponent={Link}
          />
          <CardItem
            label="hash"
            value={{
              name: truncateHash(deliverTxResponse?.transactionHash) || '',
              url: getHashUrl(deliverTxResponse?.transactionHash),
            }}
            linkComponent={Link}
          />
        </OnBoardingCard>
        <OutlinedButton
          sx={{ margin: '0 auto' }}
          role="link"
          onClick={() => navigate(`/project/${projectOnChainId}`)}
        >
          see project page
        </OutlinedButton>
      </Box>
    </OnboardingFormTemplate>
  );
};

export { ProjectFinished };
