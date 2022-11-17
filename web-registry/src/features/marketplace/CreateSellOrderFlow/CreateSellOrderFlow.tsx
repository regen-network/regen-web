import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import { CreateSellOrderModal } from 'web-components/lib/components/modal/CreateSellOrderModal';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';

import { BatchInfoWithBalance } from 'types/ledger/ecocredit';
import { UseStateSetter } from 'types/react/use-state';
import { getHashUrl } from 'lib/block-explorer';

import useCreateSellOrderSubmit from 'pages/Dashboard/MyEcocredits/hooks/useCreateSellOrderSubmit';
import { CREATE_SELL_ORDER_TITLE } from 'pages/Dashboard/MyEcocredits/MyEcocredits.contants';
import {
  getAvailableAmountByBatch,
  getDenomAllowedOptions,
} from 'pages/Dashboard/MyEcocredits/MyEcocredits.utils';
import { Link } from 'components/atoms';
import { useMsgClient } from 'hooks';
import useMarketplaceQuery from 'hooks/useMarketplaceQuery';

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
  const [isCreateSellOrderOpen, setIsCreateSellOrderOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>();
  const [txModalHeader, setTxModalHeader] = useState<string>();
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
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
    navigate('/ecocredits/portfolio');
  };

  const onTxBroadcast = (): void => setIsCreateSellOrderOpen(false);

  useEffect(() => {
    if (isFlowStarted) {
      setIsCreateSellOrderOpen(true);
    }
  }, [isFlowStarted]);

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

  const allowedDenomsResponse = useMarketplaceQuery<QueryAllowedDenomsResponse>(
    {
      query: 'allowedDenoms',
      params: {},
    },
  );
  const allowedDenomOptions = getDenomAllowedOptions({
    allowedDenoms: allowedDenomsResponse?.data?.allowedDenoms,
  });

  return (
    <>
      <CreateSellOrderModal
        batchDenoms={sellableBatchDenomsOption}
        sellDenom={'REGEN'}
        availableAmountByBatch={getAvailableAmountByBatch({ credits })}
        open={isCreateSellOrderOpen}
        onClose={closeCreateModal}
        onSubmit={createSellOrderSubmit}
        title={CREATE_SELL_ORDER_TITLE}
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
