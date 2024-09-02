import { CreditDetails } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export const getCurrencyPrice = (
  currency: Currency,
  creditDetails: CreditDetails[],
) => {
  return (
    creditDetails.find(credit => credit.currency === currency)?.creditPrice || 1
  );
};

export const getCreditsAvailablePerCurrency = (
  currency: Currency,
  creditDetails: CreditDetails[],
) => {
  return (
    creditDetails.find(credit => credit.currency === currency)
      ?.availableCredits || 0
  );
};
