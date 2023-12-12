import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Box } from '@mui/system';
import { useQuery } from '@tanstack/react-query';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import OnBoardingCard from 'web-components/src/components/cards/OnBoardingCard';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { CardItem } from 'web-components/src/components/modal/TxModal';
import { Body, Label, Title } from 'web-components/src/components/typography';
import { truncateHash } from 'web-components/src/utils/truncate';

import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';

import { Link } from '../../components/atoms';
import { OnboardingFormTemplate } from '../../components/templates';
import { getHashUrl } from '../../lib/block-explorer';
import { useCreateProjectContext } from '../ProjectCreate';
import { PROJECT_OFFCHAIN_REMINDER } from './ProjectFinished.constants';

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

  const projectOnChainId = data?.data?.projectById?.onChainId;
  const projectOffChainId = data?.data?.projectById?.id;
  const currentProjectId = projectOnChainId ?? projectOffChainId;
  const projectUrl = `${window.location.origin}/project/${currentProjectId}`;

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
          {projectOnChainId ? (
            <CardItem
              label="project id"
              value={{
                name: projectOnChainId,
              }}
              linkComponent={Link}
            />
          ) : (
            <CardItem
              label="project name"
              value={{
                name: data?.data?.projectById?.metadata?.['schema:name'],
              }}
              linkComponent={Link}
            />
          )}
          {!!deliverTxResponse?.transactionHash && (
            <CardItem
              label="hash"
              value={{
                name: truncateHash(deliverTxResponse?.transactionHash) || '',
                url: getHashUrl(deliverTxResponse?.transactionHash),
              }}
              linkComponent={Link}
            />
          )}
          <CardItem
            label="url"
            value={{
              name: projectUrl,
              url: projectUrl,
              children: (
                <Box>
                  <Link
                    href={`/project-pages/${currentProjectId}/edit/settings`}
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      ml: 2,
                      mb: 1,
                    }}
                  >
                    <EditIcon sx={{ mr: 1, width: 22, height: 22 }} />{' '}
                    <Label size="xs" color="primary.contrastText">
                      {'edit'}
                    </Label>
                  </Link>
                </Box>
              ),
            }}
            linkComponent={Link}
          />
          {!projectOnChainId && (
            <Body sx={{ mt: 2 }}>{PROJECT_OFFCHAIN_REMINDER}</Body>
          )}
        </OnBoardingCard>
        <OutlinedButton
          sx={{ margin: '0 auto' }}
          role="link"
          onClick={() => navigate(`/project/${currentProjectId}`)}
        >
          see project page
        </OutlinedButton>
      </Box>
    </OnboardingFormTemplate>
  );
};

export { ProjectFinished };
