'use client';

import { useAtom } from 'jotai';

import ErrorBanner from 'web-components/src/components/banner/ErrorBanner';

import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

export const LayoutErrorBannerModal = (): JSX.Element => {
  const [errorText, setErrorBannerTextAtom] = useAtom(errorBannerTextAtom);

  const onClose = (): void => setErrorBannerTextAtom('');

  return <>{errorText && <ErrorBanner text={errorText} onClose={onClose} />}</>;
};
