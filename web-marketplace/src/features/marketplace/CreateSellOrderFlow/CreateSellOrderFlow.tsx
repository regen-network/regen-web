import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
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
};

export const CreateSellOrderFlow = ({
  isFlowStarted,
  setIsFlowStarted,
  credits = [],
}: Props): JSX.Element => {
  const { _ } = useLingui();
  const [isCreateSellOrderOpen, setIsCreateSellOrderOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>();
  const [txModalHeader, setTxModalHeader] = useState<string>();
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const setConnectWalletModal = useSetAtom(connectWalletModalAtom);
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const { marketplaceClient } = useLedger();
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
    closeCreateModal();
  };
  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/profile/portfolio');
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
      client: marketplaceClient,
      enabled: !!marketplaceClient,
    }),
  );

  const allowedDenomOptions = getDenomAllowedOptions({
    allowedDenoms: allowedDenomsData?.allowedDenoms,
    _,
  });

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
        cardTitle={txModalTitle}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle="close"
      />
    </>
  );
};
