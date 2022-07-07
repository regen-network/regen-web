import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';

import {
  FormValues,
  isIndividual,
} from 'web-components/lib/components/inputs/RoleField';
import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';
import {
  OnboardingFormTemplate,
  EditFormTemplate,
} from '../../components/templates';
import { RolesForm, RolesValues } from '../../components/organisms';
import { useProjectEditContext } from '../ProjectEdit';
import { useWallet } from '../../lib/wallet';
import {
  useProjectByIdQuery,
  useGetOrganizationProfileByEmailQuery,
  useUpdateProjectByIdMutation,
  PartyFieldsFragment,
  Maybe,
  ProjectPatch,
  useShaclGraphByUriQuery,
} from '../../generated/graphql';
import { getProjectShapeIri } from '../../lib/rdf';

function getPartyIds(
  i: number,
  party?: Maybe<{ __typename?: 'Party' } & PartyFieldsFragment>,
  autoIncrementId?: boolean,
): Partial<FormValues | ProfileFormValues> | null {
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
  if (autoIncrementId) {
    return { id: (i + 1).toString() };
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
    let i = 0;
    // In case of on chain credit class id, we don't save the entities in the db (yet),
    // so we just use some auto-incremented ids instead of uuid to identify entities.
    // This can be removed once Keplr login is fully implemented and we save the entities
    // as parties/users/orgs in the db.
    const landOwner = {
      ...metadata['regen:landOwner'],
      ...getPartyIds(
        0,
        project?.partyByLandOwnerId,
        !isEmpty(metadata['regen:landOwner']) && !!creditClassId,
      ),
    };
    const landSteward = {
      ...metadata['regen:landSteward'],
      ...getPartyIds(
        landOwner?.id && creditClassId ? Number(landOwner.id) : i,
        project?.partyByStewardId,
        !isEmpty(metadata['regen:landSteward']) && !!creditClassId,
      ),
    };
    const projectDeveloper = {
      ...metadata['regen:projectDeveloper'],
      ...getPartyIds(
        landSteward?.id && creditClassId ? Number(landSteward.id) : i,
        project?.partyByDeveloperId,
        !isEmpty(metadata['regen:projectDeveloper']) && !!creditClassId,
      ),
    };
    const projectOriginator = {
      ...metadata['regen:projectOriginator'],
      ...getPartyIds(
        projectDeveloper?.id && creditClassId ? Number(projectDeveloper.id) : i,
        project?.partyByOriginatorId,
        !isEmpty(metadata['regen:projectOriginator']) && !!creditClassId,
      ),
    };
    initialValues = {
      ...initialValues,
      'regen:landOwner': landOwner,
      'regen:landSteward': landSteward,
      'regen:projectDeveloper': projectDeveloper,
      'regen:projectOriginator': projectOriginator,
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    const nextStep = creditClassId ? 'description' : 'entity-display';
    navigate(`/project-pages/${projectId}/${nextStep}`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  async function submit(values: RolesValues): Promise<void> {
    let projectPatch: ProjectPatch = {};

    if (
      isFormValues(values['regen:landOwner']) &&
      values['regen:landOwner']?.partyId
    ) {
      projectPatch = {
        landOwnerId: values['regen:landOwner']?.partyId,
        ...projectPatch,
      };
    }
    if (
      isFormValues(values['regen:landSteward']) &&
      values['regen:landSteward']?.partyId
    ) {
      projectPatch = {
        stewardId: values['regen:landSteward']?.partyId,
        ...projectPatch,
      };
    }
    if (
      isFormValues(values['regen:projectDeveloper']) &&
      values['regen:projectDeveloper']?.partyId
    ) {
      projectPatch = {
        developerId: values['regen:projectDeveloper']?.partyId,
        ...projectPatch,
      };
    }
    if (
      isFormValues(values['regen:projectOriginator']) &&
      values['regen:projectOriginator']?.partyId
    ) {
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
      !isEdit && navigateNext();
    } catch (e) {
      // TODO: Should we display the error banner here?
      // https://github.com/regen-network/regen-registry/issues/554
      // console.log(e);
    }
  }

  const Form = (): JSX.Element => (
    <RolesForm
      submit={submit}
      onNext={navigateNext}
      onPrev={navigatePrev}
      initialValues={initialValues}
      projectCreator={userProfileData}
      creditClassId={creditClassId}
      graphData={graphData}
    />
  );

  return project ? (
    isEdit ? (
      <EditFormTemplate>
        <Form />
      </EditFormTemplate>
    ) : (
      <OnboardingFormTemplate
        activeStep={0}
        title="Roles"
        saveAndExit={saveAndExit}
      >
        <Form />
      </OnboardingFormTemplate>
    )
  ) : null;
};

export { Roles };
