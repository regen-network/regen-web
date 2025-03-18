import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ProjectInfo } from '@regen-network/api/regen/ecocredit/v1/query';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Account } from 'web-components/src/components/user/UserInfo';

import { Maybe, ProjectFieldsFragment } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
} from 'lib/db/types/json-ld';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';

import { getDisplayAccountOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';

import {
  getAccount,
  getAccountInfo,
  getDisplayAccount,
} from '../ProjectDetails.utils';

type Params = {
  projectMetadata?: AnchoredProjectMetadataBaseLD;
  offChainProject?: Maybe<ProjectFieldsFragment>;
  onChainProject?: ProjectInfo;
  creditClassMetadata?: CreditClassMetadataLD;
};

export const useStakeholders = ({
  projectMetadata,
  offChainProject,
  onChainProject,
  creditClassMetadata,
}: Params) => {
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const projectDeveloper = getDisplayAccount(
    projectMetadata?.['regen:projectDeveloper'],
    offChainProject?.accountByDeveloperId,
  );

  const projectVerifier = getDisplayAccount(
    projectMetadata?.['regen:projectVerifier'],
    offChainProject?.accountByVerifierId,
  );

  const projectOwner = getDisplayAccount(
    projectMetadata?.['regen:projectOwner'],
  );

  const projectOperator = getDisplayAccount(
    projectMetadata?.['regen:projectOperator'],
  );

  const projectMonitor = getDisplayAccount(
    projectMetadata?.['regen:projectMonitor'],
  );

  const program = getDisplayAccount(
    creditClassMetadata?.['regen:sourceRegistry'],
    offChainProject?.creditClassByCreditClassId?.accountByRegistryId,
  );

  const offChainAdmin = getAccount(offChainProject?.accountByAdminAccountId);

  const adminAddr = onChainProject?.admin;
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));
  const { data: accountByAddr } = useQuery(
    getAccountByAddrQuery({
      client: graphqlClient,
      addr: adminAddr ?? '',
      enabled: !!adminAddr && !!graphqlClient && !!csrfData,
      languageCode: selectedLanguage,
    }),
  );
  const { account } = getAccountInfo(accountByAddr?.accountByAddr);
  const admin = getDisplayAccountOrAddress(adminAddr, account) || offChainAdmin;

  const partners = offChainProject?.projectPartnersByProjectId?.nodes?.map(
    partner => getAccount(partner?.accountByAccountId),
  ) as Account[];

  return {
    projectDeveloper,
    projectVerifier,
    program,
    admin,
    partners,
    projectOwner,
    projectOperator,
    projectMonitor,
  };
};
