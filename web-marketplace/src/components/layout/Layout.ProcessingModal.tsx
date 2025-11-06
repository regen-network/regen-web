'use client';

import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';

import { processingModalAtom } from 'lib/atoms/modals.atoms';
import {
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
} from 'lib/constants/shared.constants';

export const LayoutProcessingModal = (): JSX.Element => {
  const { _ } = useLingui();
  const [{ open }, setProcessingModalAtom] = useAtom(processingModalAtom);

  const onClose = (): void =>
    setProcessingModalAtom(atom => void (atom.open = false));

  return (
    <ProcessingModal
      open={!!open}
      onClose={onClose}
      title={_(PROCESSING_MODAL_TITLE)}
      bodyText={_(PROCESSING_MODAL_BODY)}
    />
  );
};
