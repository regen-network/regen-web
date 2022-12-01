import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getProjectShapeIri } from 'lib/rdf';

import { DescriptionForm, DescriptionValues } from '../../components/organisms';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import {
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { useProjectEditContext } from '../ProjectEdit';

const Description: React.FC<React.PropsWithChildren<unknown>> = () => {
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

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/media`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/roles`);
  }

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
      !isEdit && navigateNext();
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  const Form = (): JSX.Element => (
    <DescriptionForm
      submit={submit}
      onNext={navigateNext}
      onPrev={navigatePrev}
      initialValues={initialFieldValues}
      graphData={graphData}
    />
  );

  return isEdit ? (
    <EditFormTemplate>
      <Form />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Description"
      saveAndExit={saveAndExit}
    >
      <Form />
    </OnboardingFormTemplate>
  );
};

export { Description };
