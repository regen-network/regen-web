import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { Party } from 'web-components/lib/components/user/UserInfo';

import { useCreditClassByUriQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { openLink } from 'lib/button';
import { client } from 'lib/clients/sanity';
import { getMetadata } from 'lib/db/api/metadata-graph';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';
import { queryClassIssuers, queryEcoClassInfo } from 'lib/ecocredit/api';
import { onChainClassRegExp } from 'lib/ledger';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getCreditClassByOnChainIdQuery } from 'lib/queries/react-query/registry-server/graphql/getCreditClassByOnChainIdQuery/getCreditClassByOnChainIdQuery';
import { getPartyByAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getPartyByAddrQuery/getPartyByAddrQuery';
import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import useImpact from 'pages/CreditClassDetails/hooks/useImpact';
import { getDisplayPartyOrAddress } from 'components/organisms/ProjectDetailsSection/ProjectDetailsSection.utils';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';
import { AVG_PRICE_TOOLTIP_CREDIT_CLASS } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar.constants';
import {
  getDisplayParty,
  getParty,
} from 'components/templates/ProjectDetails/ProjectDetails.utils';

import { useLedger } from '../../ledger';
import { BOOK_CALL_LINK } from './CreditClassDetails.constants';
import {
  getCreditClassAvgPricePerTonLabel,
  getProjectNameFromProjectsData,
  normalizeProjectImpactCards,
  parseCreditClassVersion,
} from './CreditClassDetails.utils';
import CreditClassDetailsSimple from './CreditClassDetailsSimple';
import CreditClassDetailsWithContent from './CreditClassDetailsWithContent';

interface CreditDetailsProps {
  isLandSteward?: boolean;
}

function CreditClassDetails({
  isLandSteward,
}: CreditDetailsProps): JSX.Element {
  const { wallet } = useWallet();
  const { dataClient } = useLedger();
  const { creditClassId } = useParams();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;

  const [onChainClass, setOnChainClass] = useState<ClassInfo | undefined>(
    undefined,
  );
  const [metadata, setMetadata] = useState<CreditClassMetadataLD | undefined>(
    undefined,
  );
  const [issuers, setIssuers] = useState<string[] | undefined>(undefined);
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);

  const { data: contentData } = useAllCreditClassQuery({ client });
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );
  const { data: csrfData } = useQuery(getCsrfTokenQuery({}));

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

  const { coBenefitsIRIs, primaryImpactIRI } = parseCreditClassVersion(
    dbDataByOnChainId?.creditClassByOnChainId,
  );

  const { data: dbDataByUri } = useCreditClassByUriQuery({
    variables: { uri: iri as string },
    skip: !iri || !!isOnChainClassId,
  });

  const dbCreditClassByOnChainId = dbDataByOnChainId?.creditClassByOnChainId;
  const dbCreditClassByUri = dbDataByUri?.creditClassByUri;

  const { isBuyFlowDisabled, projectsWithOrderData } = useBuySellOrderData({
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

  const avgPricePerTonLabel = getCreditClassAvgPricePerTonLabel({
    projectsWithOrderData,
  });

  const onBookCallButtonClick = () => openLink(BOOK_CALL_LINK, true);
  const impact = useImpact({ coBenefitsIRIs, primaryImpactIRI });
  const impactCards = normalizeProjectImpactCards(impact);

  const { data: adminPartyByAddrData } = useQuery(
    getPartyByAddrQuery({
      client: graphqlClient,
      addr: onChainClass?.admin ?? '',
      enabled: !!onChainClass?.admin && !!graphqlClient && !!csrfData,
    }),
  );
  const creditClassIssuersResults = useQueries({
    queries:
      issuers?.map(issuer =>
        getPartyByAddrQuery({
          client: graphqlClient,
          addr: issuer ?? '',
          enabled: !!graphqlClient && !!csrfData,
        }),
      ) ?? [],
  });

  const creditClassAdminParty = getParty(
    adminPartyByAddrData?.walletByAddr?.partyByWalletId,
  );
  const creditClassProgramParty = getDisplayParty(
    metadata?.['regen:sourceRegistry'],
    dbCreditClassByOnChainId?.partyByRegistryId,
  );

  const creditClassIssuersData = creditClassIssuersResults.map(
    creditClassIssuer => creditClassIssuer.data,
  );
  const creditClassIssuers = creditClassIssuersData
    .map((issuer, index) =>
      getDisplayPartyOrAddress(
        issuers?.[index],
        issuer?.walletByAddr?.partyByWalletId,
      ),
    )
    .filter((party: Party | undefined): party is Party => !!party);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (creditClassId && isOnChainClassId) {
        try {
          const res = await queryEcoClassInfo(creditClassId);
          const classInfo = res?.class;
          if (classInfo) {
            setOnChainClass(classInfo);
            const data = await getMetadata(classInfo.metadata, dataClient);
            setMetadata(data);
          }
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetchData();
  }, [creditClassId, dataClient, isOnChainClassId]);

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
          program={creditClassProgramParty}
          admin={creditClassAdminParty}
          issuers={creditClassIssuers}
          impactCards={impactCards}
        />
      )}
      <SellOrdersActionsBar
        isBuyButtonDisabled={isBuyFlowDisabled && Boolean(wallet?.address)}
        isCommunityCredit={isCommunityCredit}
        onBookCallButtonClick={onBookCallButtonClick}
        onBuyButtonClick={() =>
          isBuyFlowDisabled
            ? setConnectWalletModal(atom => void (atom.open = true))
            : setIsBuyFlowStarted(true)
        }
        onChainCreditClassId={onChainClass?.id}
        creditClassName={metadata?.['schema:name']}
        avgPricePerTonLabel={avgPricePerTonLabel}
        avgPricePerTonTooltip={AVG_PRICE_TOOLTIP_CREDIT_CLASS}
      />
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        isCommunityCredit={isCommunityCredit}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={projectsWithOrderData}
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
