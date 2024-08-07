import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { Title } from 'web-components/src/components/typography/Title';

export function CreditsAmountHeader({
  creditsAvailable,
  setMaxCreditsSelected,
  currency,
}: {
  creditsAvailable: number;
  setMaxCreditsSelected: (value: boolean) => void;
  currency: Currency;
}) {
  return (
    <div className="flex justify-between items-center">
      <Title variant="h2" className="text-lg font-black">
        Amount
      </Title>
      <div className="flex flex-grow justify-end items-center font-['Lato'] text-base">
        <p className="text-sm sm:text-base pr-5 flex">
          <span className="font-bold font-['Lato'] mr-5">
            {creditsAvailable}
          </span>
          <span className="pr-5">credits available in</span>
          <DenomIconWithCurrency currency={currency} />
        </p>
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
