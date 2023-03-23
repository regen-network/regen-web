import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

import {
  useCreditClassByOnChainIdQuery,
  useCreditClassByUriQuery,
} from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { useLedger } from 'ledger';
import { client } from 'lib/clients/sanity';
import { getMetadata } from 'lib/db/api/metadata-graph';
import { queryClassIssuers, queryEcoClassInfo } from 'lib/ecocredit/api';
import { onChainClassRegExp } from 'lib/ledger';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
import { useResetErrorBanner } from 'pages/Marketplace/Storefront/hooks/useResetErrorBanner';
import { SellOrdersActionsBar } from 'components/organisms/SellOrdersActionsBar/SellOrdersActionsBar';

import { getProjectNameFromProjectsData } from './CreditClassDetails.utils';
import CreditClassDetailsSimple from './CreditClassDetailsSimple';
import CreditClassDetailsWithContent from './CreditClassDetailsWithContent';

interface CreditDetailsProps {
  isLandSteward?: boolean;
}

function CreditClassDetails({
  isLandSteward,
}: CreditDetailsProps): JSX.Element {
  const { wallet } = useLedger();
  const { creditClassId } = useParams();
  const [onChainClass, setOnChainClass] = useState<ClassInfo | undefined>(
    undefined,
  );
  const [metadata, setMetadata] = useState<any>(undefined);
  const [issuers, setIssuers] = useState<string[] | undefined>(undefined);

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);
  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

  const { data: contentData } = useAllCreditClassQuery({ client });
  const content = contentData?.allCreditClass?.find(
    creditClass => creditClass.path === creditClassId,
  );

  const isOnChainClassId =
    creditClassId && onChainClassRegExp.test(creditClassId);
  const iri = content?.iri?.current;
  const { data: dbDataByOnChainId } = useCreditClassByOnChainIdQuery({
    variables: { onChainId: creditClassId as string },
    skip: !isOnChainClassId,
  });
  const { data: dbDataByUri } = useCreditClassByUriQuery({
    variables: { uri: iri as string },
    skip: !iri || !!isOnChainClassId,
  });

  const dbCreditClassByOnChainId = dbDataByOnChainId?.creditClassByOnChainId;
  const dbCreditClassByUri = dbDataByUri?.creditClassByUri;

  const { isBuyFlowDisabled, projectsWithOrderData } = useBuySellOrderData({
    classId: creditClassId,
  });

  const { isSellFlowDisabled, credits } = useCreateSellOrderData({
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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (creditClassId && isOnChainClassId) {
        try {
          const res = await queryEcoClassInfo(creditClassId);
          const classInfo = res?.class;
          if (classInfo) {
            setOnChainClass(classInfo);
            const data = await getMetadata(classInfo.metadata, {
              regen: 'https://schema.regen.network',
            });
            setMetadata(data);
          }
        } catch (err) {
          // eslint-disable-next-line
          console.error(err);
        }
      }
    };
    fetchData();
  }, [creditClassId, isOnChainClassId]);

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
          onChainClass={onChainClass}
          metadata={metadata}
          issuers={issuers}
        />
      )}
      <SellOrdersActionsBar
        isSellButtonDisabled={isSellFlowDisabled}
        isBuyButtonDisabled={isBuyFlowDisabled}
        onSellButtonClick={
          wallet?.address
            ? () => setIsSellFlowStarted(true)
            : () => setDisplayErrorBanner(true)
        }
        onBuyButtonClick={
          wallet?.address
            ? () => setIsBuyFlowStarted(true)
            : () => setDisplayErrorBanner(true)
        }
        onChainCreditClassId={onChainClass?.id}
        creditClassName={metadata?.['schema:name']}
      />
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={projectsWithOrderData}
      />
      <CreateSellOrderFlow
        isFlowStarted={isSellFlowStarted}
        setIsFlowStarted={setIsSellFlowStarted}
        credits={creditsWithProjectName}
      />
      {displayErrorBanner && (
        <ErrorBanner
          text="Please install Keplr extension to use Regen Ledger features"
          onClose={() => setDisplayErrorBanner(false)}
        />
      )}

      {/* // TODO Display not found or error status
      // based on https://github.com/regen-network/regen-registry/issues/886*/}
    </>
  );
}

export { CreditClassDetails };
