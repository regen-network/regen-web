import { useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Box, useTheme } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ERROR_BANNER } from 'config/contents';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
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
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import { Title } from 'web-components/lib/components/typography';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/ActionsTable.constants';

import { useLedger } from 'ledger';
import { getHashUrl } from 'lib/block-explorer';
import { getBatchQuery } from 'lib/queries/react-query/ecocredit/getBatchQuery/getBatchQuery';
import { getProjectsQuery } from 'lib/queries/react-query/ecocredit/getProjectsQuery/getProjectsQuery';
import { getAllProjectsQuery } from 'lib/queries/react-query/registry-server/getAllProjectsQuery/getAllProjectsQuery';
import { getMetadataQuery } from 'lib/queries/react-query/registry-server/getMetadataQuery/getMetadataQuery';
import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';

import { useFetchSellOrders } from 'features/marketplace/BuySellOrderFlow/hooks/useFetchSellOrders';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { BuyCreditsModal, BuyCreditsValues } from 'components/organisms';
import SellOrdersTable from 'components/organisms/SellOrdersTable/SellOrdersTable';
import useMsgClient from 'hooks/useMsgClient';

import { client as sanityClient } from '../../../sanity';
import useBuySellOrderSubmit from './hooks/useBuySellOrderSubmit';
import useCancelSellOrderSubmit from './hooks/useCancelSellOrderSubmit';
import { useCheckSellOrderAvailabilty } from './hooks/useCheckSellOrderAvailabilty';
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
import { getCancelCardItems, sortBySellOrderId } from './Storefront.utils';

export const Storefront = (): JSX.Element => {
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const { ecocreditClient } = useLedger();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });
  const { offset, rowsPerPage } = paginationParams;

  // We do not use pagination yet on the SellOrders query
  // because the ledger currently returns sell orders ordered by seller address and not by id
  // which would result in a list of non sequential ids in the sell orders table and look weird
  // TODO: use pagination as soon as this is fixed on Regen Ledger side (as part of v5.0)
  const { sellOrders, refetchSellOrders } = useFetchSellOrders();
  const uiSellOrdersInfo = useMemo(
    () => sellOrders?.map(normalizeToUISellOrderInfo),
    [sellOrders],
  );

  // Off-chain stored Projects
  const { data: offChainProjectData } = useQuery(
    getAllProjectsQuery({ client: apolloClient, enabled: !!apolloClient }),
  );

  // On-chain stored Projects
  const { data: onChainProjects } = useQuery(
    getProjectsQuery({
      client: ecocreditClient,
      enabled: !!ecocreditClient,
      request: {},
    }),
  );

  const { data: sanityCreditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  // Batch pagination
  const batchDenoms = useMemo(
    () =>
      sellOrders
        ?.sort(sortBySellOrderId)
        .slice(offset, offset + rowsPerPage)
        .map(sellOrder => sellOrder.batchDenom),
    [sellOrders, offset, rowsPerPage],
  );
  const batchesResult = useQueries({
    queries:
      batchDenoms?.map(batchDenom =>
        getBatchQuery({
          client: ecocreditClient,
          enabled: !!ecocreditClient,
          request: { batchDenom },
        }),
      ) ?? [],
  });
  const batchInfos = useMemo(
    () => batchesResult?.map(batchResult => batchResult.data?.batch) ?? [],
    [batchesResult],
  );

  // Project metadata pagination
  const projectsIds = useMemo(
    () => batchInfos.map(batchInfo => batchInfo?.projectId),
    [batchInfos],
  );
  const projects = useMemo(
    () =>
      onChainProjects?.projects.filter(project =>
        projectsIds?.includes(project.id),
      ),
    [projectsIds, onChainProjects?.projects],
  );
  const metadataResults = useQueries({
    queries:
      projects?.map(({ metadata: iri }) => getMetadataQuery({ iri })) ?? [],
  });
  const metadata = metadataResults.map(queryResult => queryResult.data);
  const projectsWithMetadata = useMemo(
    () =>
      projects?.map((project, i) => ({
        ...project,
        metadata: metadata?.[i],
      })) ?? [],
    [projects, metadata],
  );

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
  const submittedQuantityRef = useRef<number>();
  const isBuyModalOpen = selectedSellOrder !== null && selectedAction === 'buy';
  const navigate = useNavigate();
  const location = useLocation();
  const { track } = useTracker();
  const isCancelModalOpen =
    selectedSellOrder !== null && selectedAction === 'cancel';
  useResetErrorBanner({ displayErrorBanner, setDisplayErrorBanner });

  const projectsInfosByHandleMap = useMemo(
    () =>
      normalizeProjectsInfosByHandleMap({
        offChainProjects: offChainProjectData?.allProjects,
        onChainProjects: projectsWithMetadata,
        sanityCreditClassData,
      }),
    [offChainProjectData, projectsWithMetadata, sanityCreditClassData],
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
    return {
      id: projectId,
      name: sellOrder?.project?.name ?? projectId,
    };
  }, [normalizedSellOrders]);

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
                              sellOrders?.[i].id,
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
