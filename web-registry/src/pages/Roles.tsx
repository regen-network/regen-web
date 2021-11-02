import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Description from 'web-components/lib/components/description';
import { FormValues, isIndividual } from 'web-components/lib/components/inputs/RoleField';
import { OnboardingFormTemplate } from '../components/templates';
import { RolesForm, RolesValues } from '../components/organisms';
import {
  useProjectByIdQuery,
  useGetOrganizationProfileByEmailQuery,
  useUpdateProjectByIdMutation,
  PartyFieldsFragment,
  Maybe,
  ProjectPatch,
} from '../generated/graphql';

const exampleProjectUrl = '/projects/wilmot';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
}));

function getPartyIds(
  party?: Maybe<{ __typename?: 'Party' } & PartyFieldsFragment>,
): Partial<FormValues> | null {
  if (party) {
    const p = {
      partyId: party.id,
    };
    if (party.type === 'USER' && party.userByPartyId?.id) {
      return { id: party.userByPartyId.id, ...p };
    }
    if (party.type === 'ORGANIZATION' && party.organizationByPartyId) {
      const members = party.organizationByPartyId.organizationMembersByOrganizationId?.nodes;
      return {
        id: party.organizationByPartyId.id,
        addressId: party.addressByAddressId?.id,
        ownerPartyId: members?.length && members[0]?.userByMemberId?.partyId,
        ownerId: members?.length && members[0]?.userByMemberId?.id,
        ...p,
      };
    }
  }

  return null;
}

function stripPartyIds(values: FormValues | undefined): FormValues | undefined {
  if (values?.id && values?.partyId) {
    delete values.id;
    delete values.partyId;
    if (!isIndividual(values) && values?.addressId && values?.ownerId && values?.ownerPartyId) {
      delete values.addressId;
      delete values.ownerId;
      delete values.ownerPartyId;
    }
  }
  return values;
}

function stripIds(values: RolesValues): RolesValues {
  if (values) {
    return {
      'http://regen.network/landOwner': stripPartyIds(values['http://regen.network/landOwner']),
      'http://regen.network/landSteward': stripPartyIds(values['http://regen.network/landSteward']),
      'http://regen.network/projectDeveloper': stripPartyIds(values['http://regen.network/projectDeveloper']),
      'http://regen.network/projectOriginator': stripPartyIds(
        values['http://regen.network/projectOriginator'],
      ),
    };
  }
  return values;
}

const Roles: React.FC = () => {
  const styles = useStyles();
  const activeStep = 0;
  const history = useHistory();
  const { projectId } = useParams();
  const { user } = useAuth0();
  const userEmail = user?.email;

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
  });
  const { data: userProfileData } = useGetOrganizationProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail,
    },
  });

  let initialFieldValues: RolesValues | undefined;
  if (data?.projectById?.metadata) {
    const metadata = data.projectById.metadata;
    initialFieldValues = {
      'http://regen.network/landOwner': {
        ...metadata['http://regen.network/landOwner'],
        ...getPartyIds(data?.projectById?.partyByLandOwnerId),
      },
      'http://regen.network/landSteward': {
        ...metadata['http://regen.network/landSteward'],
        ...getPartyIds(data?.projectById?.partyByStewardId),
      },
      'http://regen.network/projectDeveloper': {
        ...metadata['http://regen.network/projectDeveloper'],
        ...getPartyIds(data?.projectById?.partyByDeveloperId),
      },
      'http://regen.network/projectOriginator': {
        ...metadata['http://regen.network/projectOriginator'],
        ...getPartyIds(data?.projectById?.partyByOriginatorId),
      },
    };
  }

  const saveAndExit = (): Promise<void> => {
    // TODO: functionality
    return Promise.resolve();
  };

  async function submit(values: RolesValues): Promise<void> {
    let projectPatch: ProjectPatch = {};

    if (values['http://regen.network/landOwner']?.partyId) {
      projectPatch = { landOwnerId: values['http://regen.network/landOwner']?.partyId, ...projectPatch };
    }
    if (values['http://regen.network/landSteward']?.partyId) {
      projectPatch = { stewardId: values['http://regen.network/landSteward']?.partyId, ...projectPatch };
    }
    if (values['http://regen.network/projectDeveloper']?.partyId) {
      projectPatch = {
        developerId: values['http://regen.network/projectDeveloper']?.partyId,
        ...projectPatch,
      };
    }
    if (values['http://regen.network/projectOriginator']?.partyId) {
      projectPatch = {
        originatorId: values['http://regen.network/projectOriginator']?.partyId,
        ...projectPatch,
      };
    }

    // We're striping the ids to not bloat the database with unnecessary data.
    // Those ids are only stored in the local state in order to be able to
    // update the related entities.
    // But there are not needed to make the project metadata valid
    // and are already stored through project relations (i.e. developerId, stewardId, etc.)
    const metadata = { ...data?.projectById?.metadata, ...stripIds(values) };
    projectPatch = { metadata, ...projectPatch };

    try {
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch,
          },
        },
      });
      history.push(`/project-pages/${projectId}/entity-display`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return (
    <OnboardingFormTemplate activeStep={activeStep} title="Roles" saveAndExit={saveAndExit}>
      <Description className={styles.description}>
        See an example{' '}
        <Link to={exampleProjectUrl} target="_blank">
          project page»
        </Link>
      </Description>
      <RolesForm submit={submit} initialValues={initialFieldValues} projectCreator={userProfileData} />
    </OnboardingFormTemplate>
  );
};

export { Roles };
