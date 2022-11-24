import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SxProps, useTheme } from '@mui/material';
import { QueryBasketResponse } from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { useTrack } from 'use-analytics';

import { TableActionButtons } from 'web-components/lib/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import AvailableCreditsIconAlt from 'web-components/lib/components/icons/AvailableCreditsIconAlt';
import { Option } from 'web-components/lib/components/inputs/SelectTextField';
import {
  BASKET_PUT_TITLE,
  BasketPutModal,
} from 'web-components/lib/components/modal/BasketPutModal';
import {
  BASKET_TAKE_TITLE,
  BasketTakeModal,
} from 'web-components/lib/components/modal/BasketTakeModal';
import { CreateSellOrderModal } from 'web-components/lib/components/modal/CreateSellOrderModal';
import {
  CREDIT_RETIRE_TITLE,
  CreditRetireModal,
} from 'web-components/lib/components/modal/CreditRetireModal';
import {
  CREDIT_SEND_TITLE,
  CreditSendModal,
} from 'web-components/lib/components/modal/CreditSendModal';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';
import { Item } from 'web-components/lib/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/lib/components/modal/TxSuccessfulModal';
import { TablePaginationParams } from 'web-components/lib/components/table/ActionsTable';
import type { Theme } from 'web-components/lib/theme/muiTheme';
import { DEFAULT_ROWS_PER_PAGE } from 'web-components/src/components/table/ActionsTable.constants';

import { getHashUrl } from 'lib/block-explorer';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { Portfolio } from 'components/organisms/Portfolio';
import {
  useBasketsWithClasses,
  useBasketTokens,
  useEcocredits,
  useMsgClient,
  useQueryBaskets,
} from 'hooks';
import type { BasketTokens } from 'hooks/useBasketTokens';
import useMarketplaceQuery from 'hooks/useMarketplaceQuery';

import useBasketPutSubmit from './hooks/useBasketPutSubmit';
import useBasketTakeSubmit from './hooks/useBasketTakeSubmit';
import useCreateSellOrderSubmit from './hooks/useCreateSellOrderSubmit';
import useCreditRetireSubmit from './hooks/useCreditRetireSubmit';
import useCreditSendSubmit from './hooks/useCreditSendSubmit';
import useOpenTakeModal from './hooks/useOpenTakeModal';
import { useUpdateCardItemsTakeBasket } from './hooks/useUpdateCardItemsTakeBasket';
import useUpdateCreditBaskets from './hooks/useUpdateCreditBaskets';
import { useUpdateTxModalTitle } from './hooks/useUpdateTxModalTitle';
import {
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_SHORT,
  CREATE_SELL_ORDER_TITLE,
  ERROR_BUTTON,
} from './MyEcocredits.constants';
import {
  getAvailableAmountByBatch,
  getDenomAllowedOptions,
  getOtherSellOrderBatchDenomOptions,
} from './MyEcocredits.utils';

// import { ReactComponent as WithdrawIBC } from 'assets/svgs/withdraw-ibc.svg';
// import { ReactComponent as DepositIBC } from 'assets/svgs/deposit-ibc.svg';
// import { ReactComponent as Sell } from 'assets/svgs/sell.svg';
import { ReactComponent as PutInBasket } from 'assets/svgs/put-in-basket.svg';
import { ReactComponent as TakeFromBasket } from 'assets/svgs/take-from-basket.svg';

// address prefix `regen` used to narrow address validation for recipients
const addressPrefix = chainInfo.bech32Config.bech32PrefixAccAddr;

