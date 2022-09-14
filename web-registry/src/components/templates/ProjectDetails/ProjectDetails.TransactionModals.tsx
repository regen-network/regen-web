import React, { useState } from 'react';
import { Modal } from '@mui/material';

import BuyFooter from 'web-components/lib/components/fixed-footer/BuyFooter';
import { ProcessingModal } from 'web-components/lib/components/modal/ProcessingModal';

import { useWallet } from '../../../lib/wallet';
import {
  BuyCreditsModal,
  ConfirmationModal,
  CreditsPurchaseForm,
} from '../../organisms';
import { API_URI, IMAGE_STORAGE_BASE_URL } from './ProjectDetails.config';

interface InputProps {
  testProject: any;
  projectId: string | undefined;
  metadata: any;
  creditDenom: string;
}

export function TransactionModals({
  testProject,
  projectId,
  metadata,
  creditDenom,
}: InputProps): JSX.Element {
  const walletContext = useWallet();

  const [isCreditsPurchaseModalOpen, setIsCreditsPurchaseModalOpen] =
    useState(false);
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleProcessingModalClose = (): void => {
    if (walletContext?.txResult?.transactionHash) {
      setIsConfirmationModalOpen(true);
    }
    setIsProcessingModalOpen(false);
  };

  const handleConfirmationModalClose = (): void => {
    setIsProcessingModalOpen(false);
    setIsConfirmationModalOpen(false);
    walletContext.setTxResult(undefined);
  };

  const handleTxQueued = (txBytes: Uint8Array): void => {
    setIsProcessingModalOpen(true);
    if (walletContext?.broadcast) {
      walletContext.broadcast(txBytes);
    }
  };

  return (
    <>
      {testProject.creditPrice && testProject.stripePrice && (
        <Modal
          open={isCreditsPurchaseModalOpen}
          onClose={() => setIsCreditsPurchaseModalOpen(false)}
        >
          <CreditsPurchaseForm
            onClose={() => setIsCreditsPurchaseModalOpen(false)}
            creditPrice={testProject.creditPrice}
            stripePrice={testProject.stripePrice}
          />
        </Modal>
      )}

      {projectId && metadata && creditDenom && testProject.creditPrice && (
        <>
          <BuyCreditsModal
            open={isBuyCreditsModalOpen}
            onClose={() => setIsBuyCreditsModalOpen(false)}
            onTxQueued={txRaw => handleTxQueued(txRaw)}
            project={{
              id: projectId as string,
              name: metadata?.['schema:name'],
              image: metadata?.['regen:previewPhoto']['@value'],
              creditDenom,
              credits: testProject.credits,
            }}
            imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
            apiServerUrl={API_URI}
          />
          <ProcessingModal
            open={
              !walletContext?.txResult?.transactionHash && isProcessingModalOpen
            }
            onClose={handleProcessingModalClose}
          />
          <ConfirmationModal
            open={
              !!isConfirmationModalOpen ||
              !!walletContext?.txResult?.transactionHash
            }
            onClose={handleConfirmationModalClose}
            data={walletContext.txResult}
          />
        </>
      )}

      {testProject.creditPrice && (
        <BuyFooter
          onClick={() => setIsBuyCreditsModalOpen(true)}
          creditPrice={testProject.creditPrice}
        />
      )}
    </>
  );
}
