import { getCurrencyPrice } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.utils';

import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { CreditDetails } from './ChooseCreditsForm.types';

export function getSpendingCap(
  currency: Currency,
  creditsDetails: CreditDetails[],
) {
  return (
    getCurrencyPrice(currency, creditsDetails) *
    creditsDetails.find(item => item.currency === currency)!.availableCredits
  );
}
