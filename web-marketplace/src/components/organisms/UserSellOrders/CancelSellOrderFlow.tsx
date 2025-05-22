import { ReactElement } from 'react';
import { useLingui } from '@lingui/react';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';

import { ConfirmModal } from 'web-components/src/components/modal/ConfirmModal';
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

import { Link } from 'components/atoms';
import { useCancelSellOrder } from 'hooks/useCancelSellOrder';

interface CancelSellOrderFlowProps {
  normalizedSellOrders: any[];
  refetchSellOrders: () => void;
  onOpenCancelModal?: (openFunc: (index: number) => void) => void;
}

export const CancelSellOrderFlow = ({
  normalizedSellOrders,
  refetchSellOrders,
  onOpenCancelModal,
}: CancelSellOrderFlowProps): ReactElement => {
  const { _ } = useLingui();
  const {
    openCancelModal,
    getCancelModalProps,
    getProcessingModalProps,
    getSuccessModalProps,
    getErrorModalProps,
    deliverTxResponse,
    error,
  } = useCancelSellOrder({
    normalizedSellOrders,
    refetchSellOrders,
  });

  // Expose the openCancelModal function to parent component
  if (onOpenCancelModal) {
    onOpenCancelModal(openCancelModal);
  }

  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const errorEnum = findErrorByCodeEnum({ errorCode: error });
  const ErrorIcon = error ? errorsMapping[errorEnum].icon : undefined;

  return (
    <>
      <ConfirmModal {...getCancelModalProps()} linkComponent={Link} />
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
    </>
  );
};
