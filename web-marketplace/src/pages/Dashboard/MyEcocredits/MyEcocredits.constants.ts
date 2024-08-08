import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const CREATE_SELL_ORDER_HEADER = msg`Your sell order was created!`;
export const RETIRE_HEADER = msg`Your retirement was successful!`;
export const PUT_HEADER = msg`Your put action was successful!`;
export const SEND_HEADER = msg`Your send action was successful!`;
export const TAKE_HEADER = msg`Your take action was successful!`;
export const CREATE_SELL_ORDER_TITLE = msg`Create Sell Order`;
export const CREATE_SELL_ORDER_SHORT = msg`Sell`;
export const CREATE_SELL_ORDER_BUTTON = msg`VIEW ALL SELL ORDERS`;
export const RETIRE_SUCCESS_BUTTON = msg`view retirement certificates`;
export const ERROR_BUTTON = msg`VIEW YOUR PORTFOLIO`;
export const BASKET_PUT_TITLE = msg`Put in basket`;

export const RETIRE_TWITTER_TEXT = msg`I just offset my carbon footprint on #RegenMarketplace with @regen_network. Join me in doing our part for planetary regeneration!`;

export const getSocialTwitterTextMapping = (
  _: TranslatorType,
): Record<string, string> => ({
  [_(RETIRE_HEADER)]: _(RETIRE_TWITTER_TEXT),
});
