import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';

import { Party } from 'web-components/lib/components/user/UserInfo';

import { useLedger } from 'ledger';
import { AnchoredProjectMetadataLD } from 'lib/db/types/json-ld';
import { normalizeRetirement } from 'lib/normalizers/retirements/normalizeRetirement';
import { getClassIssuersQuery } from 'lib/queries/react-query/ecocredit/getClassIssuersQuery/getClassIssuersQuery';
import { getProjectQuery } from 'lib/queries/react-query/ecocredit/getProjectQuery/getProjectQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { getAllRetirementsByOwnerQuery } from 'lib/queries/react-query/registry-server/graphql/indexer/getAllRetirementsByOwner/getAllRetirementsByOwner';
import { useWallet } from 'lib/wallet/wallet';

import { getDefaultAvatar } from 'pages/ProfileEdit/ProfileEdit.utils';
import { getDisplayAdmin } from 'components/organisms/ProjectDetailsSection/ProjectDetailsSection.utils';
import { useProjectsWithMetadata } from 'hooks/projects/useProjectsWithMetadata';
import { useProjectWithMetadata } from 'hooks/projects/useProjectWithMetadata';

import { getDataFromBatchDenomId } from '../MyEcocredits.utils';

const MOCK_ADDRESS = 'regen1eclxh3p4hkt576g002quv9pd3l0kh6wur65yh2';

export const useFetchRetirements = () => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { wallet } = useWallet();
  const { ecocreditClient, dataClient } = useLedger();
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));

  // All retirements
  const { data } = useQuery(
    getAllRetirementsByOwnerQuery({
      client: apolloClient,
      owner: MOCK_ADDRESS ?? '',
      enabled: !!apolloClient && !!wallet?.address,
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

  // #2 retrieve the party for the first issuer of each class
  const creditClassesIssuerResults = useQueries({
    queries:
      classesIssuers?.map(classIssuers =>
        getPartyByAddrQuery({
          client: apolloClient,
          addr: classIssuers?.issuers[0] ?? '',
          enabled: !!apolloClient && !!csrfData,
        }),
      ) ?? [],
  });
  const creditClassesIssuerData = creditClassesIssuerResults.map(
    creditClassIssuer => creditClassIssuer.data,
  );

  // #3 format the party data of the first issuer of each class
  const creditClassesIssuer = creditClassesIssuerData
    .map((issuer, index) => {
      const party = issuer?.walletByAddr?.partyByWalletId;
      return getDisplayAdmin(
        classesIssuers[index]?.issuers[0],
        party,
        getDefaultAvatar(party),
      );
    })
    .filter((party: Party | undefined): party is Party => !!party);

  // Normalize retirements
  const normalizedRetirements = allRetirements?.nodes.map((retirement, index) =>
    normalizeRetirement({
      retirement,
      retirementData: retirementsData?.[index],
      issuer: creditClassesIssuer?.[index],
      project: projects?.[index],
      projectMetadata: projectsMetadata?.[index],
    }),
  );

  return { retirements: normalizedRetirements };
};
