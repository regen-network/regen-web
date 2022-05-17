import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { isIndividual } from 'web-components/lib/components/inputs/RoleField';
import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import {
  EntityDisplayForm,
  EntityDisplayValues,
  EntityFieldName,
  DisplayValues,
} from '../components/organisms';
import {
  useProjectByIdQuery,
  useUpdateProjectByIdMutation,
  useUpdatePartyByIdMutation,
} from '../generated/graphql';
import { useProjectEditContext } from '../pages/ProjectEdit';

type roleIdField = 'developerId' | 'stewardId' | 'landOwnerId' | 'originatorId';
const rolesMap: { [key in EntityFieldName]: roleIdField } = {
  'regen:projectDeveloper': 'developerId',
  'regen:landSteward': 'stewardId',
  'regen:landOwner': 'landOwnerId',
  'regen:projectOriginator': 'originatorId',
};

function getInitialValues(value: any): any {
  return value?.['@type'] ? value : undefined;
}

const EntityDisplay: React.FC = () => {
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<
    EntityDisplayValues | undefined
  >();

  const [updateProject] = useUpdateProjectByIdMutation();
  const [updatePartyById] = useUpdatePartyByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.projectById?.metadata) {
      const metadata = data.projectById.metadata;

      setInitialValues({
        'regen:landOwner': getInitialValues(metadata['regen:landOwner']),
        'regen:landSteward': getInitialValues(metadata['regen:landSteward']),
        'regen:projectDeveloper': getInitialValues(
          metadata['regen:projectDeveloper'],
        ),
        'regen:projectOriginator': getInitialValues(
          metadata['regen:projectOriginator'],
        ),
      });
    }
  }, [data]);

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: EntityDisplayValues): Promise<void> {
    try {
      // update project stakeholders' parties
      if (data?.projectById) {
        for (const role in values) {
          const value: DisplayValues = values[
            role as EntityFieldName
          ] as DisplayValues;
          const roleIdFieldName: roleIdField =
            rolesMap[role as EntityFieldName];
          const roleId = data.projectById[roleIdFieldName];
          if (value?.['regen:showOnProjectPage'] && roleId) {
            await updatePartyById({
              variables: {
                input: {
                  id: roleId,
                  partyPatch: {
                    description: value['schema:description'],
                    image: isIndividual(value)
                      ? value['schema:image']?.['@value']
                      : value['schema:logo']?.['@value'],
                  },
                },
              },
            });
          }
        }
      }
      // update project metadata
      const metadata = { ...data?.projectById?.metadata, ...values };
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
      !isEdit && navigate(`/project-pages/${projectId}/story`);
    } catch (e) {
      // TODO: display the error banner in case of server error
      // https://github.com/regen-network/regen-registry/issues/554
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <EntityDisplayForm submit={submit} initialValues={initialValues} />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Entity Display"
      saveAndExit={saveAndExit}
    >
      <EntityDisplayForm submit={submit} initialValues={initialValues} />
    </OnboardingFormTemplate>
  );
};

export { EntityDisplay };
