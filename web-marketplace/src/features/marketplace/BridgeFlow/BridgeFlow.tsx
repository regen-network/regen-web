import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CelebrateIcon } from 'web-components/src/components/icons/CelebrateIcon';
import ErrorIcon from 'web-components/src/components/icons/ErrorIcon';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import {
  connectWalletModalAtom,
  switchWalletModalAtom,
} from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  AVAILABLE_LABEL,
  BLOCKCHAIN_RECORD,
  MAX_LABEL,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  SEE_LESS,
  SEE_MORE,
  TX_ERROR_MODAL_TITLE,
  TX_MODAL_TITLE,
  TX_SUCCESSFUL_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { GET_TXS_EVENT_KEY } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.constants';
import { getEventsKey } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.utils';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import { BridgeModal } from 'components/organisms';
import { useMsgClient } from 'hooks';

import { BRIDGE_TITLE } from './BridgeFlow.constants';
import useCreditBridgeSubmit from './hooks/useCreditBridgeSubmit';

type Props = {
  isFlowStarted: boolean;
  resetIsFlowStarted: () => void;
  setBatchToBridge: UseStateSetter<BatchInfoWithBalance | undefined>;
  selectedBatch: BatchInfoWithBalance | undefined;
};

export const BridgeFlow = ({
  selectedBatch,
  isFlowStarted,
  resetIsFlowStarted,
  setBatchToBridge,
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>(
    undefined,
  );
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string | undefined>(
    undefined,
  );
  const [txModalDescription, setTxModalDescription] = useState<string>('');
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const { isConnected } = useWallet();
  const reactQueryClient = useQueryClient();
  const setConnectWalletModalAtom = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const navigate = useNavigate();

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
    setTxModalTitle(_(BRIDGE_TITLE));
    setTxModalDescription('');
  };

  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    reactQueryClient.invalidateQueries({
      queryKey: [
        GET_TXS_EVENT_KEY,
        getEventsKey([
          `${messageActionEquals}'/${MsgBridge.$type}'`,
          `message.sender='${wallet?.address}'`,
        ]),
      ],
    });
  };

  const {
    signAndBroadcast,
    wallet,
    error,
    setError,
    deliverTxResponse,
    setDeliverTxResponse,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalHeader(undefined);
    setTxModalTitle(undefined);
    setTxModalDescription('');
    setBatchToBridge(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
    setIsProcessingModalOpen(false);
  };

  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/profile/bridge/bridged');
  };

  const accountAddress = wallet?.address;
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);

  const creditBridgeSubmit = useCreditBridgeSubmit({
    accountAddress,
    creditBridgeBatch: selectedBatch,
    signAndBroadcast,
    setCreditBridgeOpen: setBatchToBridge,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
    setTxButtonTitle,
    setTxModalDescription,
  });

  useEffect(() => {
    if (selectedBatch && isFlowStarted) {
      if (!accountAddress) {
        setConnectWalletModalAtom(atom => void (atom.open = true));
      } else if (!isConnected) {
        setSwitchWalletModalAtom(atom => {
          atom.open = true;
          atom.onClose = () => resetIsFlowStarted();
        });
      }
    }
  }, [
    selectedBatch,
    isFlowStarted,
    accountAddress,
    setConnectWalletModalAtom,
    setSwitchWalletModalAtom,
    isConnected,
    resetIsFlowStarted,
  ]);

  return (
    <>
      <BridgeModal
        open={!!selectedBatch}
        onSubmit={creditBridgeSubmit}
        onClose={() => setBatchToBridge(undefined)}
        batch={selectedBatch}
        maxLabel={_(MAX_LABEL)}
        availableLabel={_(AVAILABLE_LABEL)}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
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
        description={txModalDescription}
        cardTitle={txModalTitle ?? ''}
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
        open={!!error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader ?? _(TX_ERROR_MODAL_TITLE)}
        cardTitle={txModalTitle ?? ''}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle={_(msg`CLOSE WINDOW`)}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
    </>
  );
};
