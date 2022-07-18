import { Box, useTheme } from '@mui/material';
import { noop } from 'lodash';
import { useMemo, useState } from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { ConfirmModal as CancelConfirmModal } from 'web-components/lib/components/modal/ConfirmModal';
import { Link } from '../../../components/atoms';
import { BuyCreditsModal } from '../../../components/organisms';
import SellOrdersTable from '../../../components/organisms/SellOrdersTable/SellOrdersTable';
import useMsgClient from '../../../hooks/useMsgClient';
import useQueryListBatchInfo from '../../../hooks/useQueryListBatchInfo';
import { useQuerySellOrders } from '../../../hooks/useQuerySellOrders';
import { getHashUrl } from '../../../lib/block-explorer';
import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import { BUY_SELL_ORDER_ACTION } from './Storefront.constants';
import { sellOrdersMock, txHashMock } from './Storefront.mock';
import normalizeSellOrders from './Storefront.normalizer';
import { getCancelCardItems, sortByExpirationDate } from './Storefront.utils';
import useCancelSellOrderSubmit from './hooks/useCancelSellOrderSubmit';
import { SellOrderActions } from './Storefront.types';

export const Storefront = (): JSX.Element => {
  const { sellOrdersResponse, refetchSellOrders } = useQuerySellOrders();
  const sellOrders = sellOrdersMock ?? sellOrdersResponse?.sellOrders;
  const batchDenoms = useMemo(
    () => sellOrders?.map(sellOrder => sellOrder.batchDenom),
    [sellOrders],
  );
  const batchInfos = useQueryListBatchInfo(batchDenoms);
  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const theme = useTheme();
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const [selectedAction, setSelectedAction] = useState<SellOrderActions>();
  const isBuyModalOpen = selectedSellOrder !== null && selectedAction === 'buy';
  const isCancelModalOpen =
    selectedSellOrder !== null && selectedAction === 'cancel';

  const normalizedSellOrders = normalizeSellOrders({
    batchInfos,
    sellOrders,
  }).sort(sortByExpirationDate);

  const handleTxQueued = () => setIsProcessingModalOpen(true);
  const handleTxDelivered = () => {
    setIsProcessingModalOpen(false);
    refetchSellOrders();
  };
  const handleError = () => setIsProcessingModalOpen(false);

  const { wallet, signAndBroadcast } = useMsgClient(
    handleTxQueued,
    handleTxDelivered,
    handleError,
  );
  const accountAddress = wallet?.address;

  const buySellOrderSubmit = useBuySellOrderSubmit({
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    setIsProcessingModalOpen,
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

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setTxModalTitle('');
    setSelectedAction(undefined);
  };

  const handleCancelModalClose = (): void => {
    setSelectedSellOrder(null);
  };

  const {
    askAmount,
    askDenom,
    batchDenom,
    id: orderId,
  } = normalizedSellOrders[selectedSellOrder ?? 0] ?? {};

  const initalValues = useMemo(
    () => ({
      creditCount: 1,
      retirementNote: '',
      stateProvince: '',
      country: '',
      postalCode: '',
      retirementAction: 'autoretire',
      price: Number(askAmount),
      askDenom: askDenom,
      batchDenom: batchDenom,
      sellOrderId: orderId,
    }),
    [askAmount, askDenom, batchDenom, orderId],
  );

  return (
    <>
      <Section>
        <Title variant="h2">Sell orders</Title>
        <Box sx={{ paddingBottom: '150px' }}>
          <SellOrdersTable
            sellOrders={normalizedSellOrders}
            renderActionButtonsFunc={(i: number) => {
              const isOwnSellOrder =
                normalizedSellOrders[i].seller === accountAddress;

              return isOwnSellOrder ? (
                <TableActionButtons
                  buttons={[
                    {
                      label: `Cancel`,
                      onClick: () => {
                        setSelectedAction('cancel');
                        setSelectedSellOrder(i);
                      },
                    },
                    {
                      label: `Change`,
                      onClick: () => {
                        setSelectedAction('change');
                        setSelectedSellOrder(i);
                      },
                    },
                  ]}
                />
              ) : (
                <OutlinedButton
                  startIcon={
                    <CreditsIcon color={theme.palette.secondary.main} />
                  }
                  size="small"
                  onClick={() => {
                    setSelectedAction('buy');
                    setSelectedSellOrder(i);
                  }}
                >
                  {BUY_SELL_ORDER_ACTION}
                </OutlinedButton>
              );
            }}
          />
        </Box>
      </Section>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={() => setSelectedSellOrder(null)}
        onSubmit={buySellOrderSubmit}
        project={{
          id: selectedSellOrder?.toString() ?? '',
        }}
        initialValues={initalValues}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
      />
      <TxSuccessfulModal
        open={!!cardItems}
        onClose={handleTxModalClose}
        txHash={txHashMock}
        txHashUrl={getHashUrl(txHashMock)}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onViewPortfolio={handleTxModalClose}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
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
          normalizedSellOrders[selectedSellOrder ?? 0],
        )}
      />
    </>
  );
};
