import { apiUri } from 'lib/apiUri';
import { GoogleLoginEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import google from '../../../../../public/png/google.png';

export const useSocialProviders = (redirectRoute?: string) => {
  const { track } = useTracker();
  return [
    {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      name: 'Google',
      imageUrl: google.src,
      onClick: async () => {
        await track<GoogleLoginEvent>('loginGoogle', {
          date: new Date().toUTCString(),
        });
        window.location.href = `${apiUri}/marketplace/v1/auth/google${
          redirectRoute ? `?route=${redirectRoute}` : ''
        }`;
      },
    },
  ];
};
