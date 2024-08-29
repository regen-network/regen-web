import { useLingui } from '@lingui/react';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { useAtom } from 'jotai';
import { findFirstNonEmptyString } from 'utils/string/findFirstNonEmptyString';

import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';

import { errorCodeAtom } from 'lib/atoms/error.atoms';
import { errorModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';

import { useResetTxModalError } from './hooks/useResetTxModalError';
import { TX_ERROR_MODAL_BUTTON } from './RegistryLayout.constants';

export const RegistryLayoutTxErrorModal = (): JSX.Element => {
  const { _ } = useLingui();
  const [
    {
      buttonLink,
      buttonTitle,
      cardItems,
      cardTitle,
      description,
      title,
      txError,
      txHash,
    },
  ] = useAtom(errorModalAtom);
  const [errorCode] = useAtom(errorCodeAtom);
  const errorEnum = findErrorByCodeEnum({ errorCode });
  const error = errorsMapping[errorEnum];
  const ErrorIcon = error.icon;
  const resetTxModalError = useResetTxModalError();
  const txHashUrl = getHashUrl(txHash);

  return (
    <>
      <TxErrorModal
        error={txError ?? ''}
        open={!!errorCode}
        onClose={resetTxModalError}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={findFirstNonEmptyString([title, _(error.title)])}
        description={findFirstNonEmptyString([
          description,
          error.description ? _(error.description) : '',
        ])}
        cardTitle={cardTitle ?? ''}
        linkComponent={Link}
        onButtonClick={resetTxModalError}
        buttonTitle={findFirstNonEmptyString([
          buttonTitle,
          error.buttonTitle ? _(error.buttonTitle) : '',
          _(TX_ERROR_MODAL_BUTTON),
        ])}
        buttonLink={findFirstNonEmptyString([buttonLink, error.buttonLink])}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100, color: 'grey.600' }} />}
      />
    </>
  );
};
