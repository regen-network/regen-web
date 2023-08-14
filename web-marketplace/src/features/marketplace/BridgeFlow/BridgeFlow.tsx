import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { MsgBridge } from '@regen-network/api/lib/generated/regen/ecocredit/v1/tx';
import { useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import ErrorIcon from 'web-components/lib/components/icons/ErrorIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { connectWalletModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import { messageActionEquals } from 'lib/ecocredit/constants';
import { GET_TXS_EVENT_KEY } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.constants';
import { getEventsKey } from 'lib/queries/react-query/cosmos/bank/getTxsEventQuery/getTxsEventQuery.utils';

import { Link } from 'components/atoms';
import { BridgeModal } from 'components/organisms';
import { useMsgClient } from 'hooks';

import { BRIDGE_TITLE } from './BridgeFlow.constants';
import useCreditBridgeSubmit from './hooks/useCreditBridgeSubmit';

type Props = {
  isFlowStarted: boolean;
  setBatchToBridge: UseStateSetter<BatchInfoWithBalance | undefined>;
  selectedBatch: BatchInfoWithBalance | undefined;
};

export const BridgeFlow = ({
  selectedBatch,
  isFlowStarted,
  setBatchToBridge,
}: Props): JSX.Element => {
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
  const reactQueryClient = useQueryClient();
  const setConnectWalletModalAtom = useSetAtom(connectWalletModalAtom);
  const navigate = useNavigate();

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
    setTxModalTitle(BRIDGE_TITLE);
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
    navigate('/ecocredits/bridge/bridged');
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
    if (selectedBatch && isFlowStarted && !accountAddress) {
      setConnectWalletModalAtom(atom => void (atom.open = true));
    }
  }, [selectedBatch, isFlowStarted, accountAddress, setConnectWalletModalAtom]);

  return (
    <>
      <BridgeModal
        open={!!selectedBatch}
        onSubmit={creditBridgeSubmit}
        onClose={() => setBatchToBridge(undefined)}
        batch={selectedBatch}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
      />
      <TxSuccessfulModal
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        description={txModalDescription}
        cardTitle={txModalTitle ?? ''}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onTxSuccessButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
      />
      <TxErrorModal
        error={error ?? ''}
        open={!!error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle ?? ''}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle={'CLOSE WINDOW'}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
      />
    </>
  );
};
