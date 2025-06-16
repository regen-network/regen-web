import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Item } from 'web-components/src/components/modal/TxModal';

import { useWallet } from 'lib/wallet/wallet';

import useCancelSellOrderSubmit from 'pages/Marketplace/Storefront/hooks/useCancelSellOrderSubmit';
import { NormalizedSellOrder } from 'pages/Marketplace/Storefront/Storefront.types';
import { getCancelCardItems } from 'pages/Marketplace/Storefront/Storefront.utils';
import useMsgClient from 'hooks/useMsgClient';

type UseCancelSellOrderProps = {
  normalizedSellOrders: NormalizedSellOrder[];
  refetchSellOrders: () => void;
};

/**
 * A custom React hook that manages the workflow for cancelling sell orders in the marketplace,
 * including modal state management and transaction processing.
 *
 * @param normalizedSellOrders - An array of normalized sell orders available for cancellation.
 * @param refetchSellOrders - A function to refresh the sell orders after a successful cancellation.
 *
 * See {@link UseCancelSellOrderProps} for more details.
 *
 * @returns An object containing:
 * - openCancelModal: Function to open the cancellation modal for a specific sell order.
 * - getCancelModalProps: Function that returns props for the cancellation confirmation modal.
 * - getProcessingModalProps: Function that returns props for the transaction processing modal.
 * - getSuccessModalProps: Function that returns props for the transaction success modal.
 * - getErrorModalProps: Function that returns props for the transaction error modal.
 * - deliverTxResponse: Response data from the blockchain transaction.
 * - error: Any error that occurred during the transaction process.
 */

export const useCancelSellOrder = ({
  normalizedSellOrders,
  refetchSellOrders,
}: UseCancelSellOrderProps) => {
  const { _ } = useLingui();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');

  const { wallet } = useWallet();
  const accountAddress = wallet?.address;

  const handleTxQueued = (): void => setIsProcessingModalOpen(true);
  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    refetchSellOrders();
  };
  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const handleCancelModalClose = (): void => {
    setSelectedSellOrder(null);
    setIsCancelModalOpen(false);
  };

  const cancelSellOrderSubmit = useCancelSellOrderSubmit({
    selectedSellOrder: normalizedSellOrders[selectedSellOrder ?? 0],
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    setIsProcessingModalOpen,
    signAndBroadcast,
    accountAddress,
  });

  const openCancelModal = (sellOrderIndex: number) => {
    setIsCancelModalOpen(true);
    setSelectedSellOrder(sellOrderIndex);
  };

  const getCancelModalProps = () => ({
    open: isCancelModalOpen,
    onClose: handleCancelModalClose,
    onConfirm: () => {
      cancelSellOrderSubmit();
      setIsCancelModalOpen(false);
    },
    onConfirmTitle: _(msg`Yes, cancel sell order`),
    onCancelTitle: _(msg`WHOOPS, EXIT`),
    title: _(msg`Are you sure you want to cancel this sell order?`),
    cardItems: getCancelCardItems({
      sellOrder: normalizedSellOrders[selectedSellOrder ?? 0] ?? {},
      _,
    }),
  });

  const getProcessingModalProps = () => ({
    open: isProcessingModalOpen,
    onClose: () => setIsProcessingModalOpen(false),
  });

  const getSuccessModalProps = () => ({
    onClose: handleTxModalClose,
    txHash: deliverTxResponse?.transactionHash ?? '',
    cardItems,
    txModalHeader,
    txModalTitle,
    txButtonTitle,
  });

  const getErrorModalProps = () => ({
    onClose: handleTxModalClose,
    error,
    txHash: deliverTxResponse?.transactionHash ?? '',
    cardItems,
    txModalHeader,
    txModalTitle,
  });

  return {
    openCancelModal,
    getCancelModalProps,
    getProcessingModalProps,
    getSuccessModalProps,
    getErrorModalProps,
    deliverTxResponse,
    error,
  };
};
