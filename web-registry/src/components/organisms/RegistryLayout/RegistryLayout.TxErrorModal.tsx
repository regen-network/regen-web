import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { findFirstNonEmptyString } from 'utils/string/findFirstNonEmptyString';

import { TxErrorModal } from 'web-components/lib/components/modal/TxErrorModal';

import { getHashUrl } from 'lib/block-explorer';
import { useGlobalStore } from 'lib/context/globalContext';

import { Link } from 'components/atoms';

import { useResetTxModalError } from './hooks/useResetTxModalError';
import { TX_ERROR_MODAL_BUTTON } from './RegistryLayout.constants';

export const RegistryLayoutTxErrorModal = (): JSX.Element => {
  const [errorCode, setGlobalStore] = useGlobalStore(
    store => store['errorCode'],
  );
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
  ] = useGlobalStore(store => store['errorModal']);
  const errorEnum = findErrorByCodeEnum({ errorCode });
  const error = errorsMapping[errorEnum];
  const ErrorIcon = error.icon;
  const resetTxModalError = useResetTxModalError({ setGlobalStore });
  const txHashUrl = getHashUrl(txHash);

  return (
    <>
      <TxErrorModal
        error={txError}
        open={!!errorCode}
        onClose={resetTxModalError}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={findFirstNonEmptyString([title, error.title])}
        description={findFirstNonEmptyString([description, error.description])}
        cardTitle={cardTitle}
        linkComponent={Link}
        onButtonClick={resetTxModalError}
        buttonTitle={findFirstNonEmptyString([
          buttonTitle,
          error.buttonTitle,
          TX_ERROR_MODAL_BUTTON,
        ])}
        buttonLink={findFirstNonEmptyString([buttonLink, error.buttonLink])}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100, color: 'grey.600' }} />}
      />
    </>
  );
};
