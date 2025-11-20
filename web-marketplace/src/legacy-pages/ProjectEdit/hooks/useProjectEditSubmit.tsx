import { useCallback } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import {
  MsgUpdateProjectAdmin,
  MsgUpdateProjectMetadata,
} from '@regen-network/api/regen/ecocredit/v1/tx';
import { OnTxSuccessfulProps } from 'legacy-pages/Dashboard/MyEcocredits/MyEcocredits.types';
import {
  getRoleAuthorizationIds,
  updateProjectAdminAction,
  updateProjectMetadataAction,
  wrapRbamActions,
} from 'utils/rbam.utils';

import { ProjectFieldsFragment } from 'generated/graphql';
import { NestedPartial } from 'types/nested-partial';
import { useAuth } from 'lib/auth/auth';
import { generateIri } from 'lib/db/api/metadata-graph';
import { ProjectMetadataLD } from 'lib/db/types/json-ld';
import { getAnchoredProjectBaseMetadata } from 'lib/rdf';
import { useWallet } from 'lib/wallet/wallet';

import { ProjectRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import type { SignAndBroadcastType } from 'hooks/useMsgClient';

import {
  PROJECT_UPDATE_METADATA_LABEL,
  PROJECT_UPDATED_METADATA_HEADER,
} from '../ProjectEdit.constants';

type Props = {
  projectId?: string;
  admin?: string;
  creditClassId?: string;
  signAndBroadcast: SignAndBroadcastType;
  onBroadcast: () => void;
  onErrorCallback?: (error?: Error) => void;
  onTxSuccessful: ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps) => void;
  adminDao?: ProjectFieldsFragment['daoByAdminDaoAddress'];
  currentUserRole?: ProjectRole;
  feeGranter?: string;
};

export type UseProjectEditSubmitParams = (
  metadata: NestedPartial<ProjectMetadataLD>,
  newAdmin?: string | null,
  doUpdateMetadata?: boolean,
  doUpdateAdmin?: boolean,
) => Promise<void>;

const useProjectEditSubmit = ({
  projectId,
  admin,
  creditClassId,
  adminDao,
  currentUserRole,
  feeGranter,
  signAndBroadcast,
  onBroadcast,
  onTxSuccessful,
  onErrorCallback,
}: Props): UseProjectEditSubmitParams => {
  const { _ } = useLingui();
  const { wallet } = useWallet();

  const { roleId, authorizationId } = getRoleAuthorizationIds({
    type: 'project',
    currentUserRole,
    authorizationName: 'can_manage_projects',
  });

  const projectEditSubmit = useCallback(
    async (
      metadata: NestedPartial<ProjectMetadataLD>,
      newAdmin?: string | null,
      doUpdateMetadata: boolean = true,
      doUpdateAdmin: boolean = false,
    ): Promise<void> => {
      const iriResponse = await generateIri(
        getAnchoredProjectBaseMetadata(metadata, creditClassId),
      );
      if (!iriResponse) return;
      const msgs = [];
      const actions = [];

      const { updateProjectMetadata, updateProjectAdmin } =
        regen.ecocredit.v1.MessageComposer.withTypeUrl;
      if (projectId && admin) {
        if (doUpdateMetadata) {
          const msg = {
            projectId,
            admin,
            newMetadata: iriResponse.iri,
          };
          if (adminDao?.address && authorizationId && roleId) {
            actions.push(
              updateProjectMetadataAction({ authorizationId, roleId, ...msg }),
            );
          } else msgs.push(updateProjectMetadata(msg));
        }

        if (doUpdateAdmin && newAdmin) {
          const msg = {
            projectId,
            admin,
            newAdmin,
          };
          if (adminDao?.address && authorizationId && roleId) {
            actions.push(
              updateProjectAdminAction({ authorizationId, roleId, ...msg }),
            );
          } else
            msgs.push(
              updateProjectAdmin({
                projectId,
                admin,
                newAdmin,
              }),
            );
        }

        if (actions.length > 0 && adminDao?.daoRbamAddress && wallet?.address) {
          msgs.push(
            wrapRbamActions({
              walletAddress: wallet?.address,
              rbamAddress: adminDao?.daoRbamAddress,
              actions,
            }),
          );
        }

        const onError = (err?: Error): void => {
          onErrorCallback && onErrorCallback(err);
        };
        const onSuccess = (): void => {
          if (projectId && metadata) {
            const cardItems = [
              {
                label: 'project',
                value: {
                  name: metadata['schema:name'] || '',
                  url: `/project/${projectId}`,
                },
              },
            ];

            if (doUpdateAdmin && admin && newAdmin) {
              cardItems.push(
                {
                  label: _(msg`new project admin`),
                  value: {
                    name: newAdmin,
                    url: `/profiles/${newAdmin}/portfolio`,
                  },
                },
                {
                  label: _(msg`old project admin`),
                  value: {
                    name: admin,
                    url: `/profiles/${admin}/portfolio`,
                  },
                },
              );
            }

            onTxSuccessful({
              cardItems,
              title: _(PROJECT_UPDATED_METADATA_HEADER),
              cardTitle: _(PROJECT_UPDATE_METADATA_LABEL),
            });
          }
        };

        await signAndBroadcast(
          { msgs, fee: 'auto', feeGranter },
          () => onBroadcast(),
          {
            onError,
            onSuccess,
          },
        );
      }
    },
    [
      creditClassId,
      projectId,
      admin,
      _,
      signAndBroadcast,
      onErrorCallback,
      onTxSuccessful,
      onBroadcast,
      authorizationId,
      roleId,
      adminDao?.address,
      feeGranter,
      wallet?.address,
      adminDao?.daoRbamAddress,
    ],
  );

  return projectEditSubmit;
};

export default useProjectEditSubmit;
