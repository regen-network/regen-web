import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { useSetAtom } from 'jotai';

import {
  useCreditClassByOnChainIdQuery,
  useCreditClassByUriQuery,
} from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { client } from 'lib/clients/sanity';
import { getMetadata } from 'lib/db/api/metadata-graph';
import { queryClassIssuers, queryEcoClassInfo } from 'lib/ecocredit/api';
import { onChainClassRegExp } from 'lib/ledger';
import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { CreateSellOrderFlow } from 'features/marketplace/CreateSellOrderFlow/CreateSellOrderFlow';
import { useCreateSellOrderData } from 'features/marketplace/CreateSellOrderFlow/hooks/useCreateSellOrderData';
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
  const { wallet } = useWallet();
  const { creditClassId } = useParams();
  const [onChainClass, setOnChainClass] = useState<ClassInfo | undefined>(
    undefined,
  );
  const [metadata, setMetadata] = useState<any>(undefined);
  const [issuers, setIssuers] = useState<string[] | undefined>(undefined);

  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [isSellFlowStarted, setIsSellFlowStarted] = useState(false);
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);

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
            const data = await getMetadata(classInfo.metadata);
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
        isSellButtonDisabled={isSellFlowDisabled && Boolean(wallet?.address)}
        isBuyButtonDisabled={isBuyFlowDisabled && Boolean(wallet?.address)}
        onSellButtonClick={() =>
          isSellFlowDisabled
            ? setConnectWalletModal(atom => void (atom.open = true))
            : setIsSellFlowStarted(true)
        }
        onBuyButtonClick={() =>
          isBuyFlowDisabled
            ? setConnectWalletModal(atom => void (atom.open = true))
            : setIsBuyFlowStarted(true)
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

      {/* // TODO Display not found or error status
      // based on https://github.com/regen-network/regen-registry/issues/886*/}
    </>
  );
}

export { CreditClassDetails };
