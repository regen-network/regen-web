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
  PartyType,
  ProjectPatch,
  useCreatePartyMutation,
  useCreateWalletMutation,
  useGetOrganizationProfileByEmailQuery,
  useProjectByIdQuery,
  useShaclGraphByUriQuery,
  useUpdatePartyByIdMutation,
  useUpdateProjectByIdMutation,
  useUpdateWalletByIdMutation,
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

function stripPartyIds(
  values: ProfileFormValues | undefined,
): ProfileFormValues | undefined {
  delete values?.id;

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
  const [createWallet] = useCreateWalletMutation();
  const [createParty] = useCreatePartyMutation();
  const [updateWallet] = useUpdateWalletByIdMutation();
  const [updateParty] = useUpdatePartyByIdMutation();
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
      id: offChainProject?.partyByDeveloperId?.id,
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
    // TODO extract function into separate file
    // Project creation flow
    try {
      let projectPatch: ProjectPatch = {};

      const developer = values['regen:projectDeveloper'];
      const existingDeveloperParty = offChainProject?.partyByDeveloperId;
      const existingDeveloperWallet = existingDeveloperParty?.walletByWalletId;
      if (developer) {
        // 1. Handle wallet creation / update
        // This will just fail if there's already a wallet existing with given addr
        let walletId;
        const addr = developer['regen:address'];
        if (addr) {
          // The project developer associated wallet hasn't been created yet
          if (!existingDeveloperWallet) {
            const res = await createWallet({
              variables: {
                input: {
                  wallet: {
                    addr,
                  },
                },
              },
            });
            walletId = res.data?.createWallet?.wallet?.id;
          } else if (
            // New address is different from existing one
            existingDeveloperWallet.addr !== addr
          ) {
            walletId = existingDeveloperWallet.id;
            await updateWallet({
              variables: {
                input: {
                  id: walletId,
                  walletPatch: {
                    addr,
                  },
                },
              },
            });
          }
        }

        // 2. Handle party creation / update
        // The project developer associated party hasn't been created yet
        if (!existingDeveloperParty) {
          const res = await createParty({
            variables: {
              input: {
                party: {
                  type:
                    // TODO: extract reusable function and use constant
                    developer['@type'] === 'regen:Individual'
                      ? PartyType.User
                      : PartyType.Organization,
                  name: developer['schema:name'],
                  walletId,
                },
              },
            },
          });
          const developerId = res.data?.createParty?.party?.id;
          projectPatch = { developerId };
        } else if (
          developer['schema:name'] !== existingDeveloperParty.name ||
          developer['schema:description'] !==
            existingDeveloperParty.description ||
          developer['schema:image']?.['@value'] !==
            existingDeveloperParty.image ||
          walletId
        ) {
          updateParty({
            variables: {
              input: {
                id: developer.id,
                partyPatch: {
                  name: developer['schema:name'],
                  description: developer['schema:description'],
                  image: developer['schema:image']?.['@value'],
                  walletId,
                },
              },
            },
          });
        }
      }
      const newMetadata = { ...stripIds(values), ...metadata };
      // In creation mode, we store all metadata in the project.table temporarily
      if (!isEdit)
        projectPatch = {
          metadata: newMetadata,
          ...projectPatch,
        };
      await updateProject({
        variables: {
          input: {
            id: projectId,
            projectPatch,
          },
        },
      });
      if (!isEdit) {
        navigateNext();
      } else {
        // In edit mode, we need to update the project on chain metadata
        // TODO submit MsgUpdateProjectMetadata
      }
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
      projectId={offChainProject?.id}
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
