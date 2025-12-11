import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { reactQueryClient } from 'lib/clients/reactQueryClient';
import { getProjectByIdKey } from 'lib/queries/react-query/sanity/getProjectByIdQuery/getProjectByIdQuery.constants';
import { getUnanchoredProjectMetadata } from 'lib/rdf';
import { useCallback } from 'react';
import {
  getRoleAuthorizationIds,
  updateProjectAdminAction,
  wrapRbamActions,
} from 'utils/rbam.utils';
import { getOnChainProjectId } from '../ProjectReview.util';
import { useLingui } from '@lingui/react';
import { useLedger } from 'ledger';
import { UseStateSetter } from 'types/react/use-state';
import { useNavigate, useParams } from 'react-router-dom';
import { useWallet } from 'lib/wallet/wallet';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { useUpdateProjectByIdMutation } from 'generated/graphql';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { useMsgClient } from 'hooks';

type UseHandleTxDeliveredParams = {
  setDeliverTxResponse: (
    deliverTxResponse?: DeliverTxResponse | undefined,
  ) => void;
  organizationRole?: string;
  projectAdminDaoAddress?: string | null;
  editPath: string;
  metadata: ProjectMetadataLD;
};

export const useHandleTxDelivered = ({
  setDeliverTxResponse,
  organizationRole,
  projectAdminDaoAddress,
  editPath,
  metadata,
}: UseHandleTxDeliveredParams) => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { signingCosmWasmClient } = useLedger();
  const { projectId } = useParams();
  const organizationDao = useDaoOrganization();
  const [updateProject] = useUpdateProjectByIdMutation();
  const navigate = useNavigate();
  const { signAndBroadcast } = useMsgClient();

  const handleTxDelivered = useCallback(
    () =>
      async (_deliverTxResponse: DeliverTxResponse): Promise<void> => {
        setDeliverTxResponse(_deliverTxResponse);
        const projectOnChainId = getOnChainProjectId(_deliverTxResponse);

        if (projectId) {
          // Update the project in the DB as published with on chain ID
          await updateProject({
            variables: {
              input: {
                id: projectId,
                projectPatch: {
                  onChainId: projectOnChainId,
                  published: true,
                  metadata: getUnanchoredProjectMetadata(
                    metadata,
                    projectOnChainId,
                  ),
                },
              },
            },
          });
          await reactQueryClient.invalidateQueries({
            queryKey: getProjectByIdKey(projectId),
          });

          // If on chain project has been created with organization DAO as admin
          // we need to update the project admin to the intended project DAO address
          if (organizationDao?.address && projectAdminDaoAddress) {
            if (!wallet?.address || !signingCosmWasmClient) {
              throw new Error(
                _(
                  msg`Missing wallet address or signing client to update project admin`,
                ),
              );
            }
            const { roleId, authorizationId } = getRoleAuthorizationIds({
              type: 'organization',
              currentUserRole: organizationRole,
              authorizationName: 'can_manage_projects',
            });
            if (!roleId || !authorizationId) {
              throw new Error(
                _(msg`You do not have permission to update projects`),
              );
            }
            const updateProjectAdminActionMsg = updateProjectAdminAction({
              roleId,
              authorizationId,
              ...{
                projectId,
                admin: organizationDao.address,
                newAdmin: projectAdminDaoAddress,
              },
            });

            const txResult = await signAndBroadcast({
              msgs: [
                wrapRbamActions({
                  walletAddress: wallet.address,
                  rbamAddress: organizationDao.address,
                  actions: [updateProjectAdminActionMsg],
                }),
              ],
              feeGranter: organizationDao.address,
              fee: 'auto',
            });
            if (!txResult || typeof txResult === 'string') {
              console.log('txResult', txResult);
              return;
            }
          }

          navigate(`${editPath}/finished`);
        }
      },
    [
      projectId,
      wallet,
      organizationDao,
      projectAdminDaoAddress,
      organizationRole,
      updateProject,
      reactQueryClient,
      navigate,
      editPath,
      metadata,
    ],
  );

  return handleTxDelivered;
};
