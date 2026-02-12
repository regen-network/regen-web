import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { useQueryClient } from '@tanstack/react-query';
import { getMsgExecuteContract } from 'utils/cosmwasm';
import {
  createProjectAction,
  getAuthorizationId,
  wrapRbamActions,
} from 'utils/rbam.utils';

import { useUpdateProjectByIdMutation } from 'generated/graphql';
import { generateIri, IriFromMetadataSuccess } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getProjectByIdKey } from 'lib/queries/react-query/registry-server/graphql/getProjectByIdQuery/getProjectByIdQuery.constants';

import { SignAndBroadcastType } from '../../../hooks/useMsgClient';

interface MsgCreateProjectValues {
  classId: string;
  admin: string;
  metadata: Partial<ProjectMetadataLD>;
  jurisdiction: string;
  referenceId: string;
}

interface Props {
  signAndBroadcast: SignAndBroadcastType;
  organizationDaoAddress?: string;
  organizationRbamAddress?: string;
  projectDaoAddress?: string | null;
  // wallet address of the signer (needed when executing through org RBAM)
  walletAddress?: string;
  organizationRole?: string;
}

type Return = {
  projectCreateSubmit: (values: MsgCreateProjectValues) => Promise<void>;
};

const useProjectCreateSubmit = ({
  signAndBroadcast,
  organizationDaoAddress,
  organizationRbamAddress,
  projectDaoAddress,
  walletAddress,
  organizationRole,
}: Props): Return => {
  const [updateProject] = useUpdateProjectByIdMutation();
  const reactQueryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { _ } = useLingui();

  const projectCreateSubmit = useCallback(
    async ({
      classId,
      admin,
      metadata,
      jurisdiction,
      referenceId,
    }: MsgCreateProjectValues): Promise<void> => {
      if (!classId) {
        // This is an off-chain project without any credit class id,
        // we just need to set published to true
        if (projectId) {
          await updateProject({
            variables: {
              input: {
                id: projectId,
                projectPatch: {
                  published: true,
                },
              },
            },
          });
          await reactQueryClient.invalidateQueries({
            queryKey: getProjectByIdKey(projectId),
          });
          navigate(`/project-pages/${projectId}/finished`);
        }
      } else {
        if (!walletAddress) {
          throw new Error(
            _(msg`Wallet address is required to create project on-chain`),
          );
        }
        // We create the project on-chain
        let iriResponse:
          | IriFromMetadataSuccess<Partial<ProjectMetadataLD>>
          | undefined;

        try {
          iriResponse = await generateIri(metadata);
          if (!iriResponse) return;
        } catch (err) {
          throw new Error(err as string);
        }

        // If creating from organization, use RBAM execute_actions through org DAO
        if (
          organizationDaoAddress &&
          organizationRbamAddress &&
          projectDaoAddress
        ) {
          const { authorizationId: createProjectAuthId } = getAuthorizationId({
            type: 'organization',
            currentUserRole: organizationRole,
            authorizationName: 'can_create_projects',
          });

          if (!createProjectAuthId) {
            throw new Error(
              _(msg`You do not have permission to create projects`),
            );
          }

          // Create project with organization DAO as admin initially
          // it cannot be the projectDaoAddress because the admin should be the address triggering creation
          // so it needs to be updated in a separate tx (handleTxDelivered in ProjectReview.tsx)
          const createProjectActionMsg = createProjectAction({
            authorizationId: createProjectAuthId,
            ...{
              classId,
              admin: organizationDaoAddress,
              metadata: iriResponse.iri,
              jurisdiction,
              referenceId,
            },
          });

          const executeMsg = wrapRbamActions({
            // Sender must be the signer (the user wallet), not the org DAO address
            walletAddress,
            rbamAddress: organizationRbamAddress,
            actions: [createProjectActionMsg],
          });

          const tx = {
            msgs: [executeMsg],
            fee: 'auto' as const, // simulate to avoid underestimating gas on RBAM execute
            feeGranter: organizationDaoAddress,
          };

          await signAndBroadcast(tx);
        } else {
          // Standard project creation (not from organization)
          const msg =
            regen.ecocredit.v1.MessageComposer.withTypeUrl.createProject({
              classId,
              admin,
              metadata: iriResponse.iri,
              jurisdiction,
              referenceId,
            });

          const tx = {
            msgs: [msg],
            fee: 'auto' as const, // simulate to avoid underestimating gas for project creation
          };

          await signAndBroadcast(tx);
        }
      }
    },
    [
      navigate,
      projectId,
      reactQueryClient,
      signAndBroadcast,
      updateProject,
      organizationDaoAddress,
      organizationRbamAddress,
      projectDaoAddress,
      walletAddress,
      _,
      organizationRole,
    ],
  );

  return { projectCreateSubmit };
};

export { useProjectCreateSubmit };
