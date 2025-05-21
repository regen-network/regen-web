import { useLingui } from '@lingui/react';
import CircularProgress from '@mui/material/CircularProgress';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { safeLazy } from 'utils/safeLazy';

import { TableActionButtons } from 'web-components/src/components/buttons/TableActionButtons';
import { ConfirmModal as CancelConfirmModal } from 'web-components/src/components/modal/ConfirmModal';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  CLOSE_BUTTON_TEXT,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  SEE_LESS,
  SEE_MORE,
  TX_ERROR_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { useNormalizedSellOrders } from 'pages/Marketplace/Storefront/hooks/useNormalizedSellOrders';
import { CANCEL_SELL_ORDER_ACTION } from 'pages/Marketplace/Storefront/Storefront.constants';
import { Link } from 'components/atoms';
import { useCancelSellOrder } from 'hooks/useCancelSellOrder';

import { NoUserSellOrdersCard } from './UserSellOrders.NoOrdersCard';
import { UserSellOrdersToolbar } from './UserSellOrders.Toolbar';

const SellOrdersTable = safeLazy(
  () => import('components/organisms/SellOrdersTable/SellOrdersTable'),
);

export const UserSellOrders = () => {
  const { wallet } = useWallet();
  const { _ } = useLingui();

  const {
    normalizedSellOrders,
    isLoadingSellOrders,
    refetchSellOrders,
    setPaginationParams,
    sortCallbacks,
    totalSellOrders,
    paginationParams,
  } = useNormalizedSellOrders({ sellerAddress: wallet?.address });

  const userSellOrders = normalizedSellOrders?.filter(
    (sellOrder: any) => sellOrder.seller === wallet?.address,
  );

  const {
    openCancelModal,
    getCancelModalProps,
    getProcessingModalProps,
    getSuccessModalProps,
    getErrorModalProps,
    deliverTxResponse,
    error,
  } = useCancelSellOrder({
    normalizedSellOrders: userSellOrders || [],
    refetchSellOrders,
  });

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const errorEnum = findErrorByCodeEnum({ errorCode: error });
  const ErrorIcon = error ? errorsMapping[errorEnum].icon : undefined;

  if (isLoadingSellOrders) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (userSellOrders?.length === 0) {
    return <NoUserSellOrdersCard />;
  }

  return (
    <section className="min-w-full bg-transparent">
      <SellOrdersTable
        sellOrders={userSellOrders}
        sortCallbacks={sortCallbacks}
        onTableChange={setPaginationParams}
        renderActionButtonsFunc={(i: number) => (
          <TableActionButtons
            buttons={[
              {
                label: _(CANCEL_SELL_ORDER_ACTION),
                onClick: () => {
                  openCancelModal(i);
                },
              },
            ]}
            sx={{ width: '100%' }}
          />
        )}
        renderToolbarContentFunc={() => <UserSellOrdersToolbar />}
        totalSellOrders={totalSellOrders}
        paginationParams={paginationParams}
      />
      <CancelConfirmModal {...getCancelModalProps()} linkComponent={Link} />
      <ProcessingModal
        open={getProcessingModalProps().open}
        onClose={getProcessingModalProps().onClose}
        title={_(PROCESSING_MODAL_TITLE)}
        bodyText={_(PROCESSING_MODAL_BODY)}
      />
      <TxSuccessfulModal
        open={!!txHash && !error}
        txHash={deliverTxResponse?.transactionHash || ''}
        txHashUrl={txHashUrl}
        linkComponent={Link}
        onButtonClick={getSuccessModalProps().onClose}
        onClose={getSuccessModalProps().onClose}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
        buttonTitle={
          getSuccessModalProps().txButtonTitle || _(CLOSE_BUTTON_TEXT)
        }
        cardTitle={getSuccessModalProps().txModalTitle}
        title={getSuccessModalProps().txModalHeader}
        cardItems={getSuccessModalProps().cardItems}
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
      />
      <TxErrorModal
        open={!!error}
        error={error || ''}
        txHash={deliverTxResponse?.transactionHash || ''}
        txHashUrl={txHashUrl}
        linkComponent={Link}
        onButtonClick={getErrorModalProps().onClose}
        onClose={getErrorModalProps().onClose}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
        buttonTitle={_(CLOSE_BUTTON_TEXT)}
        cardTitle={getErrorModalProps().txModalTitle}
        title={getErrorModalProps().txModalHeader || _(TX_ERROR_MODAL_TITLE)}
        cardItems={getErrorModalProps().cardItems}
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        icon={ErrorIcon && <ErrorIcon sx={{ fontSize: 100 }} />}
      />
    </section>
  );
};
