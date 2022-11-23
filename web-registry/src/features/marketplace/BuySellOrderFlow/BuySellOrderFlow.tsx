import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';

import { UseStateSetter } from 'types/react/use-state';
import { getHashUrl } from 'lib/block-explorer';

import useBuySellOrderSubmit from 'pages/Marketplace/Storefront/hooks/useBuySellOrderSubmit';
import { useCheckSellOrderAvailabilty } from 'pages/Marketplace/Storefront/hooks/useCheckSellOrderAvailabilty';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { VIEW_ECOCREDITS } from 'pages/Projects/Projects.config';
import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { Link } from 'components/atoms';
import { BuyCreditsModal, BuyCreditsValues } from 'components/organisms';
import { useMsgClient } from 'hooks';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

type Props = {
  isFlowStarted: boolean;
  setIsFlowStarted: UseStateSetter<boolean>;
  projects?: ProjectWithOrderData[] | null | undefined;
};

export const BuySellOrderFlow = ({
  projects,
  isFlowStarted,
  setIsFlowStarted,
}: Props): JSX.Element => {
  /**
   * ui management
   */
  const navigate = useNavigate();

  // persistence for Tx details (orderId and amount)
  const selectedSellOrderIdRef = useRef<number>();
  const submittedQuantityRef = useRef<number>();

  // modals and display
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);

  const closeBuyModal = (): void => {
    setIsBuyModalOpen(false);
    setIsFlowStarted(false);
  };
  const closeProcessingModal = (): void => setIsProcessingModalOpen(false);
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
    setIsFlowStarted(false);
    selectedSellOrderIdRef.current = undefined;
    setSelectedProject(undefined);
  };
  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/ecocredits/portfolio');
  };

  /**
   * ledger msg hook setup
   */
  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };
  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    closeProcessingModal();
    closeBuyModal();
    selectedSellOrderIdRef.current = undefined;
  };
  const handleError = (): void => {
    closeProcessingModal();
    setTxModalTitle('Buy Credits Error');
  };

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    wallet,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const accountAddress = wallet?.address;
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const errorEnum = findErrorByCodeEnum({ errorCode: error });
  const ErrorIcon = errorsMapping[errorEnum].icon;

  /**
   * data processing (business logic)
   */
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOrderData>();

  useEffect(() => {
    if (projects?.length === 1) setSelectedProject(projects[0]);
  }, [projects]);

  const setSelectedProjectById = (projectId: string): void | undefined => {
    if (!projects || projects.length <= 1) return;
    const found = projects.find(project => project.id === projectId);
    if (found) setSelectedProject(found);
  };

  const sellOrderIds = useMemo(
    () =>
      projects &&
      projects
        .map(project => project.sellOrders)
        .flat()
        .map(sellOrder => sellOrder.id),
    [projects],
  );

  const { sellOrdersResponse, refetchSellOrders } = useQuerySellOrders();
  const allSellOrders = sellOrdersResponse?.sellOrders;

  const projectUiSellOrdersInfo = useMemo(
    () =>
      allSellOrders
        ?.map(normalizeToUISellOrderInfo)
        .filter(sellOrder => sellOrderIds?.includes(sellOrder.id)),
    [allSellOrders, sellOrderIds],
  );

  // project data prepared for buy modal (add projectId and filter the seller)
  const _project = useMemo(
    () =>
      selectedProject && {
        id: selectedProject?.id.toString() ?? '',
        sellOrders: projectUiSellOrdersInfo?.filter(
          sellOrder => sellOrder.seller !== accountAddress,
        ),
      },
    [selectedProject, projectUiSellOrdersInfo, accountAddress],
  );

  const _sellOrders = useMemo(
    () =>
      projectUiSellOrdersInfo?.filter(
        sellOrder => sellOrder.seller !== accountAddress,
      ),
    [projectUiSellOrdersInfo, accountAddress],
  );

  /**
   * checker fn !!
   */
  useCheckSellOrderAvailabilty({
    selectedSellOrderIdRef,
    submittedQuantityRef,
    setError,
    sellOrders: projectUiSellOrdersInfo,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
  });

  /**
   * Submit hook setup
   */
  const onSubmitCallback = ({
    creditCount,
    sellOrderId,
  }: BuyCreditsValues): void => {
    selectedSellOrderIdRef.current = Number(sellOrderId);
    submittedQuantityRef.current = creditCount;
  };

  const projectDisplayData = useMemo(() => {
    if (!selectedProject || !selectedProject.id) return;
    const projectId = selectedProject.id;
    return {
      id: projectId,
      name: selectedProject.name ?? projectId,
    };
  }, [selectedProject]);

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    project: projectDisplayData,
    signAndBroadcast,
    setCardItems,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    buttonTitle: VIEW_ECOCREDITS,
    refetchSellOrders,
    onSubmitCallback,
  });

  /**
   * ui update effect
   */
  useEffect(() => {
    if (projects && isFlowStarted && accountAddress) {
      refetchSellOrders();
      setIsBuyModalOpen(true);
    } else if (projects && isFlowStarted && !accountAddress) {
      setDisplayErrorBanner(true);
    }
  }, [projects, isFlowStarted, accountAddress, refetchSellOrders]);

  return (
    <>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={closeBuyModal}
        onSubmit={buySellOrderSubmit}
        project={_project}
        sellOrders={_sellOrders}
        setSelectedProjectById={
          projects && projects?.length > 1 ? setSelectedProjectById : undefined
        }
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={closeProcessingModal}
      />
      <TxSuccessfulModal
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onTxSuccessButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
      />
      <TxErrorModal
        error={error ?? ''}
        open={!!error && (!!txModalTitle || !!deliverTxResponse)}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle={'CLOSE WINDOW'}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
      />
      {displayErrorBanner && (
        <ErrorBanner text="Please connect to Keplr to use Regen Ledger features" />
      )}
    </>
  );
};
