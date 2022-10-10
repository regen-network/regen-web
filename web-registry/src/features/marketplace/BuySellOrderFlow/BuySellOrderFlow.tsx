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
  selectedProject: ProjectWithOrderData | null;
};

export const BuySellOrderFlow = ({
  selectedProject,
  isFlowStarted,
  setIsFlowStarted,
}: Props): JSX.Element => {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);
  const { sellOrdersResponse, refetchSellOrders } = useQuerySellOrders();
  const projectSellOrderIds = useMemo(
    () => selectedProject?.sellOrders.map(sellOrder => sellOrder.id),
    [selectedProject],
  );
  const sellOrders = sellOrdersResponse?.sellOrders;
  const projectUiSellOrdersInfo = useMemo(
    () =>
      sellOrders
        ?.map(normalizeToUISellOrderInfo)
        .filter(sellOrder => projectSellOrderIds?.includes(sellOrder.id)),
    [sellOrders, projectSellOrderIds],
  );
  const selectedSellOrderIdRef = useRef<number>();
  const submittedQuantityRef = useRef<number>();
  const navigate = useNavigate();

  const closeBuyModal = (): void => {
    setIsBuyModalOpen(false);
    setIsFlowStarted(false);
  };
  const closeProcessingModal = (): void => setIsProcessingModalOpen(false);

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
    setIsFlowStarted(false);
  };
  const handleError = (): void => {
    closeProcessingModal();
    setTxModalTitle('Buy Credits Error');
  };
  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    closeProcessingModal();
    closeBuyModal();
  };
  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/ecocredits/dashboard');
  };
  const onSubmitCallback = ({
    creditCount,
    sellOrderId,
  }: BuyCreditsValues): void => {
    selectedSellOrderIdRef.current = Number(sellOrderId);
    submittedQuantityRef.current = creditCount;
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

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    signAndBroadcast,
    setCardItems,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    buttonTitle: VIEW_ECOCREDITS,
    refetchSellOrders,
    onSubmitCallback,
  });

  const project = useMemo(
    () => ({
      id: selectedProject?.id.toString() ?? '',
      sellOrders: projectUiSellOrdersInfo?.filter(
        sellOrder => sellOrder.seller !== accountAddress,
      ),
    }),
    [selectedProject, projectUiSellOrdersInfo, accountAddress],
  );

  useEffect(() => {
    if (isFlowStarted && selectedProject && accountAddress) {
      refetchSellOrders();
      setIsBuyModalOpen(true);
    } else if (selectedProject && isFlowStarted && !accountAddress) {
      setDisplayErrorBanner(true);
    }
  }, [selectedProject, isFlowStarted, accountAddress, refetchSellOrders]);

  useCheckSellOrderAvailabilty({
    selectedSellOrderIdRef,
    submittedQuantityRef,
    setError,
    sellOrders: projectUiSellOrdersInfo,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
  });

  return (
    <>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={closeBuyModal}
        onSubmit={buySellOrderSubmit}
        project={project}
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
