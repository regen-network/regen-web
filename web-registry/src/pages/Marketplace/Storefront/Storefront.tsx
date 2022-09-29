import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import {
  BatchInfo,
  QueryProjectsResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

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
import {
  DEFAULT_ROWS_PER_PAGE,
  TablePaginationParams,
} from 'web-components/lib/components/table/ActionsTable';
import { Title } from 'web-components/lib/components/typography';

import { useAllProjectsQuery } from 'generated/graphql';
import { useAllCreditClassQuery } from 'generated/sanity-graphql';
import { getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { BuyCreditsModal } from 'components/organisms';
import SellOrdersTable from 'components/organisms/SellOrdersTable/SellOrdersTable';
import useEcocreditQuery from 'hooks/useEcocreditQuery';
import useMsgClient from 'hooks/useMsgClient';
import useQueryListBatchInfo from 'hooks/useQueryListBatchInfo';
import { useQuerySellOrders } from 'hooks/useQuerySellOrders';

import { client as sanityClient } from '../../../sanity';
import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import useCancelSellOrderSubmit from './hooks/useCancelSellOrderSubmit';
import { useFetchMetadataProjects } from './hooks/useFetchMetadataProjects';
import { useResetErrorBanner } from './hooks/useResetErrorBanner';
import {
  BUY_SELL_ORDER_ACTION,
  BUY_SELL_ORDER_BUTTON,
  BUY_SELL_ORDER_TITLE,
  CANCEL_SELL_ORDER_ACTION,
} from './Storefront.constants';
import {
  normalizeProjectsInfosByHandleMap,
  normalizeSellOrders,
} from './Storefront.normalizer';
import { SellOrderActions } from './Storefront.types';
import {
  getCancelCardItems,
  sortBySellOrderId,
  updateBatchInfosMap,
} from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { offset, rowsPerPage } = paginationParams;
  const { sellOrdersResponse, refetchSellOrders } = useQuerySellOrders();
  const sellOrders = sellOrdersResponse?.sellOrders;

  const batchDenoms = useMemo(
    () =>
      sellOrders
        ?.sort(sortBySellOrderId)
        .slice(offset, offset + rowsPerPage)
        .map(sellOrder => sellOrder.batchDenom),
    [sellOrders, offset, rowsPerPage],
  );

  const [batchInfosMap] = useState(new Map<string, BatchInfo>());
  const newBatchDenoms = useMemo(
    () => batchDenoms?.filter(batchDenom => !batchInfosMap.has(batchDenom)),
    [batchDenoms, batchInfosMap],
  );

  const batchInfoResponses = useQueryListBatchInfo(newBatchDenoms);
  const batchInfos = updateBatchInfosMap({ batchInfosMap, batchInfoResponses });

  // offchain stored Projects
  const { data: offChainProjectData } = useAllProjectsQuery();

  // onChain stored Projects
  const { data: onChainProjects } = useEcocreditQuery<QueryProjectsResponse>({
    query: 'projects',
    params: {},
  });

  const { data: sanityCreditClassData } = useAllCreditClassQuery({
    client: sanityClient,
  });

  const { projectsWithMetadata: onChainprojectsWithMedata } =
    useFetchMetadataProjects({
      projects: onChainProjects?.projects,
    });

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
  const isBuyModalOpen = selectedSellOrder !== null && selectedAction === 'buy';
  const navigate = useNavigate();
  const isCancelModalOpen =
    selectedSellOrder !== null && selectedAction === 'cancel';
  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

  const projectsInfosByHandleMap = useMemo(
    () =>
      normalizeProjectsInfosByHandleMap({
        offChainProjects: offChainProjectData?.allProjects,
        onChainProjects: onChainprojectsWithMedata,
        sanityCreditClassData,
      }),
    [offChainProjectData, onChainprojectsWithMedata, sanityCreditClassData],
  );

  const normalizedSellOrders = useMemo(
    () =>
      normalizeSellOrders({
        batchInfos,
        sellOrders,
        projectsInfosByHandleMap,
      }),
    [batchInfos, sellOrders, projectsInfosByHandleMap],
  );

  const handleTxQueued = (): void => setIsProcessingModalOpen(true);
  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    refetchSellOrders();
  };
  const handleError = (): void => setIsProcessingModalOpen(false);
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
    setSelectedAction(undefined);
  };

  const handleCancelModalClose = (): void => {
    setSelectedSellOrder(null);
  };

  const onButtonClick = (): void => {
    if (txModalTitle === BUY_SELL_ORDER_TITLE) {
      navigate('/ecocredits/dashboard');
    } else {
      handleTxModalClose();
    }
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

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    signAndBroadcast,
    setCardItems,
    setSelectedSellOrder,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    buttonTitle: BUY_SELL_ORDER_BUTTON,
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

  return (
    <Box sx={{ backgroundColor: 'grey.50' }}>
      <Section>
        <Title variant="h2" sx={{ mb: 8.5 }}>
          Sell orders
        </Title>
        <Box sx={{ paddingBottom: '150px' }}>
          <WithLoader
            isLoading={sellOrders === undefined}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <SellOrdersTable
              sellOrders={normalizedSellOrders}
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
                        onClick={() => {
                          if (accountAddress) {
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
        project={{
          id: project?.id ?? '',
          sellOrders: [
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
          ],
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
          text="Please connect to Keplr to use Regen Ledger features"
          onClose={() => setDisplayErrorBanner(false)}
        />
      )}
    </Box>
  );
};
