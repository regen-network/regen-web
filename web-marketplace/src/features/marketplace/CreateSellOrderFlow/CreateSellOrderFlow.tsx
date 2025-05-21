import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CelebrateIcon } from 'web-components/src/components/icons/CelebrateIcon';
import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { useLedger } from 'ledger';
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  SEE_LESS,
  SEE_MORE,
  TX_ERROR_MODAL_TITLE,
  TX_MODAL_TITLE,
  TX_SUCCESSFUL_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { getAllowedDenomQuery } from 'lib/queries/react-query/ecocredit/marketplace/getAllowedDenomQuery/getAllowedDenomQuery';
import { useWallet } from 'lib/wallet/wallet';

import useCreateSellOrderSubmit from 'pages/Dashboard/MyEcocredits/hooks/useCreateSellOrderSubmit';
import { CREATE_SELL_ORDER_TITLE } from 'pages/Dashboard/MyEcocredits/MyEcocredits.constants';
import {
  getAvailableAmountByBatch,
  getDenomAllowedOptions,
} from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import { Link } from 'components/atoms';
import { CreateSellOrderModal } from 'components/organisms/CreateSellOrderModal/CreateSellOrderModal';
import { useMsgClient } from 'hooks';

type Props = {
  isFlowStarted: boolean;
  setIsFlowStarted: UseStateSetter<boolean>;
  credits?: BatchInfoWithBalance[];
  placeholderText?: string;
};

/**
 * This component handles the flow of creating a sell order,
 * - Modal display for order creation
 * - Wallet connection verification
 * - Transaction submission
 * - Success/failure states and user feedback
 *
 * The flow is triggered externally by setting isFlowStarted to true.
 */
export const CreateSellOrderFlow = ({
  isFlowStarted,
  setIsFlowStarted,
  credits = [],
  placeholderText,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  // Modal visibility states
  const [isCreateSellOrderOpen, setIsCreateSellOrderOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);

  // Transaction result display states
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>();
  const [txModalHeader, setTxModalHeader] = useState<string>();
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);

  // Global state access for wallet connection modals
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);

  // Services access
  const { queryClient } = useLedger();
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  const closeCreateModal = (): void => {
    setIsCreateSellOrderOpen(false);
    setIsFlowStarted(false);
  };
  const closeProcessingModal = (): void => setIsProcessingModalOpen(false);

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  // Clean up all transaction state when modal is closed
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
    setTxModalTitle(_(msg`Buy Credits Error`));
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    closeProcessingModal();
    closeCreateModal();
  };

  // Navigate to portfolio after successful transaction
  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/dashboard/portfolio');
  };

  const onTxBroadcast = (): void => setIsCreateSellOrderOpen(false);

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

  const sellableBatchDenomsOption: Option[] = credits.map(credit => ({
    label: credit.denom,
    value: credit.denom,
  }));

  const createSellOrderSubmit = useCreateSellOrderSubmit({
    accountAddress,
    credits,
    signAndBroadcast,
    setCardItems,
    setTxModalHeader,
    setTxButtonTitle,
    onTxBroadcast,
  });

  const { data: allowedDenomsData } = useQuery(
    getAllowedDenomQuery({
      client: queryClient,
      enabled: !!queryClient,
    }),
  );

  const allowedDenomOptions = getDenomAllowedOptions({
    allowedDenoms: allowedDenomsData?.allowedDenoms,
    _,
  });

  // Wallet connection and create sell order flow initialization effect
  useEffect(() => {
    if (isFlowStarted && accountAddress) {
      if (isConnected) {
        setIsCreateSellOrderOpen(true);
      } else {
        setSwitchWalletModalAtom(atom => {
          atom.open = true;
          atom.onClose = () => setIsFlowStarted(false);
        });
      }
    } else if (isFlowStarted) {
      setConnectWalletModal(atom => {
        atom.open = true;
      });
    }
  }, [
    isFlowStarted,
    accountAddress,
    setConnectWalletModal,
    setIsFlowStarted,
    setSwitchWalletModalAtom,
    isConnected,
  ]);

  return (
    <>
      <CreateSellOrderModal
        batchDenoms={sellableBatchDenomsOption}
        sellDenom={'REGEN'}
        availableAmountByBatch={getAvailableAmountByBatch({ credits })}
        open={isCreateSellOrderOpen}
        onClose={closeCreateModal}
        onSubmit={createSellOrderSubmit}
        title={_(CREATE_SELL_ORDER_TITLE)}
        allowedDenoms={allowedDenomOptions}
        placeholderText={placeholderText}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={closeProcessingModal}
        title={_(PROCESSING_MODAL_TITLE)}
        bodyText={_(PROCESSING_MODAL_BODY)}
      />
      <TxSuccessfulModal
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader ?? _(TX_SUCCESSFUL_MODAL_TITLE)}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle ?? _(TX_MODAL_TITLE)}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onTxSuccessButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
      <TxErrorModal
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        error={error ?? ''}
        open={!!error && (!!txModalTitle || !!deliverTxResponse)}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        cardTitle={txModalTitle}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle={_(msg`close`)}
        title={_(TX_ERROR_MODAL_TITLE)}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
    </>
  );
};
