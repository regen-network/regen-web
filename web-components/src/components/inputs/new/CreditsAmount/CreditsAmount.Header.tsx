import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import {
  PAYMENT_OPTIONS,
  PaymentOptionsType,
} from 'web-components/src/components/form/ChooseCreditsForm/ChooseCreditsForm.types';
import Title from 'web-components/src/components/typography/new/Title';

export function CreditsAmountHeader({
  creditsAvailable,
  paymentOption,
  setMaxCreditsSelected,
}: {
  creditsAvailable: number;
  paymentOption: PaymentOptionsType;
  setMaxCreditsSelected: (value: boolean) => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <Title as="h2" className="text-lg font-black">
        Amount
      </Title>
      <div className="flex flex-grow justify-end items-center font-['Lato'] text-base">
        <p className="text-sm sm:text-base pr-5">
          <span className="font-bold font-['Lato'] mr-5">
            {creditsAvailable}
          </span>
          credits available
        </p>
        {paymentOption === PAYMENT_OPTIONS.CARD && (
          <p className="text-sm sm:text-base hidden sm:flex">
            <span className="hidden sm:inline pr-5">in</span>
            <DenomIconWithCurrency currency={CURRENCIES.usd} />
          </p>
        )}
        <SetMaxButton
          onClick={event => {
            event.preventDefault();
            setMaxCreditsSelected(true);
          }}
        ></SetMaxButton>
      </div>
    </div>
  );
}
