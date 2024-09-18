import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Title } from 'web-components/src/components/typography/Title';

import {
  SET_MAX_CREDITS_ARIA_LABEL,
  SET_MAX_CREDITS_BUTTON_TEXT,
} from './CreditsAmount.constants';

export function CreditsAmountHeader({
  creditsAvailable,
  setMaxCreditsSelected,
  currency,
  paymentOption,
}: {
  creditsAvailable: number;
  setMaxCreditsSelected: (value: boolean) => void;
  currency: Currency;
  paymentOption: string;
}) {
  const { _ } = useLingui();
  const cryptoCurrency =
    currency === CURRENCIES.usd ? CURRENCIES.uregen : currency;
  const { clearErrors } = useFormContext<ChooseCreditsFormSchemaType>();
  return (
    <div className="flex justify-between items-center my-15 sm:mt-30">
      <Title variant="h2" className="text-lg font-black">
        <Trans>Amount</Trans>
      </Title>
      <div className="flex flex-grow justify-end items-center font-['Lato'] text-base">
        <div className="text-sm sm:text-base pr-5 flex flex-col items-end sm:flex-row sm:items-center h-[55px]">
          <span
            className={`${
              paymentOption === PAYMENT_OPTIONS.CARD
                ? 'pt-[19px] sm:pt-0'
                : 'pt-[7px] sm:pt-0'
            }`}
          >
            <span className="font-bold font-['Lato'] mr-5">
              {creditsAvailable}
            </span>
            <Trans>credits available</Trans>
          </span>
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <span className="flex sm:items-center">
              <span className="px-[4px]">
                <Trans>in</Trans>
              </span>
              <DenomIconWithCurrency
                currency={cryptoCurrency}
                className="sm:pt-5"
              />
            </span>
          )}
        </div>
        <SetMaxButton
          ariaLabel={_(SET_MAX_CREDITS_ARIA_LABEL)}
          buttonText={_(SET_MAX_CREDITS_BUTTON_TEXT)}
          onClick={event => {
            event.preventDefault();
            setMaxCreditsSelected(true);
            clearErrors();
          }}
        />
      </div>
    </div>
  );
}
