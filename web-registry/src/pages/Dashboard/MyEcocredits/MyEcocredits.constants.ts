import LinkedInBadgeIcon from 'web-components/lib/components/icons/social/LinkedInBadgeIcon';
import TwitterBadgeIcon from 'web-components/lib/components/icons/social/TwitterBadgeIcon';
import { SocialItems } from 'web-components/lib/components/share-section/ShareSection.types';

export const CREATE_SELL_ORDER_HEADER = 'Your sell order was created!';
export const RETIRE_HEADER = 'Your retirement was successful!';
export const PUT_HEADER = 'Your put action was successful!';
export const SEND_HEADER = 'Your send action was successful!';
export const TAKE_HEADER = 'Your take action was successful!';
export const CREATE_SELL_ORDER_TITLE = 'Create Sell Order';
export const CREATE_SELL_ORDER_SHORT = 'Sell';
export const CREATE_SELL_ORDER_BUTTON = 'VIEW ALL SELL ORDERS';
export const ERROR_BUTTON = 'VIEW YOUR PORTFOLIO';

export const RETIRE_SOCIAL_ITEMS: SocialItems = [
  {
    Icon: TwitterBadgeIcon,
    name: 'Twitter',
    href: 'https://twitter.com/intent/tweet?text=I+just+offset+my+carbon+footprint+on+%23RegenMarketplace+with+%40regen_network.+Join+me+in+doing+our+part+for+planetary+regeneration%21&url=https%3A%2F%2Fapp.regen.network%2F',
  },
  {
    Icon: LinkedInBadgeIcon,
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fapp.regen.network%2F',
  },
];

export const SOCIAL_ITEMS_MAPPING: Record<string, SocialItems> = {
  [RETIRE_HEADER]: RETIRE_SOCIAL_ITEMS,
};
