import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { normalizeRetirement } from 'lib/normalizers/retirements/normalizeRetirement';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getRetirementByNodeId } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByNodeId/getRetirementByNodeId';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { getDataFromBatchDenomId } from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import { getDisplayPartyOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

import { client as sanityClient } from '../../../lib/clients/sanity';

type Params = {
  retirementNodeId: string;
};

export const useFetchRetirement = ({ retirementNodeId }: Params) => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  // Sanity credit classes
  const {
    data: allSanityCreditClasses,
    isFetching: isLoadingCreditClassesSanity,
  } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Get retirement
  const { data, isLoading } = useQuery(
    getRetirementByNodeId({
      client: apolloClient,
      nodeId: retirementNodeId,
      enabled: !!apolloClient,
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
      enabled: !!apolloClient && !!retirement?.owner,
    }),
  );
  const ownerParty = ownerPartyData?.data?.walletByAddr?.partyByWalletId;

  // Format the party data
  const owner = getDisplayPartyOrAddress(retirement?.owner, ownerParty);

  // Sanity credit class
  const sanityCreditClass = allSanityCreditClasses?.allCreditClass.find(
    sanityCreditClass => sanityCreditClass.path === classes[0]?.id,
  );

  // Normalize retirement
  const normalizedRetirement = normalizeRetirement({
    retirement,
    retirementData,
    owner,
    project: projects[0],
    projectMetadata: projectsMetadata[0],
    creditClass: classes[0],
    sanityCreditClass,
    creditClassMetadata: classesMetadata[0],
  });

  return {
    retirement: normalizedRetirement,
    isLoadingRetirement: isLoading || isLoadingCreditClassesSanity,
  };
};
