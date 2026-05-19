import { useMemo } from 'react';
import {
  GenericAuthorization,
  Grant,
} from '@regen-network/api/cosmos/authz/v1beta1/authz';
import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getGrantsQuery } from 'lib/queries/react-query/cosmos/authz/getGrantsQuery/getGrantsQuery';

import {
  grantee,
  msgTypes,
} from 'components/organisms/SellerSetupAccount/hooks/useStripeAccount.constants';

type UseHasMarketplaceAuthzParams = {
  enabled?: boolean;
  granter?: string;
};

type GenericAuthorizationGrant = {
  $typeUrl?: string;
  msg?: string;
};

const getGenericAuthorizationMsg = (grant: Grant): string | undefined => {
  const authorization = grant.authorization as
    | GenericAuthorizationGrant
    | undefined;

  if (
    authorization?.$typeUrl === GenericAuthorization.typeUrl &&
    authorization.msg
  ) {
    return authorization.msg;
  }

  return undefined;
};

export const useHasMarketplaceAuthz = ({
  enabled = true,
  granter,
}: UseHasMarketplaceAuthzParams) => {
  const { queryClient } = useLedger();
  const grantsQuery = useQuery(
    getGrantsQuery({
      client: queryClient,
      enabled: enabled && !!queryClient && !!granter && !!grantee,
      request: {
        granter: granter ?? '',
        grantee: grantee ?? '',
        msgTypeUrl: '',
      },
    }),
  );

  const hasMarketplaceAuthz = useMemo(() => {
    const grantedMsgTypes = new Set(
      (grantsQuery.data?.grants ?? [])
        .map(getGenericAuthorizationMsg)
        .filter((msgType): msgType is string => !!msgType),
    );

    return msgTypes.every(msgType => grantedMsgTypes.has(msgType));
  }, [grantsQuery.data?.grants]);

  return { ...grantsQuery, hasMarketplaceAuthz };
};
