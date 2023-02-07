import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { ERROR_BANNER } from 'config/contents';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { getSocialItems } from 'utils/components/ShareSection/getSocialItems';
import { REGEN_APP_PROJECT_URL } from 'utils/components/ShareSection/getSocialItems.constants';
import { Buy1Event } from 'web-registry/src/lib/tracker/types';
import { useTracker } from 'web-registry/src/lib/tracker/useTracker';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ConfirmModal as CancelConfirmModal } from 'web-components/lib/components/modal/ConfirmModal';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';

import { getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { BuyCreditsModal, BuyCreditsValues } from 'components/organisms';
import SellOrdersTable from 'components/organisms/SellOrdersTable/SellOrdersTable';
import useMsgClient from 'hooks/useMsgClient';

import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import useCancelSellOrderSubmit from './hooks/useCancelSellOrderSubmit';
import { useCheckSellOrderAvailabilty } from './hooks/useCheckSellOrderAvailabilty';
import { useNormalizedSellOrders } from './hooks/useNormalizedSellOrders';
import { useResetErrorBanner } from './hooks/useResetErrorBanner';
import {
  BUY_SELL_ORDER_ACTION,
  BUY_SELL_ORDER_BUTTON,
  BUY_SELL_ORDER_TITLE,
  CANCEL_SELL_ORDER_ACTION,
  STOREFRONT_TWITTER_TEXT,
} from './Storefront.constants';
import { SellOrderActions } from './Storefront.types';
import { getCancelCardItems } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const theme = useTheme();
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [displayErrorBanner, setDisplayErrorBanner] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SellOrderActions>();
  const selectedSellOrderIdRef = useRef<number>();
  const lastProjectIdRef = useRef('');
  const submittedQuantityRef = useRef<number>();
  const isBuyModalOpen = selectedSellOrder !== null && selectedAction === 'buy';
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useTracker();
  const isCancelModalOpen =
    selectedSellOrder !== null && selectedAction === 'cancel';
  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

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
    if (txModalTitle === BUY_SELL_ORDER_TITLE) {
      navigate('/ecocredits/portfolio');
    } else {
      handleTxModalClose();
    }
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

  const projectData = useMemo(() => {
    const sellOrder = normalizedSellOrders?.find(
      sellOrder => Number(sellOrder.id) === selectedSellOrderIdRef.current,
    );
    const projectId = sellOrder?.project?.id;
    if (!projectId) return;
    lastProjectIdRef.current = projectId;
    return {
      id: projectId,
      name: sellOrder?.project?.name ?? projectId,
    };
  }, [normalizedSellOrders]);

  const shareUrl = REGEN_APP_PROJECT_URL + (lastProjectIdRef.current ?? '');

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    project: projectData,
    signAndBroadcast,
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    buttonTitle: BUY_SELL_ORDER_BUTTON,
    refetchSellOrders,
    onSubmitCallback,
  });

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

  const {
    askAmount,
    askBaseDenom,
    askDenom,
    batchDenom,
    id: orderId,
    project,
    seller,
    amountAvailable,
    disableAutoRetire,
  } = normalizedSellOrders[selectedSellOrder ?? 0] ?? {};

  const initialValues = useMemo(
    () => ({
      creditCount: 1,
      retirementNote: '',
      stateProvince: '',
      country: 'US',
      postalCode: '',
      retirementAction: 'autoretire',
      price: Number(askAmount),
      askDenom,
      batchDenom: batchDenom,
      sellOrderId: orderId,
      agreeErpa: false,
    }),
    [askAmount, askDenom, batchDenom, orderId],
  );

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
          Sell orders
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
              renderActionButtonsFunc={(i: number) => {
                const isOwnSellOrder =
                  normalizedSellOrders[i]?.seller === accountAddress;

                return (
                  <>
                    {isOwnSellOrder && (
                      <TableActionButtons
                        buttons={[
                          {
                            label: CANCEL_SELL_ORDER_ACTION,
                            onClick: () => {
                              setSelectedAction('cancel');
                              setSelectedSellOrder(i);
                            },
                          },
                        ]}
                        sx={{ width: '100%' }}
                      />
                    )}
                    {!isOwnSellOrder && (
                      <OutlinedButton
                        startIcon={
                          <CreditsIcon color={theme.palette.secondary.main} />
                        }
                        size="small"
                        onClick={async () => {
                          track<'buy1', Buy1Event>('buy1', {
                            url: location.pathname,
                            buttonLocation: 'sellOrderTable',
                            projectName: normalizedSellOrders[i].project?.name,
                            projectId: normalizedSellOrders[i].project?.id,
                            creditClassId:
                              normalizedSellOrders[i].project?.classId,
                          });
                          if (accountAddress) {
                            selectedSellOrderIdRef.current = Number(
                              normalizedSellOrders?.[i].id,
                            );
                            submittedQuantityRef.current = undefined;
                            refetchSellOrders();
                            setSelectedAction('buy');
                            setSelectedSellOrder(i);
                          } else {
                            setDisplayErrorBanner(true);
                          }
                        }}
                      >
                        {BUY_SELL_ORDER_ACTION}
                      </OutlinedButton>
                    )}
                  </>
                );
              }}
            />
          </WithLoader>
        </Box>
      </Section>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={() => setSelectedSellOrder(null)}
        onSubmit={buySellOrderSubmit}
        sellOrders={[
          {
            id: orderId,
            askAmount,
            askDenom,
            askBaseDenom,
            batchDenom,
            seller,
            quantity: amountAvailable,
            disableAutoRetire,
          },
        ]}
        project={{
          id: project?.id ?? '',
        }}
        initialValues={initialValues}
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
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onButtonClick}
        icon={
          selectedAction === 'buy' ? (
            <CelebrateIcon sx={{ width: '85px', height: '106px' }} />
          ) : undefined
        }
        socialItems={getSocialItems({
          twitter: { text: STOREFRONT_TWITTER_TEXT, url: shareUrl },
          linkedIn: { url: shareUrl },
        })}
      />
      <TxErrorModal
        error={error ?? ''}
        open={!!error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={'CLOSE WINDOW'}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
        linkComponent={Link}
        onButtonClick={onButtonClick}
      />
      <CancelConfirmModal
        open={isCancelModalOpen}
        onClose={handleCancelModalClose}
        linkComponent={Link}
        onConfirm={cancelSellOrderSubmit}
        onConfirmTitle="Yes, cancel sell order"
        onCancelTitle="WHOOPS, EXIT"
        title="Are you sure would you like to cancel this sell order?"
        cardItems={getCancelCardItems(
          normalizedSellOrders[selectedSellOrder ?? 0] ?? {},
        )}
      />
      {displayErrorBanner && (
        <ErrorBanner
          text={ERROR_BANNER}
          onClose={() => setDisplayErrorBanner(false)}
        />
      )}
    </Box>
  );
};
