import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useAuth } from 'lib/auth/auth';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import { ProjectFormAccessTemplate } from 'components/templates/ProjectFormTemplate/ProjectFormAccessTemplate';

import { ChooseCreditClassGrid } from './ChooseCreditClass.Grid';
import { ChooseCreditClassItem } from './ChooseCreditClass.Item';
import { CreateOffchainProjectCard } from './ChooseCreditClass.OffchainCard';
import { useGetCreditClassItems } from './hooks/useGetCreditClassOptions';

const ChooseCreditClass: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { creditClassItems, loading } = useGetCreditClassItems();
  const { setCreditClassId, setCreditClassOnChainId } =
    useCreateProjectContext();
  const { activeAccount } = useAuth();

  const adminAddr = activeAccount?.addr;
  const creditClassLength = creditClassItems?.length;

  function handleSelection(
    creditClassId?: string,
    creditClassOnChainId?: string,
  ) {
    setCreditClassOnChainId(creditClassOnChainId);
    setCreditClassId(creditClassId);

    navigate(`/project-pages/${projectId}/basic-info`);
  }
  return (
    <ProjectFormAccessTemplate loading={loading} adminAddr={adminAddr}>
      <ChooseCreditClassGrid
        justifyContent={creditClassLength > 1 ? 'flex-start' : 'center'}
        loading={loading}
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
