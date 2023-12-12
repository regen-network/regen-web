import { useCallback, useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';

import { TablePaginationParams } from 'web-components/src/components/table/ActionsTable';
import { Account } from 'web-components/src/components/user/UserInfo';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/Table.constants';

import { RetirementsOrderBy } from 'generated/indexer-graphql';
import { useLedger } from 'ledger';
import { normalizeRetirement } from 'lib/normalizers/retirements/normalizeRetirement';
import { getClassIssuersQuery } from 'lib/queries/react-query/ecocredit/getClassIssuersQuery/getClassIssuersQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getAllRetirementsByOwnerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllRetirementsByOwner/getAllRetirementsByOwner';
import { getAllRetirementsByOwnerQueryKey } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllRetirementsByOwner/getAllRetirementsByOwner.constants';
import { useWallet } from 'lib/wallet/wallet';

import { getDisplayAccountOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';

import { getDataFromBatchDenomId } from '../MyEcocredits.utils';

type Props = {
  address?: string | null;
};

export const useFetchRetirements = ({ address }: Props) => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const { ecocreditClient } = useLedger();
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const reactQueryClient = useQueryClient();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });

  // All retirements
  const { data } = useQuery(
    getAllRetirementsByOwnerQuery({
      client: apolloClient,
      owner: address ?? wallet?.address ?? '',
      orderBy: RetirementsOrderBy.TimestampDesc,
      enabled: !!apolloClient && (!!wallet?.address || !!address),
    }),
  );
  const allRetirements = data?.data.allRetirements;

  // Extract data from batch denom ids
  const retirementsData = data?.data.allRetirements?.nodes.map(retirement =>
    getDataFromBatchDenomId(retirement?.batchDenom),
  );

  // Get project and credit class metadata for each retirement
  const projectIds = retirementsData?.map(
    retirementData => retirementData?.projectId,
  );

  const { projects, projectsMetadata, classesMetadata } =
    useProjectsWithMetadata(projectIds);

  // Get class issuer for each retirement

  // #1 retrieve issuers for each class id
  const classesIssuersData = useQueries({
    queries:
      retirementsData?.map(retirementData =>
        getClassIssuersQuery({
          client: ecocreditClient,
          request: {
            classId: retirementData?.classId,
          },
          enabled: !!ecocreditClient,
        }),
      ) ?? [],
  });
  const classesIssuers = classesIssuersData.map(
    classIssuers => classIssuers.data,
  );

  // #2 retrieve the account for the first issuer of each class
  const creditClassesIssuerResults = useQueries({
    queries:
      classesIssuers?.map(classIssuers =>
        getAccountByAddrQuery({
          client: apolloClient,
          addr: classIssuers?.issuers[0] ?? '',
          enabled: !!apolloClient && !!csrfData,
        }),
      ) ?? [],
  });
  const creditClassesIssuerData = creditClassesIssuerResults.map(
    creditClassIssuer => creditClassIssuer.data,
  );

  // #3 format the account data of the first issuer of each class
  const creditClassesIssuer = creditClassesIssuerData
    .map((issuer, index) => {
      const account = issuer?.accountByAddr;
      return getDisplayAccountOrAddress(
        classesIssuers[index]?.issuers[0],
        account,
      );
    })
    .filter((account: Account | undefined): account is Account => !!account);

  // Normalize retirements
  const normalizedRetirements = allRetirements?.nodes.map((retirement, index) =>
    normalizeRetirement({
      retirement,
      retirementData: retirementsData?.[index],
      issuer: creditClassesIssuer?.[index],
      project: projects?.[index],
      projectMetadata: projectsMetadata?.[index],
      creditClassMetadata: classesMetadata?.[index],
    }),
  );

  const retirementsPaginationParams: TablePaginationParams = useMemo(
    () => ({
      ...paginationParams,
      count: normalizedRetirements?.length,
    }),
    [paginationParams, normalizedRetirements?.length],
  );

  // Reload callback
  const reloadRetirements = useCallback((): void => {
    reactQueryClient.invalidateQueries({
      queryKey: getAllRetirementsByOwnerQueryKey(wallet?.address ?? ''),
    });
  }, [reactQueryClient, wallet?.address]);

  return {
    retirements: normalizedRetirements,
    retirementsPaginationParams,
    retirementsSetPaginationParams: setPaginationParams,
    reloadRetirements,
  };
};
