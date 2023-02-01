import LinkedInBadgeIcon from 'web-components/lib/components/icons/social/LinkedInBadgeIcon';
import TwitterBadgeIcon from 'web-components/lib/components/icons/social/TwitterBadgeIcon';
import { SocialItems } from 'web-components/lib/components/share-section/ShareSection.types';

export const BUY_FLOW_SOCIAL_ITEMS: SocialItems = [
  {
    Icon: TwitterBadgeIcon,
    name: 'Twitter',
    href: 'https://twitter.com/intent/tweet?text=I+just+purchased+carbon+credits+on+%23RegenMarketplace+with+%40regen_network.+Let%27s+work+together+to+reduce+our+carbon+footprint.+Join+me+in+investing+in+a+regenerative+future%21+&url=https%3A%2F%2Fapp.regen.network%2F',
  },
  {
    Icon: LinkedInBadgeIcon,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fapp.regen.network%2F',
  },
];
