import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

import Description from 'web-components/lib/components/description';
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
import { isIndividual } from 'web-components/lib/components/inputs/RoleField';

const exampleProjectUrl = '/projects/wilmot';

type roleIdField = 'developerId' | 'stewardId' | 'landOwnerId' | 'originatorId';
const rolesMap: { [key in EntityFieldName]: roleIdField } = {
  'http://regen.network/projectDeveloper': 'developerId',
  'http://regen.network/landSteward': 'stewardId',
  'http://regen.network/landOwner': 'landOwnerId',
  'http://regen.network/projectOriginator': 'originatorId',
};

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
}));

const EntityDisplay: React.FC = () => {
  const styles = useStyles();
  const activeStep = 0;
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
        'http://regen.network/landOwner': metadata['http://regen.network/landOwner'],
        'http://regen.network/landSteward': metadata['http://regen.network/landSteward'],
        'http://regen.network/projectDeveloper': metadata['http://regen.network/projectDeveloper'],
        'http://regen.network/projectOriginator': metadata['http://regen.network/projectOriginator'],
      });
    }
  }, [data]);

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: EntityDisplayValues): Promise<void> {
    // update project stakeholders' parties
    if (data?.projectById) {
      for (const role in values) {
        const value: DisplayValues = values[role as EntityFieldName] as DisplayValues;
        const roleIdFieldName: roleIdField = rolesMap[role as EntityFieldName];
        const roleId = data.projectById[roleIdFieldName];
        if (value['http://regen.network/showOnProjectPage'] && roleId) {
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
      history.push(`/project-pages/${projectId}/story`);
    } catch (e) {
      // TODO: display the error banner in case of server error
      // https://github.com/regen-network/regen-registry/issues/554
    }
  }

  return (
    <OnboardingFormTemplate activeStep={activeStep} title="Entity Display" saveAndExit={saveAndExit}>
      <Description className={styles.description}>
        See an example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <EntityDisplayForm submit={submit} initialValues={initialValues} />
    </OnboardingFormTemplate>
  );
};

export { EntityDisplay };
