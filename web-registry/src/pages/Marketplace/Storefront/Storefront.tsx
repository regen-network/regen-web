import { Box, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import { Title } from 'web-components/lib/components/typography';
import { Link } from '../../../components/atoms';
import { BuyCreditsModal } from '../../../components/organisms';
import SellOrdersTable from '../../../components/organisms/SellOrdersTable/SellOrdersTable';
import useQueryListBatchInfo from '../../../hooks/useQueryListBatchInfo';
import { useQuerySellOrders } from '../../../hooks/useQuerySellOrders';
import { getHashUrl } from '../../../lib/block-explorer';
import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import { BUY_SELL_ORDER_ACTION } from './Storefront.constants';
import { txHashMock } from './Storefront.mock';
import normalizeSellOrders from './Storefront.normalizer';
import { sortByExpirationDate } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const sellOrdersResponse = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
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
  const isBuyModalOpen = selectedSellOrder !== null;

  const normalizedSellOrders = normalizeSellOrders({
    batchInfos,
    sellOrders,
  }).sort(sortByExpirationDate);

  const buySellOrderSubmit = useBuySellOrderSubmit({
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    setIsProcessingModalOpen,
  });

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setTxModalTitle('');
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
      <Title variant="h2">Sell orders</Title>
      <Box sx={{ paddingBottom: '150px' }}>
        <SellOrdersTable
          sellOrders={normalizedSellOrders}
          renderActionButtonsFunc={(i: number) => (
            <OutlinedButton
              startIcon={<CreditsIcon color={theme.palette.secondary.main} />}
              size="small"
              onClick={() => setSelectedSellOrder(i)}
            >
              {BUY_SELL_ORDER_ACTION}
            </OutlinedButton>
          )}
        />
      </Box>
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
    </>
  );
};
