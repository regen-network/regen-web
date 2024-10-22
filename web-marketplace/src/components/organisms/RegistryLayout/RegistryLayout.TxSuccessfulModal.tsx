import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { txSuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  SEE_LESS,
  SEE_MORE,
  TX_MODAL_TITLE,
  TX_SUCCESSFUL_MODAL_TITLE,
} from 'lib/constants/shared.constants';

import { Link } from 'components/atoms';

export const RegistryLayoutTxSuccessfulModal = (): JSX.Element => {
  const { _ } = useLingui();
  const location = useLocation();

  const [
    {
      cardItems,
      title,
      cardTitle,
      open,
      txHash,
      buttonTitle,
      buttonLink,
      keepOpenOnLocationChange,
    },
    setTxSuccessfulModalAtom,
  ] = useAtom(txSuccessfulModalAtom);
  const onClose = useCallback(
    (): void => setTxSuccessfulModalAtom(atom => void (atom.open = false)),
    [setTxSuccessfulModalAtom],
  );

  const txHashUrl = getHashUrl(txHash);

  useEffect(() => {
    if (!keepOpenOnLocationChange) onClose();
    // onClose();
  }, [keepOpenOnLocationChange, location, onClose]);

  return (
    <TxSuccessfulModal
      seeMoreText={_(SEE_MORE)}
      seeLessText={_(SEE_LESS)}
      open={!!open}
      cardItems={cardItems}
      title={title ?? _(TX_SUCCESSFUL_MODAL_TITLE)}
      cardTitle={cardTitle ?? ''}
      buttonTitle={buttonTitle ?? _(TX_MODAL_TITLE)}
      buttonLink={buttonLink}
      onClose={onClose}
      txHash={txHash ?? ''}
      txHashUrl={txHashUrl}
      linkComponent={Link}
      onButtonClick={onClose}
      blockchainRecordText={_(BLOCKCHAIN_RECORD)}
    />
  );
};
