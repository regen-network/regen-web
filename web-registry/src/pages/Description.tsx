import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import { DescriptionForm, DescriptionValues } from '../components/organisms';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
  useShaclGraphByUriQuery,
} from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';
import { getProjectShapeIri } from '../lib/rdf';

const Description: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = data?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;

  const { data: graphData } = useShaclGraphByUriQuery({
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  let initialFieldValues: DescriptionValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'schema:description': metadata['schema:description'],
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: DescriptionValues): Promise<void> {
    const metadata = { ...data?.projectById?.metadata, ...values };
    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch: {
              metadata,
            },
          },
        },
      });
      !isEdit && navigate(`/project-pages/${projectId}/media`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <DescriptionForm
        submit={submit}
        initialValues={initialFieldValues}
        graphData={graphData}
      />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Description"
      saveAndExit={saveAndExit}
    >
      <DescriptionForm
        submit={submit}
        initialValues={initialFieldValues}
        graphData={graphData}
      />
    </OnboardingFormTemplate>
  );
};

export { Description };
