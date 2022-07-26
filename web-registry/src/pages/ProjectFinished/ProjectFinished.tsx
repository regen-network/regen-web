import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { Title } from 'web-components/lib/components/typography';
import { CardItem } from 'web-components/lib/components/modal/TxModal';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { truncateHash } from 'web-components/lib/utils/truncate';

import { OnboardingFormTemplate } from '../../components/templates';
import { Link } from '../../components/atoms';
import { getHashUrl } from '../../lib/block-explorer';
import { useCreateProjectContext } from '../ProjectCreate';
import { useGetProjectId } from './hooks/useGetProjectId';
import { useUpdateProjectByIdMutation } from '../../generated/graphql';

const ProjectFinished: React.FC = () => {
  const { deliverTxResponse } = useCreateProjectContext();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const projectOnChainId = useGetProjectId(deliverTxResponse);
  const [updateProject] = useUpdateProjectByIdMutation();

  // TODO: run mutation in review success, fetch from DB here?
  useEffect((): void => {
    if (!!projectOnChainId) {
      updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              onChainId: projectOnChainId,
            },
          },
        },
      });
    }
  }, [projectId, projectOnChainId, updateProject]);

  return (
    <OnboardingFormTemplate activeStep={2} title="Project has been created!">
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
          onClick={() => navigate(`/projects/${projectOnChainId}`)}
        >
          see project page
        </OutlinedButton>
      </Box>
    </OnboardingFormTemplate>
  );
};

export { ProjectFinished };
