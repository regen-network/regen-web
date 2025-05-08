import { useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';
import { errorBannerTextAtom } from 'lib/atoms/error.atoms';

export const useRequestFunds = () => {
  const { _ } = useLingui();
  const setErrorBannerTextAtom = useSetAtom(errorBannerTextAtom);
  const setBannerTextAtom = useSetAtom(bannerTextAtom);
  const [isLoading, setIsLoading] = useState(false);

  const requestFunds = async (address: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://redwood.regen.network/faucet/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        setErrorBannerTextAtom(_(msg`Failed to request funds`));
      }

      await response.json();

      setBannerTextAtom(_(msg`Funds successfully requested!`));
    } catch (error) {
      setErrorBannerTextAtom(_(msg`Failed to request funds`));
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { requestFunds, isLoading };
};
