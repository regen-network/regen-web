import { apiUri } from 'lib/apiUri';
import { GoogleLoginEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

export const useSocialProviders = (createProject: boolean = false) => {
  const { track } = useTracker();
  return [
    {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      name: 'Google',
      imageUrl: '/png/google.png',
      onClick: async () => {
        await track<GoogleLoginEvent>('loginGoogle', {
          date: new Date().toUTCString(),
        });
        window.location.href = `${apiUri}/marketplace/v1/auth/google${
          createProject ? '?route=project-pages/draft/basic-info' : ''
        }`;
      },
    },
  ];
};
