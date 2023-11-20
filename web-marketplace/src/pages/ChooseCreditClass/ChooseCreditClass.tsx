import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { Grid } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getProjectByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';
import { getProjectCreateBaseData } from 'lib/rdf';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { ProjectFormAccessTemplate } from 'components/templates/ProjectFormTemplate/ProjectFormAccessTemplate';

import { useUpdateProjectByIdMutation } from '../../generated/graphql';
import { ChooseCreditClassGrid } from './ChooseCreditClass.Grid';
import { ChooseCreditClassItem } from './ChooseCreditClass.Item';
import { CreateOffchainProjectCard } from './ChooseCreditClass.OffchainCard';
import { useErrorTimeout } from './hooks/useErrorTimeout';
import { useGetCreditClassItems } from './hooks/useGetCreditClassOptions';

const ChooseCreditClass: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const graphqlClient = useApolloClient();
  const reactQueryClient = useQueryClient();
  const [error, setError] = useErrorTimeout();
  const { projectId } = useParams();
  const { creditClassItems, loading } = useGetCreditClassItems();
  const { setCreditClassId } = useCreateProjectContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { data, isFetching } = useQuery(
    getProjectByIdQuery({
      client: graphqlClient,
      enabled: !!projectId,
      id: projectId,
    }),
  );

  const project = data?.data?.projectById;
  const adminAddr = project?.accountByAdminAccountId?.addr;
  const creditClassLength = creditClassItems?.length;

  async function handleSelection(
    creditClassId?: string,
    creditClassOnChainId?: string,
  ): Promise<void> {
    const metadata = getProjectCreateBaseData(creditClassOnChainId);

    if (creditClassOnChainId) {
      setCreditClassId(creditClassOnChainId);
    }

    try {
      try {
        await updateProject({
          variables: {
            input: {
              id: projectId,
              projectPatch: {
                creditClassId: creditClassId || undefined, // If creditClassId is '', pass undefined instead
                metadata,
              },
            },
          },
        });
        if (!!projectId) {
          await reactQueryClient.invalidateQueries({
            queryKey: getProjectByIdKey(projectId),
          });
        }
        navigate(`/project-pages/${projectId}/basic-info`);
      } catch (e) {
        setError(`There was a problem updating this project: ${e}`);
      }
    } catch (e) {
      setError(`There was a problem validating this credit class: ${e}`);
    }
  }
  return (
    <ProjectFormAccessTemplate
      loading={isFetching}
      offChainProject={project}
      adminAddr={adminAddr}
    >
      <ChooseCreditClassGrid
        justifyContent={creditClassLength > 1 ? 'flex-start' : 'center'}
        loading={loading}
        error={error}
        isIssuer={creditClassLength > 0}
      >
        <>
          <CreateOffchainProjectCard onClick={() => handleSelection()} />
          {creditClassLength > 0 ? (
            creditClassItems?.map(creditClassItem => (
              <ChooseCreditClassItem
                key={creditClassItem.onChainId}
                title={creditClassItem.title}
                imgSrc={creditClassItem.imageSrc}
                description={creditClassItem.description}
                onClick={() =>
                  handleSelection(creditClassItem.id, creditClassItem.onChainId)
                }
              />
            ))
          ) : (
            <Grid item xs={12} sm={6}>
              You are not yet listed as an issuer on any credit classes
            </Grid>
          )}
        </>
      </ChooseCreditClassGrid>
    </ProjectFormAccessTemplate>
  );
};

export { ChooseCreditClass };
