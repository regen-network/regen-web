import {
  CreditDetails,
  CreditsVintages,
} from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

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

export const getVintageCredits = (
  creditVintageOptions: string[],
  creditVintages: CreditsVintages[],
) => {
  return creditVintageOptions.reduce((sum: number, option: string) => {
    const credits =
      creditVintages.find(vintage => vintage.batchDenom === option)?.credits ||
      '0';
    return sum + +credits;
  }, 0);
};
