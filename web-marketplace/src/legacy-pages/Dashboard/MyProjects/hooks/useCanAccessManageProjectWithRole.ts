import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';
import { useWallet, Wallet } from 'lib/wallet/wallet';

import { canAccessManageProjectWithRole } from '../MyProjects.utils';
import { useFetchProject } from './useFetchProject';

export type UseCanAccessManageProjectWithRoleParams = {
  onChainProject: ReturnType<typeof useFetchProject>['onChainProject'];
  offChainProject: ReturnType<typeof useFetchProject>['offChainProject'];
  activeAccountId: string | undefined;
  wallet: Wallet | undefined;
};

export const useCanAccessManageProjectWithRole = ({
  offChainProject,
  onChainProject,
  activeAccountId,
  wallet,
}: UseCanAccessManageProjectWithRoleParams) => {
  const { loginDisabled } = useWallet();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const { data: projectDaoData, isLoading } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled:
        !!graphqlClient && !!offChainProject?.daoByAdminDaoAddress?.address,
      address: offChainProject?.daoByAdminDaoAddress?.address as string,
      includePrivate: !loginDisabled,
    }),
  );

  const { canAccessManageProject, role } = useMemo(
    () =>
      canAccessManageProjectWithRole({
        onChainProject,
        offChainProject,
        activeAccountId,
        wallet,
        assignments:
          projectDaoData?.daoByAddress?.assignmentsByDaoAddress?.nodes,
      }),
    [activeAccountId, offChainProject, onChainProject, wallet, projectDaoData],
  );

  return { canAccessManageProject, role, isLoading };
};
