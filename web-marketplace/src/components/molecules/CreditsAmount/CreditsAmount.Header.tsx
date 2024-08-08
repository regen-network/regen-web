import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Title } from 'web-components/src/components/typography/Title';

import { PAYMENT_OPTIONS } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';

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
  return (
    <div className="flex justify-between items-center my-15 sm:mt-30">
      <Title variant="h2" className="text-lg font-black">
        Amount
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
            credits available
          </span>
          {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
            <span className="flex sm:items-center">
              <span className="px-[4px]">in</span>
              <DenomIconWithCurrency currency={currency} className="sm:pt-10" />
            </span>
          )}
        </div>
        <SetMaxButton
          onClick={event => {
            event.preventDefault();
            setMaxCreditsSelected(true);
          }}
        />
      </div>
    </div>
  );
}
