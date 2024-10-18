import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box } from '@mui/material';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { getSocialItems } from 'utils/components/ShareSection/getSocialItems';
import { REGEN_APP_PROJECT_URL } from 'utils/components/ShareSection/getSocialItems.constants';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import { CelebrateIcon } from 'web-components/src/components/icons/CelebrateIcon';
import { ConfirmModal as CancelConfirmModal } from 'web-components/src/components/modal/ConfirmModal';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';
import Section from 'web-components/src/components/section';
import { Title } from 'web-components/src/components/typography';

import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  CLOSE_BUTTON_TEXT,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  SEE_LESS,
  SEE_MORE,
  SHARE_TITLE,
  TX_ERROR_MODAL_TITLE,
  TX_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import SellOrdersTable from 'components/organisms/SellOrdersTable/SellOrdersTable';
import useMsgClient from 'hooks/useMsgClient';

import useCancelSellOrderSubmit from './hooks/useCancelSellOrderSubmit';
import { useCheckSellOrderAvailabilty } from './hooks/useCheckSellOrderAvailabilty';
import { useNormalizedSellOrders } from './hooks/useNormalizedSellOrders';
import {
  BUY_SELL_ORDER_TITLE,
  CANCEL_SELL_ORDER_ACTION,
  STOREFRONT_TWITTER_TEXT,
} from './Storefront.constants';
import { SellOrderActions } from './Storefront.types';
import { getCancelCardItems } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const { _ } = useLingui();
  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [selectedAction, setSelectedAction] = useState<SellOrderActions>();
  const selectedSellOrderIdRef = useRef<number>();
  const lastProjectIdRef = useRef('');
  const submittedQuantityRef = useRef<number>();
  const navigate = useNavigate();
  const isCancelModalOpen =
    selectedSellOrder !== null && selectedAction === 'cancel';

  // Fetching + sorting + normalizing

  const {
    normalizedSellOrders,
    uiSellOrdersInfo,
    isLoadingSellOrders,
    refetchSellOrders,
    setPaginationParams,
    sortCallbacks,
  } = useNormalizedSellOrders();

  // Callbacks

  const handleTxQueued = (): void => setIsProcessingModalOpen(true);
  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    selectedSellOrderIdRef.current = undefined;
    refetchSellOrders();
  };
  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
    setSelectedAction(undefined);
    selectedSellOrderIdRef.current = undefined;
  };

  const handleCancelModalClose = (): void => {
    setSelectedSellOrder(null);
  };

  const onButtonClick = (): void => {
    if (txModalTitle === _(BUY_SELL_ORDER_TITLE)) {
      navigate('/profile/portfolio');
    } else {
      handleTxModalClose();
    }
  };

  const { isConnected, wallet } = useWallet();
  const {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);
  const accountAddress = wallet?.address;
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const errorEnum = findErrorByCodeEnum({ errorCode: error });
  const ErrorIcon = errorsMapping[errorEnum].icon;

  const shareUrl = REGEN_APP_PROJECT_URL + (lastProjectIdRef.current ?? '');

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

  useCheckSellOrderAvailabilty({
    selectedSellOrderIdRef,
    submittedQuantityRef,
    setError,
    sellOrders: uiSellOrdersInfo,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
  });

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section>
        <Title variant="h2" sx={{ mb: 8.5 }}>
          <Trans>Sell orders</Trans>
        </Title>
        <Box sx={{ paddingBottom: '150px' }}>
          <WithLoader
            isLoading={isLoadingSellOrders}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <SellOrdersTable
              sellOrders={normalizedSellOrders}
              sortCallbacks={sortCallbacks}
              onTableChange={setPaginationParams}
              renderActionButtonsFunc={
                isConnected
                  ? (i: number) => {
                      const isOwnSellOrder =
                        normalizedSellOrders[i]?.seller === accountAddress;
                      return (
                        isOwnSellOrder && (
                          <TableActionButtons
                            buttons={[
                              {
                                label: _(CANCEL_SELL_ORDER_ACTION),
                                onClick: () => {
                                  setSelectedAction('cancel');
                                  setSelectedSellOrder(i);
                                },
                              },
                            ]}
                            sx={{ width: '100%' }}
                          />
                        )
                      );
                    }
                  : undefined
              }
            />
          </WithLoader>
        </Box>
      </Section>
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
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle ?? _(TX_MODAL_TITLE)}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onButtonClick}
        icon={
          selectedAction === 'buy' ? (
            <CelebrateIcon sx={{ width: '85px', height: '106px' }} />
          ) : undefined
        }
        socialItems={getSocialItems({
          twitter: { text: _(STOREFRONT_TWITTER_TEXT), url: shareUrl },
          linkedIn: { url: shareUrl },
        })}
        shareTitle={_(SHARE_TITLE)}
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
        cardTitle={txModalTitle}
        buttonTitle={_(CLOSE_BUTTON_TEXT)}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
        linkComponent={Link}
        onButtonClick={onButtonClick}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
      <CancelConfirmModal
        open={isCancelModalOpen}
        onClose={handleCancelModalClose}
        linkComponent={Link}
        onConfirm={cancelSellOrderSubmit}
        onConfirmTitle={_(msg`Yes, cancel sell order`)}
        onCancelTitle={_(msg`WHOOPS, EXIT`)}
        title={_(msg`Are you sure you want to cancel this sell order?`)}
        cardItems={getCancelCardItems({
          sellOrder: normalizedSellOrders[selectedSellOrder ?? 0] ?? {},
          _,
        })}
      />
    </Box>
  );
};
