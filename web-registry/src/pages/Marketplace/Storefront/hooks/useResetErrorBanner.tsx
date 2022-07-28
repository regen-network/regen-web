import { useEffect } from 'react';

import { DEFAULT_DURATION } from 'web-components/lib/components/banner/ErrorBanner';

import { UseStateSetter } from '../../../../types/react/use-state';

type Props = {
  displayErrorBanner: boolean;
  setDisplayErrorBanner: UseStateSetter<boolean>;
};

export const useResetErrorBanner = ({
  displayErrorBanner,
  setDisplayErrorBanner,
}: Props): void => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayErrorBanner) {
      timeout = setTimeout(
        () => setDisplayErrorBanner(false),
        DEFAULT_DURATION,
      );
    }

    return () => clearTimeout(timeout);
  }, [displayErrorBanner, setDisplayErrorBanner]);
};
