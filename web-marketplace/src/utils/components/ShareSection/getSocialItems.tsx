import LinkedInBadgeIcon from 'web-components/src/components/icons/social/LinkedInBadgeIcon';
import TwitterBadgeIcon from 'web-components/src/components/icons/social/TwitterBadgeIcon';
import { SocialItems } from 'web-components/src/components/share-section/ShareSection.types';

import { REGEN_APP_URL } from './getSocialItems.constants';

type Params = {
  twitter: { text: string; url?: string };
  linkedIn?: { url: string };
};

export const getSocialItems = ({
  twitter,
  linkedIn = { url: REGEN_APP_URL },
}: Params): SocialItems => {
  const twitterUrl = twitter.url ?? REGEN_APP_URL;

  return [
    {
      Icon: TwitterBadgeIcon,
      name: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        twitter.text,
      )}&url=${encodeURI(twitterUrl)}`,
    },
    {
      Icon: LinkedInBadgeIcon,
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(
        linkedIn.url,
      )}`,
    },
  ];
};
