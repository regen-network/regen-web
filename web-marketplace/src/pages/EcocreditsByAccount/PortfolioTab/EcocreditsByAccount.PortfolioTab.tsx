import { useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { isValidAddress } from 'web-components/lib/components/inputs/validation';

import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByIdQuery/getPartyByIdQuery';

import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';
import { Portfolio } from 'components/organisms';

export const PortfolioTab = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const isValidRegenAddress = isValidAddress(accountAddressOrId ?? '', 'regen');

  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyById } = useQuery(
    getPartyByIdQuery({
      client: graphqlClient,
      id: accountAddressOrId ?? '',
      enabled: !isValidRegenAddress && !!graphqlClient && !!csrfData,
    }),
  );

  const address = isValidRegenAddress
    ? accountAddressOrId
    : partyById?.partyById?.walletByWalletId?.addr ?? '';

  // Ecocredits
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address },
  );

  // Retirement certificates
  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
  } = useFetchRetirements({ address });

  // Basket tokens
  const { basketTokens } = useFetchBaskets({
    address,
    credits,
  });

  return (
    <Portfolio
      credits={credits}
      basketTokens={basketTokens}
      onTableChange={setPaginationParams}
      retirements={retirements}
      retirementsPaginationParams={retirementsPaginationParams}
      onRetirementTableChange={retirementsSetPaginationParams}
      initialPaginationParams={paginationParams}
      isIgnoreOffset
    />
  );
};
