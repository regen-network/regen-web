import { useSearchParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';

import { normalizeRetirement } from 'lib/normalizers/retirements/normalizeRetirement';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getAccountByCustodialAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByCustodialAddressQuery/getAccountByCustodialAddressQuery';
import { getTxHashForPaymentIntentQuery } from 'lib/queries/react-query/registry-server/graphql/getTxHashForPaymentIntent/getTxHashForPaymentIntentQuery';
import { getRetirementByNodeId } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByNodeId/getRetirementByNodeId';
import { getRetirementByTxHash } from 'lib/queries/react-query/registry-server/graphql/indexer/getRetirementByTxHash/getRetirementByTxHash';
import { getAllSanityCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { getDataFromBatchDenomId } from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import { getDisplayAccountOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

import { client as sanityClient } from '../../../lib/clients/sanity';
import { isPaymentIntentId } from '../Certificate.utils';

type Params = {
  id: string;
};

export const useFetchRetirement = ({ id }: Params) => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [searchParams] = useSearchParams();
  // This is to display customer name for visiting users,
  // because we don't store their name in the account table since the email has not been verified
  const customerName = searchParams.get('name');

  // Sanity credit classes
  const {
    data: allSanityCreditClasses,
    isFetching: isLoadingCreditClassesSanity,
  } = useQuery(
    getAllSanityCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Get retirement through payment intent id
  // This can happen after successful fiat purchase but the retirement hasn't been found yet
  const isValidPaymentIntentId = isPaymentIntentId(id);
  const { data: txHashData, isFetching: isTxHashLoading } = useQuery(
    getTxHashForPaymentIntentQuery({
      client: apolloClient,
      enabled: !!isValidPaymentIntentId && !!apolloClient,
      paymentIntentId: id,
    }),
  );
  const txHash = txHashData?.data.getTxHashForPaymentIntent;
  const {
    data: retirementByTxHashData,
    isFetching: isRetirementByTxHashLoading,
  } = useQuery(
    getRetirementByTxHash({
      client: apolloClient,
      enabled: !!txHash && !!apolloClient,
      txHash: txHash as string,
    }),
  );

  // Get retirement through nodeId
  const { data, isLoading } = useQuery(
    getRetirementByNodeId({
      client: apolloClient,
      nodeId: id,
      enabled: !!apolloClient && !isValidPaymentIntentId,
    }),
  );

  const retirement = isValidPaymentIntentId
    ? retirementByTxHashData?.data.retirementByTxHash
    : data?.data.retirement;

  // Extract data from batch denom id
  const retirementData = getDataFromBatchDenomId(retirement?.batchDenom);

  // Get project and credit class metadata
  const { projects, projectsMetadata, classes, classesMetadata } =
    useProjectsWithMetadata([retirementData?.projectId]);

  // Retrieve the party for the owner
  const { data: ownerAccountData } = useQuery(
    getAccountByAddrQuery({
      client: apolloClient,
      addr: retirement?.owner ?? '',
      enabled: !!apolloClient && !!retirement?.owner,
    }),
  );
  const { data: ownerCustodialAccountData } = useQuery(
    getAccountByCustodialAddressQuery({
      client: apolloClient,
      custodialAddress: retirement?.owner ?? '',
      enabled: !!apolloClient && !!retirement?.owner,
    }),
  );
  const ownerAccount =
    ownerAccountData?.accountByAddr ||
    ownerCustodialAccountData?.accountByCustodialAddress;

  // Format the party data
  const owner = getDisplayAccountOrAddress(
    retirement?.owner,
    ownerAccount,
    customerName,
  );

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
    isLoadingRetirement:
      (isValidPaymentIntentId
        ? isTxHashLoading || isRetirementByTxHashLoading
        : isLoading) || isLoadingCreditClassesSanity,
  };
};
