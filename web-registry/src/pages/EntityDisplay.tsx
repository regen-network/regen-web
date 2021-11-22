import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { isIndividual } from 'web-components/lib/components/inputs/RoleField';
import { OnboardingFormTemplate } from '../components/templates';
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
import { ProjectFormProps } from './BasicInfo';

type roleIdField = 'developerId' | 'stewardId' | 'landOwnerId' | 'originatorId';
const rolesMap: { [key in EntityFieldName]: roleIdField } = {
  'http://regen.network/projectDeveloper': 'developerId',
  'http://regen.network/landSteward': 'stewardId',
  'http://regen.network/landOwner': 'landOwnerId',
  'http://regen.network/projectOriginator': 'originatorId',
};

function getInitialValues(value: any): any {
  return value?.['@type'] ? value : undefined;
}

const EntityDisplay: React.FC<ProjectFormProps> = ({ isEdit }) => {
  const { projectId } = useParams();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState<EntityDisplayValues | undefined>();

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
        'http://regen.network/landOwner': getInitialValues(metadata['http://regen.network/landOwner']),
        'http://regen.network/landSteward': getInitialValues(metadata['http://regen.network/landSteward']),
        'http://regen.network/projectDeveloper': getInitialValues(
          metadata['http://regen.network/projectDeveloper'],
        ),
        'http://regen.network/projectOriginator': getInitialValues(
          metadata['http://regen.network/projectOriginator'],
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
          const value: DisplayValues = values[role as EntityFieldName] as DisplayValues;
          const roleIdFieldName: roleIdField = rolesMap[role as EntityFieldName];
          const roleId = data.projectById[roleIdFieldName];
          if (value?.['http://regen.network/showOnProjectPage'] && roleId) {
            await updatePartyById({
              variables: {
                input: {
                  id: roleId,
                  partyPatch: {
                    description: value['http://schema.org/description'],
                    image: isIndividual(value)
                      ? value['http://schema.org/image']?.['@value']
                      : value['http://schema.org/logo']?.['@value'],
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
      !isEdit && history.push(`/project-pages/${projectId}/story`);
    } catch (e) {
      // TODO: display the error banner in case of server error
      // https://github.com/regen-network/regen-registry/issues/554
    }
  }

  return isEdit ? (
    <EntityDisplayForm submit={submit} initialValues={initialValues} isEdit />
  ) : (
    <OnboardingFormTemplate activeStep={0} title="Entity Display" saveAndExit={saveAndExit}>
      <EntityDisplayForm submit={submit} initialValues={initialValues} />
    </OnboardingFormTemplate>
  );
};

export { EntityDisplay };
