import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import { TxBuySuccessfulModal } from 'web-components/src/components/modal/TxBuySuccessfulModal/TxBuySuccessfulModal';

import { txBuySuccessfulModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import {
  BLOCKCHAIN_RECORD,
  SEE_LESS,
  SEE_MORE,
  TX_MODAL_TITLE,
  TX_SUCCESSFUL_MODAL_TITLE,
} from 'lib/constants/shared.constants';

import {
  PURCHASE_SUCCESSFUL,
  VIEW_CERTIFICATE,
} from 'pages/BuyCredits/BuyCredits.constants';
import { Link } from 'components/atoms';

export const RegistryLayoutTxBuySuccessfulModal = (): JSX.Element => {
  const { _ } = useLingui();

  const [
    {
      cardItems,
      title,
      description,
      cardTitle,
      open,
      txHash,
      buttonTitle,
      buttonLink,
      steps,
    },
    setTxBuySuccessfulModalAtom,
  ] = useAtom(txBuySuccessfulModalAtom);
  const onClose = useCallback(
    (): void => setTxBuySuccessfulModalAtom(atom => void (atom.open = false)),
    [setTxBuySuccessfulModalAtom],
  );

  const txHashUrl = getHashUrl(txHash);

  return (
    <TxBuySuccessfulModal
      seeMoreText={_(SEE_MORE)}
      seeLessText={_(SEE_LESS)}
      open={!!open}
      cardItems={cardItems}
      title={title || _(PURCHASE_SUCCESSFUL)}
      cardTitle={cardTitle ?? ''}
      buttonTitle={buttonTitle ?? _(VIEW_CERTIFICATE)}
      buttonLink={buttonLink}
      onClose={onClose}
      txHash={txHash ?? ''}
      txHashUrl={txHashUrl}
      linkComponent={Link}
      onButtonClick={onClose}
      blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      steps={steps}
      description={description}
      bgClassName="bg-[url('/png/topography-pattern-stepper.png')]"
    />
  );
};
