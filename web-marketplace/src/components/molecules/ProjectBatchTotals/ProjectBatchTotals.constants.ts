import { msg } from '@lingui/core/macro';
import { quantityFormatNumberOptions } from 'config/decimals';

export const ISSUED_CREDITS_TOOLTIP = msg`The total amount of credits that were issued to this project.`;
export const REGISTERED_CREDITS_TOOLTIP = msg`The total amount of credits that were registered to this project.`;
export const ESCROWED_CREDITS_TOOLTIP = msg`Includes escrowed credits.`;
export const TRADEABLE_CREDITS_TOOLTIP = msg`Tradable credits have not yet been retired and can be held, sold, or sent to another party.`;
export const RETIRED_CREDITS_TOOLTIP = msg`Retired credits have been taken out of circulation permanently and cannot be sold to anyone else.`;
export const FOR_SALE_CREDITS_TOOLTIP = msg`Credits currently available for purchase with fiat or cryptocurrency on Regen Marketplace.`;
export const SOLD_OUT = msg`Sold Out`;
export const MAX_FRACTION_DIGITS_PROJECT_CREDITS = 0;

export const formatNumberOptions = {
  minimumFractionDigits: quantityFormatNumberOptions.minimumFractionDigits,
  maximumFractionDigits: MAX_FRACTION_DIGITS_PROJECT_CREDITS,
};
