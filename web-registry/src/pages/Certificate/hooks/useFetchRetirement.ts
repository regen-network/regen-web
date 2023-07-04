import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { normalizeRetirement } from 'lib/normalizers/retirements/normalizeRetirement';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { getRetirementByNodeId } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByNodeId/getRetirementByNodeId';
import { useWallet } from 'lib/wallet/wallet';

import { getDataFromBatchDenomId } from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { getDisplayAdmin } from 'components/organisms/ProjectDetailsSection/ProjectDetailsSection.utils';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

type Params = {
  retirementNodeId: string;
};

export const useFetchRetirement = ({ retirementNodeId }: Params) => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));

  // Get retirement
  const { data, isLoading } = useQuery(
    getRetirementByNodeId({
      client: apolloClient,
      nodeId: retirementNodeId,
      enabled: !!apolloClient && !!wallet?.address,
    }),
  );
  const retirement = data?.data.retirement;

  // Extract data from batch denom id
  const retirementData = getDataFromBatchDenomId(retirement?.batchDenom);

  // Get project and credit class metadata
  const { projects, projectsMetadata, classes, classesMetadata } =
    useProjectsWithMetadata([retirementData?.projectId]);

  // Retrieve the party for the owner
  const ownerPartyData = useQuery(
    getPartyByAddrQuery({
      client: apolloClient,
      addr: retirement?.owner ?? '',
      enabled: !!apolloClient && !!csrfData && !!retirement?.owner,
    }),
  );
  const ownerParty = ownerPartyData?.data?.walletByAddr?.partyByWalletId;

  // Format the party data
  const owner = getDisplayAdmin(
    retirement?.owner,
    ownerParty,
    getDefaultAvatar(ownerParty),
  );

  // Normalize retirement
  const normalizedRetirement = normalizeRetirement({
    retirement,
    retirementData,
    owner,
    project: projects[0],
    projectMetadata: projectsMetadata[0],
    creditClass: classes[0],
    creditClassMetadata: classesMetadata[0],
  });

  return { retirement: normalizedRetirement, isLoadingRetirement: isLoading };
};
