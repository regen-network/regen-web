import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { SxProps, useTheme } from '@mui/material';
import { getSocialItems } from 'utils/components/ShareSection/getSocialItems';
import { REGEN_APP_PROJECT_URL } from 'utils/components/ShareSection/getSocialItems.constants';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import AvailableCreditsIconAlt from 'web-components/src/components/icons/AvailableCreditsIconAlt';
import PutInBasketIcon from 'web-components/src/components/icons/PutInBasketIcon';
import TakeFromBasketIcon from 'web-components/src/components/icons/TakeFromBasketIcon';
import { Option } from 'web-components/src/components/inputs/SelectTextField';
import { BasketPutModal } from 'web-components/src/components/modal/BasketPutModal';
import { BasketTakeModal } from 'web-components/src/components/modal/BasketTakeModal';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';
import type { Theme } from 'web-components/src/theme/muiTheme';

import { BasketTokens } from 'types/ledger/ecocredit';
import { useAuth } from 'lib/auth/auth';
import { getHashUrl } from 'lib/block-explorer';
import {
  AMOUNT_LABEL,
  AVAILABLE_LABEL,
  BASKET_LABEL,
  BASKET_PUT_SUBMIT_LABEL,
  BASKET_TAKE_AMOUNT_ERROR_TEXT,
  BASKET_TAKE_SUBMIT_LABEL,
  BATCH_DESCRIPTION,
  BATCH_LABEL,
  BLOCKCHAIN_RECORD,
  getBottomFieldsTextMapping,
  INSUFFICIENT_CREDITS,
  INVALID_AMOUNT,
  INVALID_DECIMAL_COUNT,
  INVALID_MEMO_LENGTH,
  MAX_LABEL,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  REQUIRED_MESSAGE,
  RETIRE_ON_TAKE_LABEL,
  RETIRE_ON_TAKE_TOOLTIP,
  RETIREMENT_INFO_TEXT,
  SEE_LESS,
  SEE_MORE,
  SHARE_TITLE,
  STATE_PROVINCE_ERROR_TEXT,
  SUBMIT_ERROR_TEXT,
  TX_ERROR_MODAL_TITLE,
  TX_MODAL_TITLE,
  TX_SUCCESSFUL_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import {
  PutInBasket1Event,
  Retire1Event,
  Sell1Event,
  Send1Event,
} from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { chainInfo } from 'lib/wallet/chainInfo/chainInfo';
import { useWallet } from 'lib/wallet/wallet';

import { useAllowedDenomOptions } from 'features/marketplace/CreateSellOrderFlow/hooks/useAllowedDenomOptions';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { CreateSellOrderModal } from 'components/organisms/CreateSellOrderModal/CreateSellOrderModal';
import { CreditRetireModal } from 'components/organisms/Modals/CreditRetireModal/CreditRetireModal';
import { CREDIT_RETIRE_TITLE } from 'components/organisms/Modals/CreditRetireModal/CreditRetireModal.constants';
import { CreditSendModal } from 'components/organisms/Modals/CreditSendModal/CreditSendModal';
import { Portfolio } from 'components/organisms/Portfolio/Portfolio';
import { useMsgClient } from 'hooks';

import { useDashboardContext } from '../Dashboard.context';
import useBasketPutSubmit from './hooks/useBasketPutSubmit';
import useBasketTakeSubmit from './hooks/useBasketTakeSubmit';
import useCreateSellOrderSubmit from './hooks/useCreateSellOrderSubmit';
import useCreditRetireSubmit from './hooks/useCreditRetireSubmit';
import useCreditSendSubmit from './hooks/useCreditSendSubmit';
import { useFetchBaskets } from './hooks/useFetchBaskets';
import { useFetchEcocredits } from './hooks/useFetchEcocredits';
import { useFetchRetirements } from './hooks/useFetchRetirements';
import useOpenTakeModal from './hooks/useOpenTakeModal';
import { useUpdateCardItemsTakeBasket } from './hooks/useUpdateCardItemsTakeBasket';
import { useUpdateTxModalTitle } from './hooks/useUpdateTxModalTitle';
import {
  BASKET_PUT_TITLE,
  BASKET_TAKE_SUBTITLE,
  BASKET_TAKE_TITLE,
  CREATE_SELL_ORDER_BUTTON,
  CREATE_SELL_ORDER_SHORT,
  CREATE_SELL_ORDER_TITLE,
  CREDIT_SEND_TITLE,
  ERROR_BUTTON,
  getSocialTwitterTextMapping,
  RETIRE_SUCCESS_BUTTON,
} from './MyEcocredits.constants';
import { OnTxSuccessfulProps } from './MyEcocredits.types';
import {
  getAvailableAmountByBatch,
  getOtherSellOrderBatchDenomOptions,
} from './MyEcocredits.utils';

// address prefix `regen` used to narrow address validation for recipients
const addressPrefix = chainInfo.bech32Config.bech32PrefixAccAddr;

export const MyEcocredits = (): JSX.Element => {
  const { _ } = useLingui();
  const [basketPutOpen, setBasketPutOpen] = useState<number>(-1);
  const [creditSendOpen, setCreditSendOpen] = useState<number>(-1);
  const [creditRetireOpen, setCreditRetireOpen] = useState<number>(-1);
  const [sellOrderCreateOpen, setSellOrderCreateOpen] = useState<number>(-1);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [cardItems, setCardItems] = useState<Item[] | undefined>();
  const [basketTakeTokens, setBasketTakeTokens] = useState<
    BasketTokens | undefined
  >();
  const [txModalHeader, setTxModalHeader] = useState<string | undefined>();
  const [txModalTitle, setTxModalTitle] = useState<string | undefined>();
  const [txButtonTitle, setTxButtonTitle] = useState<string | undefined>();
  const lastRetiredProjectIdRef = useRef('');
  const [activePortfolioTab, setActivePortfolioTab] = useState(0);
  const { privActiveAccount, activeAccount } = useAuth();
  const { loginDisabled, wallet: connectedWallet } = useWallet();
  const {
    selectedAccountAddress,
    isOrganizationDashboard,
    isOrganizationOwner,
    isOrganizationAdmin,
  } = useDashboardContext();
  const accountAddress = selectedAccountAddress ?? connectedWallet?.address;
  const canManagePortfolioActions =
    !isOrganizationDashboard || isOrganizationOwner || isOrganizationAdmin;

  const navigate = useNavigate();
  const { track } = useTracker();
  const bottomFieldsTextMapping = useMemo(
    () => getBottomFieldsTextMapping(_),
    [_],
  );

  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
    reloadRetirements,
  } = useFetchRetirements({ address: accountAddress });

  const onCloseBasketPutModal = (): void => setBasketPutOpen(-1);
  const onTxSuccessful = ({
    cardItems,
    title,
    cardTitle,
  }: OnTxSuccessfulProps): void => {
    setCardItems(cardItems);
    setTxModalHeader(title);
    setTxModalTitle(cardTitle);
  };
  const onTakeBroadcast = (): void => setBasketTakeTokens(undefined);

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
    if (txButtonTitle === _(CREATE_SELL_ORDER_BUTTON) && !error) {
      navigate('/dashboard/sell');
    }
    if (txButtonTitle === _(RETIRE_SUCCESS_BUTTON) && !error) {
      setActivePortfolioTab(1);
      reloadRetirements();
      setTimeout(() => reloadRetirements(), 5000);
    }
  };

  const handleError = (): void => {
    setIsProcessingModalOpen(false);
  };

  const handleTxDelivered = (): void => {
    setIsProcessingModalOpen(false);
    // Refetch basket/profile data so it shows latest values
    reloadBasketsBalance();
    reloadBalances();
  };

  const onCreateSellOrderBroadcast = (): void => setSellOrderCreateOpen(-1);

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const { setCardItemsTakeDone } = useUpdateCardItemsTakeBasket({
    deliverTxResponse,
    cardItems,
    setCardItems,
  });

  const SOCIAL_TWITTER_TEXT_MAPPING = getSocialTwitterTextMapping(_);
  const theme = useTheme();
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  const accountAddress = wallet?.address;
  const {
    credits,
    reloadBalances,
    isLoadingCredits,
    paginationParams,
    setPaginationParams,
  } = useFetchEcocredits({ address: accountAddress });

  const {
    basketTokens,
    baskets,
    basketsWithClasses,
    creditBaskets,
    reloadBasketsBalance,
  } = useFetchBaskets({ credits, address: accountAddress });

  useUpdateTxModalTitle({ setTxModalTitle, deliverTxResponse });

  const openTakeModal = useOpenTakeModal({
    basketTokens,
    basketsWithClasses,
    setBasketTakeTokens,
  });

  const basketTakeSubmit = useBasketTakeSubmit({
    accountAddress,
    basketTakeTitle: _(BASKET_TAKE_TITLE),
    baskets: baskets?.basketsInfo,
    signAndBroadcast,
    onTxSuccessful,
    onBroadcast: onTakeBroadcast,
  });

  const creditSendSubmit = useCreditSendSubmit({
    accountAddress,
    creditSendOpen,
    creditSendTitle: _(CREDIT_SEND_TITLE),
    credits,
    setCardItems,
    setCreditSendOpen,
    setTxModalHeader,
    setTxModalTitle,
    signAndBroadcast,
  });

  const basketPutSubmit = useBasketPutSubmit({
    accountAddress,
    baskets: baskets?.basketsInfo,
    basketPutTitle: _(BASKET_PUT_TITLE),
    credit: credits[basketPutOpen] ?? {},
    onBroadcast: onCloseBasketPutModal,
    onTxSuccessful,
    signAndBroadcast,
  });

  const creditRetireSubmit = useCreditRetireSubmit({
    accountAddress,
    creditRetireOpen,
    creditRetireTitle: _(CREDIT_RETIRE_TITLE),
    credits,
    setCardItems,
    setCreditRetireOpen,
    setTxModalHeader,
    setTxModalTitle,
    setTxButtonTitle,
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

  const arrowSx = useMemo<SxProps<Theme>>(
    () => ({
      width: theme.spacing(6),
      height: theme.spacing(6),
    }),
    [theme],
  );

  const hasTradableCredits = useMemo(
    () =>
      credits.some(credit => Number(credit.balance?.tradableAmount ?? 0) > 0),
    [credits],
  );

  const renderCreditActionButtons = useMemo(() => {
    if (!canManagePortfolioActions || !hasTradableCredits) return undefined;

    return (i: number) => {
      if (Number(credits[i]?.balance?.tradableAmount) <= 0) {
        return undefined;
      }

      const buttons = [
        {
          icon: <AvailableCreditsIconAlt sx={arrowSx} />,
          label: _(CREATE_SELL_ORDER_SHORT),
          onClick: () => {
            track<Sell1Event>('sell1', {
              projectId: credits[i].projectId,
              projectName: credits[i]?.projectName,
              creditClassId: credits[i]?.classId,
            });
            setSellOrderCreateOpen(i);
          },
        },
        {
          icon: (
            <ArrowDownIcon
              sx={arrowSx}
              color={theme.palette.secondary.dark}
              direction="next"
            />
          ),
          label: _(CREDIT_SEND_TITLE),
          onClick: () => {
            track<Send1Event>('send1', {
              batchDenom: credits[i].denom,
              projectId: credits[i].projectId,
              projectName: credits[i]?.projectName,
              creditClassId: credits[i]?.classId,
            });
            setCreditSendOpen(i);
          },
        },
        {
          icon: (
            <ArrowDownIcon
              sx={arrowSx}
              color={theme.palette.secondary.dark}
              direction="down"
            />
          ),
          label: _(CREDIT_RETIRE_TITLE),
          onClick: () => {
            track<Retire1Event>('retire1', {
              batchDenom: credits[i].denom,
              projectId: credits[i].projectId,
              projectName: credits[i]?.projectName,
              creditClassId: credits[i]?.classId,
            });
            setCreditRetireOpen(i);
          },
        },
      ];

      if (creditBaskets[i] && creditBaskets[i].length > 0) {
        buttons.splice(1, 0, {
          icon: <PutInBasketIcon />,
          label: _(BASKET_PUT_TITLE),
          onClick: () => {
            track<PutInBasket1Event>('putInBasket1', {
              batchDenom: credits[i].denom,
              projectId: credits[i].projectId,
              creditClassId: credits[i]?.classId,
            });
            setBasketPutOpen(i);
          },
        });
      }

      return <TableActionButtons buttons={buttons} />;
    };
  }, [
    _,
    arrowSx,
    canManagePortfolioActions,
    credits,
    creditBaskets,
    hasTradableCredits,
    setBasketPutOpen,
    setCreditRetireOpen,
    setCreditSendOpen,
    setSellOrderCreateOpen,
    theme.palette.secondary.dark,
    track,
  ]);

  const renderBasketActionButtons = useMemo(() => {
    if (!canManagePortfolioActions) return undefined;

    return (i: number) => (
      <TableActionButtons
        buttons={[
          {
            icon: <TakeFromBasketIcon />,
            label: _(BASKET_TAKE_TITLE),
            onClick: () => {
              openTakeModal(i);
            },
          },
        ]}
      />
    );
  }, [_, canManagePortfolioActions, openTakeModal]);

  const permittedBatchDenoms = useMemo(() => {
    if (!canManagePortfolioActions) return [];

    if (!isOrganizationDashboard) {
      return credits
        .filter(credit => Number(credit.balance?.tradableAmount) > 0)
        .map(credit => credit.denom)
        .filter((denom): denom is string => !!denom);
    }

    return credits
      .filter(credit => {
        if (!credit.denom) return false;
        return selectedAccountAddress
          ? credit.balance?.address === selectedAccountAddress
          : true;
      })
      .filter(credit => Number(credit.balance?.tradableAmount) > 0)
      .map(credit => credit.denom)
      .filter((denom): denom is string => !!denom);
  }, [
    canManagePortfolioActions,
    credits,
    isOrganizationDashboard,
    selectedAccountAddress,
  ]);

  const sellOrderBatchOptions = useMemo(() => {
    if (!canManagePortfolioActions || sellOrderCreateOpen < 0) return [];

    const primaryDenom = credits[sellOrderCreateOpen]?.denom;
    const additionalDenoms = getOtherSellOrderBatchDenomOptions({
      credits,
      sellOrderCreateOpen,
    }).map(option => option.value);

    return [primaryDenom, ...additionalDenoms]
      .filter((value): value is string => !!value)
      .filter((value, index, array) => array.indexOf(value) === index)
      .filter(value => permittedBatchDenoms.includes(value))
      .map(value => ({ label: value, value }));
  }, [
    canManagePortfolioActions,
    credits,
    permittedBatchDenoms,
    sellOrderCreateOpen,
  ]);

  if (creditRetireOpen > -1) {
    lastRetiredProjectIdRef.current = credits[creditRetireOpen]?.projectId;
  }
  const shareUrl =
    REGEN_APP_PROJECT_URL + (lastRetiredProjectIdRef.current ?? '');

  const canCreateFiatOrder = useMemo(() => {
    return (
      !!privActiveAccount?.can_use_stripe_connect &&
      !!activeAccount?.stripeConnectedAccountId &&
      !loginDisabled
    );
  }, [
    activeAccount?.stripeConnectedAccountId,
    loginDisabled,
    privActiveAccount?.can_use_stripe_connect,
  ]);
  const allowedDenomOptions = useAllowedDenomOptions(canCreateFiatOrder);

  return (
    <>
      <WithLoader
        isLoading={isLoadingCredits}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Portfolio
          credits={credits}
          retirements={retirements}
          basketTokens={basketTokens}
          onTableChange={setPaginationParams}
          onRetirementTableChange={retirementsSetPaginationParams}
          initialPaginationParams={paginationParams}
          retirementsPaginationParams={retirementsPaginationParams}
          activePortfolioTab={activePortfolioTab}
          isIgnoreOffset
          renderCreditActionButtons={renderCreditActionButtons}
          renderBasketActionButtons={renderBasketActionButtons}
        />
      </WithLoader>
      {canManagePortfolioActions && creditSendOpen > -1 && !!accountAddress && (
        <CreditSendModal
          title={_(CREDIT_SEND_TITLE)}
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
      {canManagePortfolioActions && basketPutOpen > -1 && (
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
          batchDenoms={[credits[basketPutOpen].denom]}
          open={basketPutOpen > -1}
          onClose={() => setBasketPutOpen(-1)}
          onSubmit={basketPutSubmit}
          batchLabel={_(BATCH_LABEL)}
          batchDescription={BATCH_DESCRIPTION}
          basketLabel={_(BASKET_LABEL)}
          amountLabel={_(AMOUNT_LABEL)}
          submitLabel={_(BASKET_PUT_SUBMIT_LABEL)}
          submitErrorText={_(SUBMIT_ERROR_TEXT)}
          title={_(BASKET_PUT_SUBMIT_LABEL)}
          maxLabel={_(MAX_LABEL)}
          availableLabel={_(AVAILABLE_LABEL)}
          requiredMessage={_(REQUIRED_MESSAGE)}
          invalidAmount={_(INVALID_AMOUNT)}
          insufficientCredits={_(INSUFFICIENT_CREDITS)}
          invalidDecimalCount={_(INVALID_DECIMAL_COUNT)}
        />
      )}
      {canManagePortfolioActions &&
        creditRetireOpen > -1 &&
        !!accountAddress && (
          <CreditRetireModal
            batchDenom={credits[creditRetireOpen].denom}
            availableTradableAmount={Number(
              credits[creditRetireOpen].balance?.tradableAmount,
            )}
            mapboxToken={mapboxToken}
            open={creditRetireOpen > -1}
            onClose={() => setCreditRetireOpen(-1)}
            onSubmit={creditRetireSubmit}
            retirementInfoText={_(RETIREMENT_INFO_TEXT)}
          />
        )}
      {canManagePortfolioActions &&
        !!basketTakeTokens?.basket &&
        !!accountAddress && (
          <BasketTakeModal
            title={_(BASKET_TAKE_TITLE)}
            subtitle={_(BASKET_TAKE_SUBTITLE)}
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
            amountLabel={_(AMOUNT_LABEL)}
            amountErrorText={_(BASKET_TAKE_AMOUNT_ERROR_TEXT)}
            retireOnTakeLabel={_(RETIRE_ON_TAKE_LABEL)}
            retireOnTakeTooltip={_(RETIRE_ON_TAKE_TOOLTIP)}
            submitLabel={_(BASKET_TAKE_SUBMIT_LABEL)}
            submitErrorText={_(SUBMIT_ERROR_TEXT)}
            retirementInfoText={_(RETIREMENT_INFO_TEXT)}
            bottomTextMapping={bottomFieldsTextMapping}
            stateProvinceErrorText={_(STATE_PROVINCE_ERROR_TEXT)}
            maxLabel={_(MAX_LABEL)}
            availableLabel={_(AVAILABLE_LABEL)}
            requiredMessage={_(REQUIRED_MESSAGE)}
            invalidAmount={_(INVALID_AMOUNT)}
            insufficientCredits={_(INSUFFICIENT_CREDITS)}
            invalidDecimalCount={_(INVALID_DECIMAL_COUNT)}
            invalidMemoLength={_(INVALID_MEMO_LENGTH)}
          />
        )}
      {canManagePortfolioActions &&
        sellOrderCreateOpen > -1 &&
        !!accountAddress &&
        sellOrderBatchOptions.length > 0 && (
          <CreateSellOrderModal
            batchDenoms={sellOrderBatchOptions}
            allowedDenoms={allowedDenomOptions}
            sellDenom={'REGEN'}
            availableAmountByBatch={getAvailableAmountByBatch({
              credits: credits.filter(credit =>
                permittedBatchDenoms.includes(credit.denom ?? ''),
              ),
            })}
            open={true}
            onClose={() => setSellOrderCreateOpen(-1)}
            onSubmit={createSellOrderSubmit}
            title={_(CREATE_SELL_ORDER_TITLE)}
            canCreateFiatOrder={canCreateFiatOrder}
          />
        )}
      {canManagePortfolioActions && (
        <ProcessingModal
          open={!deliverTxResponse && isProcessingModalOpen}
          onClose={() => setIsProcessingModalOpen(false)}
          title={_(PROCESSING_MODAL_TITLE)}
          bodyText={_(PROCESSING_MODAL_BODY)}
        />
      )}
      {canManagePortfolioActions &&
        !error &&
        txHash &&
        cardItems &&
        (txModalTitle || txModalHeader) && (
          <TxSuccessfulModal
            seeMoreText={_(SEE_MORE)}
            seeLessText={_(SEE_LESS)}
            open={!error && (!!txModalTitle || !!deliverTxResponse)}
            onClose={handleTxModalClose}
            txHash={txHash ?? ''}
            txHashUrl={txHashUrl}
            title={txModalHeader ?? _(TX_SUCCESSFUL_MODAL_TITLE)}
            cardTitle={txModalTitle ?? ''}
            buttonTitle={txButtonTitle ?? _(TX_MODAL_TITLE)}
            cardItems={cardItems}
            linkComponent={Link}
            onButtonClick={onButtonClick}
            socialItems={getSocialItems({
              twitter: {
                text: SOCIAL_TWITTER_TEXT_MAPPING[txModalHeader ?? ''],
                url: shareUrl,
              },
              linkedIn: { url: shareUrl },
            })}
            shareTitle={_(SHARE_TITLE)}
            blockchainRecordText={_(BLOCKCHAIN_RECORD)}
          />
        )}
      {canManagePortfolioActions && (
        <TxErrorModal
          seeMoreText={_(SEE_MORE)}
          seeLessText={_(SEE_LESS)}
          error={error ?? ''}
          open={!!error}
          onClose={handleTxModalClose}
          txHash={txHash || ''}
          txHashUrl={txHashUrl}
          cardTitle={txModalTitle ?? ''}
          buttonTitle={_(ERROR_BUTTON)}
          linkComponent={Link}
          onButtonClick={onButtonClick}
          title={_(TX_ERROR_MODAL_TITLE)}
          blockchainRecordText={_(BLOCKCHAIN_RECORD)}
        />
      )}
    </>
  );
};
