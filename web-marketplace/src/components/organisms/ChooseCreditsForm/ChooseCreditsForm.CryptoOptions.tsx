import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { cryptoOptions } from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.constants';

import { Radio } from 'web-components/src/components/inputs/new/Radio/Radio';
import { RadioGroup } from 'web-components/src/components/inputs/new/RadioGroup/RadioGroup';
import { Title } from 'web-components/src/components/typography/Title';

import { ChooseCreditsFormSchemaType } from './ChooseCreditsForm.schema';

export function CryptoOptions({
  retiring,
  handleCryptoPurchaseOptions,
}: {
  retiring: boolean;
  handleCryptoPurchaseOptions: () => void;
}) {
  const { register } = useFormContext<ChooseCreditsFormSchemaType>();
  return (
    <div>
      <Title variant="h2" className="text-lg font-black">
        <Trans>Crypto purchase options</Trans>
      </Title>
      <p className="font-['Lato'] text-base m-0 text-grey-500 pb-[12px]">
        <Trans>
          Credits purchased with crypto can be purchased in either a retired or
          tradable state.
        </Trans>
      </p>
      <RadioGroup className="gap-10">
        {cryptoOptions.map(({ label, description, linkTo, value }) => (
          <Radio
            {...(register('retiring'),
            {
              value,
            })}
            onChange={handleCryptoPurchaseOptions}
            selectedValue={retiring}
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
                  <Trans>Learn more</Trans> »
                </a>
              </p>
            }
          />
        ))}
      </RadioGroup>
    </div>
  );
}
