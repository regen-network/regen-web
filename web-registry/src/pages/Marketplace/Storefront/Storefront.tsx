import { Box, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import { CelebrateIcon } from 'web-components/lib/components/icons/CelebrateIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import Section from 'web-components/lib/components/section';
import { Title } from 'web-components/lib/components/typography';
import { Link } from '../../../components/atoms';
import { BuyCreditsModal } from '../../../components/organisms';
import SellOrdersTable from '../../../components/organisms/SellOrdersTable/SellOrdersTable';
import useMsgClient from '../../../hooks/useMsgClient';
import { useAllProjectsQuery } from '../../../generated/graphql';
import useQueryListBatchInfo from '../../../hooks/useQueryListBatchInfo';
import useQueryProjects from '../../../hooks/useQueryProjects';
import { useQuerySellOrders } from '../../../hooks/useQuerySellOrders';
import { getHashUrl } from '../../../lib/block-explorer';
import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import { BUY_SELL_ORDER_ACTION } from './Storefront.constants';
import {
  normalizeProjectsInfosByHandleMap,
  normalizeSellOrders,
} from './Storefront.normalizer';
import { sortByExpirationDate } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const { sellOrdersResponse, refetchSellOrders } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;
  const batchDenoms = useMemo(
    () => sellOrders?.map(sellOrder => sellOrder.batchDenom),
    [sellOrders],
  );
  const batchInfos = useQueryListBatchInfo(batchDenoms);
  // offchain stored Projects
  const { data: offChainProjects } = useAllProjectsQuery();
  // onChain stored Projects
  const onChainProjects = useQueryProjects();

  const [selectedSellOrder, setSelectedSellOrder] = useState<number | null>(
    null,
  );
  const theme = useTheme();
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const navigate = useNavigate();

  const projectsInfosByHandleMap = normalizeProjectsInfosByHandleMap({
    offChainProjects: offChainProjects?.allProjects,
    onChainProjects: onChainProjects?.projects,
  });

  const normalizedSellOrders = normalizeSellOrders({
    batchInfos,
    sellOrders,
    projectsInfosByHandleMap,
  }).sort(sortByExpirationDate);

  const handleTxQueued = () => setIsProcessingModalOpen(true);
  const handleTxDelivered = () => {
    setIsProcessingModalOpen(false);
    refetchSellOrders();
  };
  const handleError = () => setIsProcessingModalOpen(false);
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const onButtonClick = (): void => {
    handleTxModalClose();
    navigate('/ecocredits/dashboard');
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
  const isBuyModalOpen = selectedSellOrder !== null;

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    signAndBroadcast,
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
  });

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
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        cardItems={cardItems}
        linkComponent={Link}
        onViewPortfolio={onButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
      />
      <TxErrorModal
        error={error ?? ''}
        open={!!error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle}
        linkComponent={Link}
        onViewPortfolio={onButtonClick}
      />
    </>
  );
};
