import { useEffect } from 'react';

import { DEFAULT_DURATION } from 'web-components/src/components/banner/ErrorBanner';

import { UseStateSetter } from 'types/react/use-state';

type Props = {
  displayErrorBanner: boolean;
  setDisplayErrorBanner: UseStateSetter<boolean>;
};

// eslint-disable-next-line
export const useResetErrorBanner = ({
  displayErrorBanner,
  setDisplayErrorBanner,
}: Props) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayErrorBanner) {
      timeout = setTimeout(
        () => setDisplayErrorBanner(false),
        DEFAULT_DURATION - 1000,
      );
    }

    return () => clearTimeout(timeout);
  }, [displayErrorBanner, setDisplayErrorBanner]);
};
