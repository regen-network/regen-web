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
        <div className="text-sm sm:text-base pr-5 pt-10 sm:pt-0 flex flex-col items-end sm:flex-row sm:items-start">
          <span>
            <span className="font-bold font-['Lato'] mr-5">
              {creditsAvailable}
            </span>
            credits available
          </span>
          <span className="flex">
            <span className="px-[4px]">in</span>
            <DenomIconWithCurrency currency={currency} className="pt-[2px]" />
          </span>
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
