import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

import { ChooseCreditClassGrid } from './ChooseCreditClass.Grid';
import { ChooseCreditClassItem } from './ChooseCreditClass.Item';
import { useGetCreditClassOptions } from './hooks/useGetCreditClassOptions';
import { useErrorTimeout } from './hooks/useErrorTimeout';
import { validate, getProjectPageBaseData } from '../../lib/rdf';
import {
  useUpdateProjectByIdMutation,
  useShaclGraphByUriQuery,
} from '../../generated/graphql';

const ChooseCreditClass: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useErrorTimeout();
  const { projectId } = useParams();
  const { creditClassOptions, loading } = useGetCreditClassOptions();
  const { data: graphData } = useShaclGraphByUriQuery({
    variables: {
      uri: 'http://regen.network/ProjectPageShape',
    },
  });
  const [updateProject] = useUpdateProjectByIdMutation();

  async function handleSelection(
    creditClassId: string,
    creditClassOnChainId: string,
  ): Promise<void> {
    if (graphData?.shaclGraphByUri?.graph) {
      const metadata = getProjectPageBaseData(creditClassOnChainId);

      try {
        const report = await validate(
          graphData.shaclGraphByUri.graph,
          metadata,
          'http://regen.network/ProjectPageCreditClassGroup',
        );
        if (!report.conforms) return;
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

          navigate(`/project-pages/${projectId}/basic-info`);
        } catch (e) {
          setError(`There was a problem updating this project: ${e}`);
        }
      } catch (e) {
        setError(`There was a problem validating this credit class: ${e}`);
      }
    }
  }

  return (
    <ChooseCreditClassGrid
      justifyContent={creditClassOptions?.length > 1 ? 'flex-start' : 'center'}
      loading={loading}
      error={error}
    >
      {creditClassOptions?.length > 0 ? (
        creditClassOptions?.map(creditClassOption => (
          <ChooseCreditClassItem
            key={creditClassOption.onChainId}
            title={creditClassOption.title}
            imgSrc={creditClassOption.imageSrc}
            description={creditClassOption.description}
            disabled={creditClassOption?.disabled}
            onClick={() =>
              handleSelection(creditClassOption.id, creditClassOption.onChainId)
            }
          />
        ))
      ) : (
        <Grid item xs={12} sm={6}>
          You are not yet listed as an issuer on any credit classes
        </Grid>
      )}
    </ChooseCreditClassGrid>
  );
};

export { ChooseCreditClass };
