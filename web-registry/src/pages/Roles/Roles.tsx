import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { isEmpty } from 'lodash';

import { ProfileFormValues } from 'web-components/lib/components/modal/ProfileModal';

import { getProjectShapeIri } from 'lib/rdf';

import { useCreateProjectContext } from 'pages/ProjectCreate';
import {
  FormValues,
  isIndividual,
} from 'components/molecules/RoleField/RoleField';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { RolesForm, RolesValues } from '../../components/organisms';
import {
  EditFormTemplate,
  OnboardingFormTemplate,
} from '../../components/templates';
import {
  Maybe,
  PartyFieldsFragment,
  ProjectPatch,
  useGetOrganizationProfileByEmailQuery,
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdateProjectByIdMutation,
} from '../../generated/graphql';
import { useWallet } from '../../lib/wallet/wallet';
import { useProjectEditContext } from '../ProjectEdit';

function getPartyIds(
  party?: Maybe<{ __typename?: 'Party' } & PartyFieldsFragment>,
): Partial<FormValues | ProfileFormValues> | null {
  if (party) {
    const p = {
      partyId: party.id,
    };
    if (party.type === 'USER' && party.userByPartyId?.id) {
      return { id: party.userByPartyId.id, ...p };
    }
    if (party.type === 'ORGANIZATION' && party.organizationByPartyId) {
      return {
        id: party.organizationByPartyId.id,
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
  values: ProfileFormValues | undefined,
): ProfileFormValues | undefined {
  delete values?.id;
  delete values?.partyId;

  return values;
}

function stripIds(values: RolesValues): RolesValues {
  if (values) {
    return {
      'regen:projectDeveloper': stripPartyIds(values['regen:projectDeveloper']),
    };
  }
  return values;
}

const Roles: React.FC<React.PropsWithChildren<unknown>> = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { isEdit } = useProjectEditContext();
  const { onChainProject, offChainProject, metadata } = useProjectWithMetadata(
    projectId,
    isEdit,
  );
  const [updateProject] = useUpdateProjectByIdMutation();

  const { wallet } = useWallet();

  // TODO validation
  // const { data: graphData } = useShaclGraphByUriQuery({
  //   // do not fetch SHACL Graph until we get the on chain project credit class id (in edit mode)
  //   // or the credit class id from the create project context,
  //   // this prevents from fetching this twice
  //   skip: !onChainProject || !creditClassId,
  //   variables: {
  //     uri: getProjectShapeIri(isEdit ? onChainProject?.classId : creditClassId),
  //   },
  // });

  let initialValues: RolesValues = {
    // In edit mode, use existing on chain project admin
    // In creation mode, use current wallet address
    admin: isEdit ? onChainProject?.admin : wallet?.address,
  };
  if (metadata) {
    const projectDeveloper = {
      ...metadata['regen:projectDeveloper'],
      ...getPartyIds(offChainProject?.partyByDeveloperId),
    };
    initialValues = {
      ...initialValues,
      'regen:projectDeveloper': projectDeveloper,
    };
  }

  async function saveAndExit(): Promise<void> {
    // TODO: functionality
  }

  function navigateNext(): void {
    navigate(`/project-pages/${projectId}/description`);
  }

  function navigatePrev(): void {
    navigate(`/project-pages/${projectId}/location`);
  }

  async function submit(values: RolesValues): Promise<void> {
    let projectPatch: ProjectPatch = {};

    if (
      isFormValues(values['regen:projectDeveloper']) &&
      values['regen:projectDeveloper']?.partyId
    ) {
      projectPatch = {
        developerId: values['regen:projectDeveloper']?.partyId,
      };
    }

    // We're striping the ids to not bloat the database with unnecessary data.
    // Those ids are only stored in the local state in order to be able to
    // update the related entities.
    // But there are not needed to make the project metadata valid
    // and are already stored through project relations (i.e. developerId, stewardId, etc.)
    projectPatch = { ...metadata, ...stripIds(values), ...projectPatch };

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
      // graphData={graphData}
    />
  );

  return isEdit ? (
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
  );
};

export { Roles };
