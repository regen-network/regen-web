import { useCallback, useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { regen } from '@regen-network/api';
import { OrderBy } from '@regen-network/api/cosmos/tx/v1beta1/service';
import { MsgAnchor, MsgAttest } from '@regen-network/api/regen/data/v2/tx';
import { ContentHash_Graph } from '@regen-network/api/regen/data/v2/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MsgExecuteContract } from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { useSetAtom } from 'jotai';
import { useFeeGranter } from 'legacy-pages/Dashboard/MyProjects/hooks/useFeeGranter';
import { matchesIri } from 'legacy-pages/Post/hooks/useAttestEvents.utils';
import {
  attestAction,
  getAccountAssignment,
  getRoleAuthorizationIds,
  wrapRbamActions,
} from 'utils/rbam.utils';

import { ProjectFieldsFragment } from 'generated/graphql';
import { useLedger } from 'ledger';
import {
  processingModalAtom,
  txSuccessfulModalAtom,
} from 'lib/atoms/modals.atoms';
import { useAuth } from 'lib/auth/auth';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { getGetTxsEventQuery } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery';
import { getTxsEventQueryKey } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.utils';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { useWallet } from 'lib/wallet/wallet';

import { useMsgClient } from 'hooks';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import {
  CREATE_DATA_POST,
  POST_CREATED,
  POST_CREATED_SIGNING_FAILED,
  VIEW_POST,
} from '../PostFlow.constants';
import {
  FetchMsgAnchorParams,
  UseFetchMsgAnchorParams,
} from './useFetchMsgAnchor';
import { useGetSuccessModalContent } from './useGetSuccessModalContent';

type UseSignParams = UseFetchMsgAnchorParams & {
  offChainProject?: ProjectFieldsFragment | null;
};

type SignParams = {
  contentHash: ContentHash_Graph;
} & FetchMsgAnchorParams;

export const useSign = ({
  projectSlug,
  projectId,
  offChainProjectId,
  projectName,
  onModalClose,
  offChainProject,
}: UseSignParams) => {
  const { _ } = useLingui();
  const getSuccessModalContent = useGetSuccessModalContent();

  const { queryClient } = useLedger();
  const { wallet } = useWallet();
  const { refetch } = useQuery(
    getGetTxsEventQuery({
      client: queryClient,
      enabled: false,
      request: {
        query: `${messageActionEquals}'${MsgAnchor.typeUrl}'`,
        orderBy: OrderBy.ORDER_BY_DESC,
        page: 1n,
        limit: 1n,
      },
    }),
  );

  const setTxSuccessfulModalAtom = useSetAtom(txSuccessfulModalAtom);
  const setProcessingModalAtom = useSetAtom(processingModalAtom);

  const { signAndBroadcast } = useMsgClient();
  const reactQueryClient = useQueryClient();

  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const orgDao = useDaoOrganization();
  const feeGranter = useFeeGranter({ offChainProject });

  const { data } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!orgDao?.address,
      address: orgDao?.address as string,
    }),
  );
  const currentUserOrgAssignment = useMemo(
    () =>
      getAccountAssignment({
        accountId: activeAccountId,
        assignments: data?.daoByAddress?.assignmentsByDaoAddress?.nodes,
      }),
    [data?.daoByAddress?.assignmentsByDaoAddress?.nodes, activeAccountId],
  );
  const { roleId, authorizationId } = getRoleAuthorizationIds({
    type: 'organization',
    currentUserRole: currentUserOrgAssignment?.roleName,
    authorizationName: 'can_anchor_attest_data',
  });
  const withOrganization = useMemo(
    () =>
      feeGranter && orgDao && roleId && authorizationId
        ? {
            daoAddress: orgDao.address,
            daoRbamAddress: orgDao.daoRbamAddress,
            roleId,
            authorizationId,
          }
        : undefined,
    [feeGranter, orgDao, roleId, authorizationId],
  );

  const fetchAnchorTxHash = useCallback(
    async ({ iri }: { iri: string }) => {
      const { data: anchorTxsData } = await refetch();
      const txResponses = anchorTxsData?.txResponses?.filter(txRes =>
        matchesIri(txRes, iri),
      );
      return txResponses?.[0]?.txhash;
    },
    [refetch],
  );

  const sign = useCallback(
    async ({ contentHash, iri, createdPostData }: SignParams) => {
      if (wallet?.address) {
        let txMsg;
        if (withOrganization) {
          const msgAttest = {
            attestor: withOrganization.daoAddress,
            contentHashes: [contentHash],
          };
          const action = attestAction({
            roleId: withOrganization.roleId,
            authorizationId: withOrganization.authorizationId,
            ...msgAttest,
          });
          txMsg = wrapRbamActions({
            walletAddress: wallet?.address,
            rbamAddress: withOrganization.daoRbamAddress,
            actions: [action],
          });
        } else {
          txMsg = regen.data.v2.MessageComposer.withTypeUrl.attest({
            attestor: wallet?.address,
            contentHashes: [contentHash],
          });
        }
        await signAndBroadcast(
          {
            msgs: [txMsg],
            feeGranter,
            fee: 'auto',
          },
          (): void => {
            setProcessingModalAtom(atom => void (atom.open = true));
          },
          {
            onError: async (error?: Error) => {
              const anchorTxHash = await fetchAnchorTxHash({ iri });

              setProcessingModalAtom(atom => void (atom.open = false));
              const { cardItems, buttonLink } = getSuccessModalContent({
                createdPostData,
                projectSlug,
                projectId,
                offChainProjectId,
                projectName,
                anchorTxHash,
                signingError: String(error),
              });
              setTxSuccessfulModalAtom(atom => {
                atom.open = true;
                atom.cardItems = cardItems;
                atom.title = _(POST_CREATED_SIGNING_FAILED);
                atom.cardTitle = _(msg`Attest`);
                atom.buttonTitle = _(VIEW_POST);
                atom.buttonLink = buttonLink;
                atom.txHash = undefined;
              });
              onModalClose();
            },
            onSuccess: async (deliverTxResponse?: DeliverTxResponse) => {
              const anchorTxHash = await fetchAnchorTxHash({ iri });

              await reactQueryClient.invalidateQueries({
                queryKey: getTxsEventQueryKey({
                  request: {
                    query: `${messageActionEquals}'${MsgAttest.typeUrl}'`,
                    orderBy: OrderBy.ORDER_BY_DESC,
                  },
                }),
              });
              // Can take quite long so we do not await
              void reactQueryClient.invalidateQueries({
                queryKey: getTxsEventQueryKey({
                  request: {
                    query: `${messageActionEquals}'${MsgExecuteContract.typeUrl}'`,
                    orderBy: OrderBy.ORDER_BY_DESC,
                  },
                }),
              });

              setProcessingModalAtom(atom => void (atom.open = false));

              const { cardItems, buttonLink } = getSuccessModalContent({
                createdPostData,
                projectSlug,
                projectId,
                offChainProjectId,
                projectName,
                anchorTxHash:
                  anchorTxHash ?? deliverTxResponse?.transactionHash,
                attestTxHash: deliverTxResponse?.transactionHash,
              });
              setTxSuccessfulModalAtom(atom => {
                atom.open = true;
                atom.cardItems = cardItems;
                atom.title = _(POST_CREATED);
                atom.cardTitle = _(CREATE_DATA_POST);
                atom.buttonTitle = _(VIEW_POST);
                atom.buttonLink = buttonLink;
                atom.txHash = undefined;
              });
              onModalClose();
            },
          },
        );
      }
    },
    [
      _,
      fetchAnchorTxHash,
      getSuccessModalContent,
      offChainProjectId,
      onModalClose,
      projectId,
      projectName,
      projectSlug,
      reactQueryClient,
      setProcessingModalAtom,
      setTxSuccessfulModalAtom,
      signAndBroadcast,
      wallet?.address,
      withOrganization,
      feeGranter,
    ],
  );

  return sign;
};
