import { UseFormRegister } from 'react-hook-form';
import { cryptoOptions } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';

import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { Title } from 'web-components/src/components/typography/Title';

export function CryptoOptions({
  cryptoPurchaseOption,
  handleCryptoPurchaseOptions,
  register,
}: {
  cryptoPurchaseOption: string;
  handleCryptoPurchaseOptions: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  register: UseFormRegister<any>;
}) {
  return (
    <div>
      <Title variant="h2" className="text-lg font-black">
        Crypto purchase options
      </Title>
      <p className="font-['Lato'] text-base m-0 text-grey-500 pb-[12px]">
        Credits purchased with crypto can be purchased in either a retired or
        tradable state.
      </p>
      <RadioGroup className="gap-10">
        {cryptoOptions.map(({ label, description, linkTo }) => (
          <Radio
            {...(register('cryptoPurchaseOption'),
            {
              value: label,
            })}
            onChange={handleCryptoPurchaseOptions}
            selectedValue={cryptoPurchaseOption}
            key={label}
            label={
              <span className="block text-base font-bold font-['Lato']">
                {label}
              </span>
            }
            description={
              <p className="text-black text-sm font-normal font-['Lato'] my-0">
                {description}
                <a
                  href={linkTo}
                  target="_blank"
                  className="pl-10 hover:opacity-80"
                  rel="noreferrer"
                >
                  Learn more »
                </a>
              </p>
            }
          />
        ))}
      </RadioGroup>
    </div>
  );
}
