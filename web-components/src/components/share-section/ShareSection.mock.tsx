/* eslint-disable lingui/no-unlocalized-strings */
import LinkedInBadgeIcon from '../icons/social/LinkedInBadgeIcon';
import TwitterBadgeIcon from '../icons/social/TwitterBadgeIcon';
import { SocialItems } from './ShareSection.types';

export const SocialItemsMock: SocialItems = [
  {
    Icon: TwitterBadgeIcon,
    name: 'Twitter',
    href: 'https://twitter.com/intent/tweet?text=How%20to%20share%20a%20Tweet&url=https%3A%2F%2Fhelp.twitter.com%2Fen%2Fusing-twitter%2Fshare-a-tweet',
  },
  {
    Icon: LinkedInBadgeIcon,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F10713542%2Fhow-to-make-custom-linkedin-share-button%2F10737122',
  },
];
