export const QUANTITY_MIN_DECIMALS = 0;
export const QUANTITY_MAX_DECIMALS =
  import.meta.env.NODE_ENV === 'production' ? 2 : 6;

export const quantityFormatNumberOptions = {
  minimumFractionDigits: QUANTITY_MIN_DECIMALS,
  maximumFractionDigits: QUANTITY_MAX_DECIMALS,
};
