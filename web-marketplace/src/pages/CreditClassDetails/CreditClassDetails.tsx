import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';

import { Account } from 'web-components/src/components/user/UserInfo';

import { useCreditClassByUriQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { getLinkHref, openLink } from 'lib/button';
import { client } from 'lib/clients/sanity';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { queryClassIssuers } from 'lib/ecocredit/api';
import { onChainClassRegExp } from 'lib/ledger';
import { getClassQuery } from 'lib/queries/react-query/ecocredit/getClassQuery/getClassQuery';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAccountByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getAllCreditClassPageQuery } from 'lib/queries/react-query/sanity/getAllCreditClassPageQuery/getAllCreditClassPageQuery';

import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import useImpact from 'pages/CreditClassDetails/hooks/useImpact';
import { getDisplayAccountOrAddress } from 'components/organisms/DetailsSection/DetailsSection.utils';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { getDisplayAccount } from 'components/templates/ProjectDetails/ProjectDetails.utils';
import { useBuySellOrderData } from 'hooks/useBuySellOrderData';

import { useLedger } from '../../ledger';
import {
  getProjectNameFromProjectsData,
  parseCreditClassVersion,
} from './CreditClassDetails.utils';
import CreditClassDetailsSimple from './CreditClassDetailsSimple';
import { CreditClassDetailsWithContent } from './CreditClassDetailsWithContent/CreditClassDetailsWithContent';

interface CreditDetailsProps {
  isLandSteward?: boolean;
}

function CreditClassDetails({
  isLandSteward,
}: CreditDetailsProps): JSX.Element {
  const { dataClient, ecocreditClient } = useLedger();
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { creditClassId } = useParams();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [issuers, setIssuers] = useState<string[] | undefined>(undefined);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);

  const { data: sanityCreditClassPageData } = useQuery(
    getAllCreditClassPageQuery({
      sanityClient: client,
      enabled: !!client,
      languageCode: selectedLanguage,
    }),
  );
  const scheduleCallLink = getLinkHref(
    sanityCreditClassPageData?.allCreditClassPage?.[0]?.bookCallLink,
  );

  const { data: contentData } = useAllCreditClassQuery({ client });
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));

  const { data: creditClassOnChain } = useQuery(
    getClassQuery({
      client: ecocreditClient,
      request: {
        classId: creditClassId ?? '',
      },
      enabled: !!ecocreditClient && !!creditClassId,
    }),
  );
  const onChainClass = creditClassOnChain?.class;

  const creditClassMetadataRes = useQuery(
    getMetadataQuery({
      iri: onChainClass?.metadata,
      enabled: !!dataClient && !!onChainClass?.metadata,
      dataClient,
      languageCode: selectedLanguage,
    }),
  );
  const metadata = creditClassMetadataRes?.data as
    | CreditClassMetadataLD
    | undefined;

  const isCommunityCredit = !content;

  const isOnChainClassId =
    creditClassId && onChainClassRegExp.test(creditClassId);

  const iri = content?.iri?.current;

  const { data: dbDataByOnChainIdData } = useQuery(
    getCreditClassByOnChainIdQuery({
      client: graphqlClient,
      onChainId: creditClassId as string,
      enabled: !!isOnChainClassId && !!graphqlClient && !!csrfData,
    }),
  );

  const dbDataByOnChainId = dbDataByOnChainIdData?.data;

  const { offChainCoBenefitsIRIs, offChainPrimaryImpactIRI } =
    parseCreditClassVersion(dbDataByOnChainId?.creditClassByOnChainId);

  const { data: dbDataByUri } = useCreditClassByUriQuery({
    variables: { uri: iri as string },
    skip: !iri || !!isOnChainClassId,
  });

  const dbCreditClassByOnChainId = dbDataByOnChainId?.creditClassByOnChainId;
  const dbCreditClassByUri = dbDataByUri?.creditClassByUri;

  const { projectsWithOrderData } = useBuySellOrderData({
    classId: creditClassId,
  });

  const { credits } = useCreateSellOrderData({
    projectId: projectsWithOrderData[0]?.id,
  });

  const creditsWithProjectName = useMemo(() => {
    if (!credits || credits.length === 0) return;
    return credits.map(batch => ({
      ...batch,
      projectName:
        getProjectNameFromProjectsData(
          batch.projectId,
          projectsWithOrderData,
        ) ?? undefined,
    }));
  }, [credits, projectsWithOrderData]);

  const onBookCallButtonClick = () => openLink(scheduleCallLink, true);
  const impact = useImpact({
    offChainCoBenefitsIRIs,
    offChainPrimaryImpactIRI,
    creditClassMetadata: metadata,
  });

  const { data: adminAccountByAddrData } = useQuery(
    getAccountByAddrQuery({
      client: graphqlClient,
      addr: onChainClass?.admin ?? '',
      enabled: !!onChainClass?.admin && !!graphqlClient && !!csrfData,
      languageCode: selectedLanguage,
    }),
  );
  const creditClassIssuersResults = useQueries({
    queries:
      issuers?.map(issuer =>
        getAccountByAddrQuery({
          client: graphqlClient,
          addr: issuer ?? '',
          enabled: !!graphqlClient && !!csrfData,
          languageCode: selectedLanguage,
        }),
      ) ?? [],
  });

  const creditClassAdminAccount = getDisplayAccountOrAddress(
    onChainClass?.admin,
    adminAccountByAddrData?.accountByAddr,
  );
  const creditClassProgramAccount = getDisplayAccount(
    metadata?.['regen:sourceRegistry'],
    dbCreditClassByOnChainId?.accountByRegistryId,
  );

  const creditClassIssuersData = creditClassIssuersResults.map(
    creditClassIssuer => creditClassIssuer.data,
  );
  const creditClassIssuers = creditClassIssuersData
    .map((issuer, index) =>
      getDisplayAccountOrAddress(issuers?.[index], issuer?.accountByAddr),
    )
    .filter((party: Account | undefined): party is Account => !!party);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (creditClassId && isOnChainClassId) {
        try {
          const { issuers } = await queryClassIssuers(creditClassId);
          if (issuers) setIssuers(issuers);
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetch();
  }, [creditClassId, isOnChainClassId]);

  return (
    <>
      {content && dbCreditClassByUri && (
        <CreditClassDetailsWithContent
          dbClass={dbCreditClassByUri}
          content={content}
          isLandSteward={isLandSteward}
        />
      )}
      {onChainClass && (
        <CreditClassDetailsSimple
          dbClass={dbCreditClassByOnChainId}
          content={content}
          onChainClass={onChainClass}
          metadata={metadata}
          program={creditClassProgramAccount}
          admin={creditClassAdminAccount}
          issuers={creditClassIssuers}
          impactCards={impact}
        />
      )}
      <SellOrdersActionsBar
        isCommunityCredit={isCommunityCredit}
        onBookCallButtonClick={onBookCallButtonClick}
      />
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={creditsWithProjectName}
      />

      {/* // TODO Display not found or error status
      // based on https://github.com/regen-network/regen-registry/issues/886*/}
    </>
  );
}

export { CreditClassDetails };
