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
import { useAuth } from 'lib/auth/auth';

const ChooseCreditClass: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const graphqlClient = useApolloClient();
  const [error, setError] = useErrorTimeout();
  const { projectId } = useParams();
  const { creditClassItems, loading } = useGetCreditClassItems();
  const { setCreditClassId, setCreditClassOnChainId } =
    useCreateProjectContext();
  const [updateProject] = useUpdateProjectByIdMutation();
  const { activeAccount } = useAuth();

  const adminAddr = activeAccount?.addr;
  const creditClassLength = creditClassItems?.length;

  function handleSelection(
    creditClassId?: string,
    creditClassOnChainId?: string,
  ) {
    const metadata = getProjectCreateBaseData(creditClassOnChainId);

    if (creditClassOnChainId) setCreditClassOnChainId(creditClassOnChainId);
    if (creditClassId) setCreditClassId(creditClassId);

    navigate(`/project-pages/${projectId}/basic-info`);
  }
  return (
    <ProjectFormAccessTemplate
      loading={loading}
      // offChainProject={project}
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