export const MyEcocredits = (): JSX.Element => {
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [creditSendOpen, setCreditSendOpen] = useState<number>(-1);
  const [creditRetireOpen, setCreditRetireOpen] = useState<number>(-1);
  const [sellOrderCreateOpen, setSellOrderCreateOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>();
  const [creditBaskets, setCreditBaskets] = useState<
    (QueryBasketResponse | undefined)[][]
  >([]);
  const [basketTakeTokens, setBasketTakeTokens] = useState<
    BasketTokens | undefined
  >();
  const [txModalHeader, setTxModalHeader] = useState<string | undefined>();
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [txButtonTitle, setTxButtonTitle] = useState<string | undefined>();

  const navigate = useNavigate();
  const track = useTrack();

  const [paginationParams, setPaginationParams] =
    useState<TablePaginationParams>({
      page: 0,
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      offset: 0,
    });

  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };

  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setCardItemsTakeDone(false);
    setTxModalTitle(undefined);
    setTxModalHeader(undefined);
    setTxButtonTitle(undefined);
    setDeliverTxResponse(undefined);
    setError(undefined);
  };

  const onButtonClick = (): void => {
    handleTxModalClose();
    if (txButtonTitle === CREATE_SELL_ORDER_BUTTON && !error) {
      navigate('/storefront');
    }
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // Refetch basket/ecocredits data so it shows latest values
    fetchBasketTokens();
    reloadBalances();
  };

  const onCreateSellOrderBroadcast = (): void => setSellOrderCreateOpen(-1);

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    wallet,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const { setCardItemsTakeDone } = useUpdateCardItemsTakeBasket({
    deliverTxResponse,
    cardItems,
    setCardItems,
  });

  const theme = useTheme();
  const baskets = useQueryBaskets();
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const accountAddress = wallet?.address;
  const { credits, reloadBalances, isLoadingCredits } = useEcocredits({
    address: accountAddress,
    paginationParams,
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

  const basketsWithClasses = useBasketsWithClasses(baskets);
  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN || '';
  const { basketTokens, fetchBasketTokens } = useBasketTokens(
    accountAddress,
    baskets,
  );

  useUpdateTxModalTitle({ setTxModalTitle, deliverTxResponse });
  useUpdateCreditBaskets({ basketsWithClasses, credits, setCreditBaskets });

  const openTakeModal = useOpenTakeModal({
    basketTokens,
    basketsWithClasses,
    setBasketTakeTokens,
  });

  const basketTakeSubmit = useBasketTakeSubmit({
    accountAddress,
    basketTakeTitle: BASKET_TAKE_TITLE,
    baskets,
    setBasketTakeTokens,
    setCardItems,
    setTxModalTitle,
    setTxModalHeader,
    signAndBroadcast,
  });

  const creditSendSubmit = useCreditSendSubmit({
    accountAddress,
    creditSendOpen,
    creditSendTitle: CREDIT_SEND_TITLE,
    credits,
    setCardItems,
    setCreditSendOpen,
    setTxModalHeader,
    setTxModalTitle,
    signAndBroadcast,
  });

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets,
    basketPutOpen,
    basketPutTitle: BASKET_PUT_TITLE,
    basketTakeTitle: BASKET_TAKE_TITLE,
    credits,
    setBasketPutOpen,
    setBasketTakeTokens,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
    signAndBroadcast,
  });

  const creditRetireSubmit = useCreditRetireSubmit({
    accountAddress,
    creditRetireOpen,
    creditRetireTitle: CREDIT_RETIRE_TITLE,
    credits,
    setCardItems,
    setCreditRetireOpen,
    setTxModalHeader,
    setTxModalTitle,
    signAndBroadcast,
  });

  const createSellOrderSubmit = useCreateSellOrderSubmit({
    accountAddress,
    credits,
    signAndBroadcast,
    setCardItems,
    setTxModalHeader,
    setTxButtonTitle,
    onTxBroadcast: onCreateSellOrderBroadcast,
  });

  const sxs = {
    arrow: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    } as SxProps<Theme>,
  };

  return (
    <>
      <WithLoader
        isLoading={isLoadingCredits}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Portfolio
          credits={credits}
          basketTokens={basketTokens}
          onTableChange={setPaginationParams}
          renderCreditActionButtons={
            credits.findIndex(c => Number(c.balance?.tradableAmount) > 0) > -1
              ? (i: number) => {
                  // No CTA available without tradable credit for given credit batch
                  if (Number(credits[i]?.balance?.tradableAmount) <= 0) {
                    return undefined;
                  }
                  const buttons = [
                    // Disabling for now until the marketplace is
                    // released on regen-ledger
                    // {
                    //   icon: <Sell />,
                    //   label: 'Sell',
                    //   // eslint-disable-next-line no-console
                    //   onClick: () => console.log(`TODO sell credit ${i}`),
                    // },
                    {
                      icon: <AvailableCreditsIconAlt sx={sxs.arrow} />,
                      label: CREATE_SELL_ORDER_SHORT,
                      onClick: () => {
                        track('sell1');
                        setSellOrderCreateOpen(i);
                      },
                    },
                    {
                      icon: (
                        <ArrowDownIcon
                          sx={sxs.arrow}
                          color={theme.palette.secondary.main}
                          direction="next"
                        />
                      ),
                      label: CREDIT_SEND_TITLE,
                      onClick: () => {
                        track('send1');
                        setCreditSendOpen(i);
                      },
                    },
                    {
                      icon: (
                        <ArrowDownIcon
                          sx={sxs.arrow}
                          color={theme.palette.secondary.main}
                          direction="down"
                        />
                      ),
                      label: CREDIT_RETIRE_TITLE,
                      onClick: () => setCreditRetireOpen(i),
                    },
                  ];

                  // Only add ability to put credits into basket
                  // if there's at least one basket that accepts those credits
                  if (creditBaskets[i] && creditBaskets[i].length > 0) {
                    buttons.splice(1, 0, {
                      // buttons.splice(2, 0, { TODO: Replace once we had 'Sell'
                      icon: <PutInBasket />,
                      label: BASKET_PUT_TITLE,
                      onClick: () => setBasketPutOpen(i),
                    });
                  }
                  return <TableActionButtons buttons={buttons} />;
                }
              : // Hide full CTA column if no credits tradable for all credit batches
                undefined
          }
          renderBasketActionButtons={(i: number) => (
            <TableActionButtons
              buttons={[
                {
                  icon: <TakeFromBasket />,
                  label: BASKET_TAKE_TITLE,
                  onClick: () => openTakeModal(i),
                },
                // This will be handled from osmosis
                // so hiding these for now
                // {
                //   icon: <WithdrawIBC />,
                //   label: 'Withdraw (IBC)',
                //   onClick: () => `TODO withdraw ${i}`,
                // },
                // {
                //   icon: <DepositIBC />,
                //   label: 'Deposit (IBC)',
                //   onClick: () => `TODO deposit ${i}`,
                // },
              ]}
            />
          )}
        />
      </WithLoader>
      {creditSendOpen > -1 && !!accountAddress && (
        <CreditSendModal
          sender={accountAddress}
          batchDenom={credits[creditSendOpen].denom}
          availableTradableAmount={Number(
            credits[creditSendOpen].balance?.tradableAmount,
          )}
          mapboxToken={mapboxToken}
          open={creditSendOpen > -1}
          onClose={() => setCreditSendOpen(-1)}
          onSubmit={creditSendSubmit}
          addressPrefix={addressPrefix}
        />
      )}
      {basketPutOpen > -1 && (
        <BasketPutModal
          basketOptions={
            creditBaskets[basketPutOpen]
              .map(b => ({
                label: b?.basket?.name,
                value: b?.basket?.basketDenom,
              }))
              .filter(v => v.label && v.value) as Option[]
          }
          availableTradableAmount={Number(
            credits[basketPutOpen].balance?.tradableAmount,
          )}
          batchDenom={credits[basketPutOpen].denom}
          open={basketPutOpen > -1}
          onClose={() => setBasketPutOpen(-1)}
          onSubmit={basketPutSubmit}
        />
      )}
      {creditRetireOpen > -1 && !!accountAddress && (
        <CreditRetireModal
          batchDenom={credits[creditRetireOpen].denom}
          availableTradableAmount={Number(
            credits[creditRetireOpen].balance?.tradableAmount,
          )}
          mapboxToken={mapboxToken}
          open={creditRetireOpen > -1}
          onClose={() => setCreditRetireOpen(-1)}
          onSubmit={creditRetireSubmit}
        />
      )}
      {!!basketTakeTokens?.basket && !!accountAddress && (
        <BasketTakeModal
          open={true}
          accountAddress={accountAddress}
          basket={basketTakeTokens?.basket}
          basketDisplayDenom={
            basketTakeTokens?.metadata?.metadata?.display || ''
          }
          balance={
            parseInt(basketTakeTokens?.balance?.balance?.amount || '0') /
            Math.pow(10, basketTakeTokens?.basket?.exponent)
          }
          mapboxToken={mapboxToken}
          onClose={() => setBasketTakeTokens(undefined)}
          onSubmit={basketTakeSubmit}
        />
      )}
      {sellOrderCreateOpen > -1 && !!accountAddress && (
        <CreateSellOrderModal
          batchDenoms={[
            {
              label: credits[sellOrderCreateOpen].denom ?? '0',
              value: credits[sellOrderCreateOpen].denom ?? '0',
            },
            ...getOtherSellOrderBatchDenomOptions({
              credits,
              sellOrderCreateOpen,
            }),
          ]}
          allowedDenoms={allowedDenomOptions}
          sellDenom={'REGEN'}
          availableAmountByBatch={getAvailableAmountByBatch({ credits })}
          open={true}
          onClose={() => setSellOrderCreateOpen(-1)}
          onSubmit={createSellOrderSubmit}
          title={CREATE_SELL_ORDER_TITLE}
        />
      )}
      <ProcessingModal
        open={!deliverTxResponse && isProcessingModalOpen}
        onClose={() => setIsProcessingModalOpen(false)}
      />
      {!error && txHash && cardItems && (txModalTitle || txModalHeader) && (
        <TxSuccessfulModal
          open={!error && (!!txModalTitle || !!deliverTxResponse)}
          onClose={handleTxModalClose}
          txHash={txHash ?? ''}
          txHashUrl={txHashUrl}
          title={txModalHeader}
          cardTitle={txModalTitle ?? ''}
          buttonTitle={txButtonTitle}
          cardItems={cardItems}
          linkComponent={Link}
          onButtonClick={onButtonClick}
        />
      )}
      <TxErrorModal
        error={error ?? ''}
        open={!!error}
        onClose={handleTxModalClose}
        txHash={txHash || ''}
        txHashUrl={txHashUrl}
        cardTitle={txModalTitle ?? ''}
        buttonTitle={ERROR_BUTTON}
        linkComponent={Link}
        onButtonClick={onButtonClick}
      />
    </>
  );
};
