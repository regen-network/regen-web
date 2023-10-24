import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import {
  AnchoredProjectMetadataLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { useAccountInfo } from 'pages/ProfileEdit/hooks/useAccountInfo';
import { getDisplayPartyOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';

import { getDisplayParty } from '../ProjectDetails.utils';

type Params = {
  anchoredMetadata?: AnchoredProjectMetadataLD;
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  creditClassMetadata?: CreditClassMetadataLD;
};

export const useStakeholders = ({
  anchoredMetadata,
  offChainProject,
  onChainProject,
  creditClassMetadata,
}: Params) => {
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const projectDeveloper = getDisplayParty(
    anchoredMetadata?.['regen:projectDeveloper'],
    offChainProject?.partyByDeveloperId,
  );

  const projectVerifier = getDisplayParty(
    anchoredMetadata?.['regen:projectVerifier'],
    offChainProject?.partyByVerifierId,
  );

  const program = getDisplayParty(
    creditClassMetadata?.['regen:sourceRegistry'],
    offChainProject?.creditClassByCreditClassId?.partyByRegistryId,
  );

  const adminAddr = onChainProject?.admin;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: partyByAddr } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: adminAddr ?? '',
      enabled: !!adminAddr && !!graphqlClient && !!csrfData,
    }),
  );
  const { party } = useAccountInfo({ partyByAddr });
  const admin = getDisplayPartyOrAddress(adminAddr, party);

  return {
    projectDeveloper,
    projectVerifier,
    program,
    admin,
  };
};
