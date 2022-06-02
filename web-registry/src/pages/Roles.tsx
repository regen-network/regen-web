import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import {
  FormValues,
  isIndividual,
} from 'web-components/lib/components/inputs/RoleField';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';
import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../components/templates';
import { RolesForm, RolesValues } from '../components/organisms';
import { useProjectEditContext } from '../pages/ProjectEdit';
import { useWallet } from '../lib/wallet';
import {
  useProjectByIdQuery,
  useGetOrganizationProfileByEmailQuery,
  useUpdateProjectByIdMutation,
  PartyFieldsFragment,
  Maybe,
  ProjectPatch,
  useShaclGraphByUriQuery,
} from '../generated/graphql';
import { getProjectShapeIri } from '../lib/rdf';

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
      const members =
        party.organizationByPartyId.organizationMembersByOrganizationId?.nodes;
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

function isFormValues(
  values: FormValues | ProfileFormValues | undefined,
): values is FormValues {
  if ((values as FormValues)?.partyId) {
    return true;
  }
  return false;
}

function stripPartyIds(
  values: FormValues | ProfileFormValues | undefined,
): FormValues | undefined {
  if (values?.id) {
    delete values.id;
  }
  if (isFormValues(values)) {
    delete values.partyId;
    if (
      !isIndividual(values) &&
      values?.addressId &&
      values?.ownerId &&
      values?.ownerPartyId
    ) {
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
      'regen:landOwner': stripPartyIds(values['regen:landOwner']),
      'regen:landSteward': stripPartyIds(values['regen:landSteward']),
      'regen:projectDeveloper': stripPartyIds(values['regen:projectDeveloper']),
      'regen:projectOriginator': stripPartyIds(
        values['regen:projectOriginator'],
      ),
    };
  }
  return values;
}

const Roles: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();
  const { user } = useAuth0();
  const userEmail = user?.email;

  const { wallet } = useWallet();

  const [updateProject] = useUpdateProjectByIdMutation();
  const { data } = useProjectByIdQuery({
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });
  const project = data?.projectById;
  const creditClassId = project?.creditClassByCreditClassId?.onChainId;

  const { data: userProfileData } = useGetOrganizationProfileByEmailQuery({
    skip: !userEmail,
    variables: {
      email: userEmail as string,
    },
  });

  const { data: graphData } = useShaclGraphByUriQuery({
    // do not fetch SHACL Graph until we get the project
    // and the optional on chain credit class id associatied to it,
    // this prevents from fetching this twice
    skip: !project,
    variables: {
      uri: getProjectShapeIri(creditClassId),
    },
  });

  let initialValues: RolesValues = { admin: wallet?.address };
  if (project?.metadata) {
    const metadata = project.metadata;
    initialValues = {
      ...initialValues,
      'regen:landOwner': {
        ...metadata['regen:landOwner'],
        ...getPartyIds(project?.partyByLandOwnerId),
      },
      'regen:landSteward': {
        ...metadata['regen:landSteward'],
        ...getPartyIds(project?.partyByStewardId),
      },
      'regen:projectDeveloper': {
        ...metadata['regen:projectDeveloper'],
        ...getPartyIds(project?.partyByDeveloperId),
      },
      'regen:projectOriginator': {
        ...metadata['regen:projectOriginator'],
        ...getPartyIds(project?.partyByOriginatorId),
      },
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  async function submit(values: RolesValues): Promise<void> {
    let projectPatch: ProjectPatch = {};

    if (values['regen:landOwner']?.partyId) {
      projectPatch = {
        landOwnerId: values['regen:landOwner']?.partyId,
        ...projectPatch,
      };
    }
    if (values['regen:landSteward']?.partyId) {
      projectPatch = {
        stewardId: values['regen:landSteward']?.partyId,
        ...projectPatch,
      };
    }
    if (values['regen:projectDeveloper']?.partyId) {
      projectPatch = {
        developerId: values['regen:projectDeveloper']?.partyId,
        ...projectPatch,
      };
    }
    if (values['regen:projectOriginator']?.partyId) {
      projectPatch = {
        originatorId: values['regen:projectOriginator']?.partyId,
        ...projectPatch,
      };
    }

    // We're striping the ids to not bloat the database with unnecessary data.
    // Those ids are only stored in the local state in order to be able to
    // update the related entities.
    // But there are not needed to make the project metadata valid
    // and are already stored through project relations (i.e. developerId, stewardId, etc.)
    const metadata = { ...project?.metadata, ...stripIds(values) };
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
      const nextStep = creditClassId ? 'description' : 'entity-display';
      !isEdit && navigate(`/project-pages/${projectId}/${nextStep}`);
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  return isEdit ? (
    <EditFormTemplate>
      <RolesForm
        submit={submit}
        initialValues={initialValues}
        projectCreator={userProfileData}
        creditClassId={creditClassId}
        graphData={graphData}
      />
    </EditFormTemplate>
  ) : (
    <OnboardingFormTemplate
      activeStep={0}
      title="Roles"
      saveAndExit={saveAndExit}
    >
      <RolesForm
        submit={submit}
        initialValues={initialValues}
        projectCreator={userProfileData}
        creditClassId={creditClassId}
        graphData={graphData}
      />
    </OnboardingFormTemplate>
  );
};

export { Roles };
