import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getProjectPageBaseData, validate } from 'lib/rdf';

import {
  useAllCreditClassesQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { ChooseCreditClassGrid } from './ChooseCreditClass.Grid';
import { ChooseCreditClassItem } from './ChooseCreditClass.Item';
import { useErrorTimeout } from './hooks/useErrorTimeout';

const ChooseCreditClassLegacy: React.FC<React.PropsWithChildren<unknown>> =
  () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [error, setError] = useErrorTimeout();
    const { data: creditClassesData } = useAllCreditClassesQuery();
    const { data: graphData } = useShaclGraphByUriQuery({
      variables: {
        uri: 'http://regen.network/ProjectPageShape',
      },
    });
    const [updateProject] = useUpdateProjectByIdMutation();

    async function handleSelection(
      creditClassId: string,
      creditClassUri: string,
    ): Promise<void> {
      if (graphData?.shaclGraphByUri?.graph) {
        const metadata = getProjectPageBaseData();
        metadata['regen:creditClass'] = {
          '@type': 'regen:CreditClass',
          '@id': creditClassUri,
        };
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
                  creditClassId,
                  metadata,
                },
              },
            },
          });
          navigate(`/project-pages/${projectId}/basic-info`);
        } catch (e) {
          setError(`There was a problem updating this project: ${e}`);
        }
      }
    }

    return (
      <ChooseCreditClassGrid error={error}>
        {creditClassesData?.allCreditClasses?.nodes.map(
          (c, i) =>
            !c?.standard &&
            c?.creditClassVersionsById?.nodes?.[0] && (
              <ChooseCreditClassItem
                key={i}
                description={
                  c.creditClassVersionsById?.nodes[0].description || ''
                }
                imgSrc={c.creditClassVersionsById?.nodes[0].image}
                onClick={() => handleSelection(c.id, c.uri)}
                title={c.creditClassVersionsById?.nodes[0].name}
              />
            ),
        )}
      </ChooseCreditClassGrid>
    );
  };

export { ChooseCreditClassLegacy };
