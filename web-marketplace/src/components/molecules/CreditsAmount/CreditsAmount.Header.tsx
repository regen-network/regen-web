import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { SetMaxButton } from 'web-components/src/components/buttons/SetMaxButton';
import { Title } from 'web-components/src/components/typography/Title';

import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';

import {
  SET_MAX_CREDITS_ARIA_LABEL,
  SET_MAX_CREDITS_BUTTON_TEXT,
} from './CreditsAmount.constants';

export function CreditsAmountHeader({
  creditsAvailable,
  setMaxCreditsSelected,
  displayDenom,
  baseDenom,
}: {
  creditsAvailable: number;
  setMaxCreditsSelected: (value: boolean) => void;
  baseDenom: string;
  displayDenom: string;
}) {
  const { _ } = useLingui();

  const { clearErrors } = useFormContext<ChooseCreditsFormSchemaType>();
  return (
    <div className="flex justify-between items-center my-15 sm:mt-30">
      <Title variant="h2" className="text-lg font-black">
        <Trans>Amount</Trans>
      </Title>
      <div className="flex flex-grow justify-end items-center font-sans text-base">
        <div className="text-sm sm:text-base pr-5 flex flex-col items-end sm:flex-row sm:items-center h-[55px]">
          <span
            className={`${
              displayDenom === USD_DENOM.toUpperCase()
                ? 'pt-[19px] sm:pt-0'
                : 'pt-[7px] sm:pt-0'
            }`}
          >
            <span className="font-bold font-sans mr-5">{creditsAvailable}</span>
            <Trans>credits available</Trans>
          </span>
          {displayDenom !== USD_DENOM.toUpperCase() && (
            <span className="flex sm:items-center">
              <span className="px-[4px]">
                <Trans>in</Trans>
              </span>
              <DenomIconWithCurrency
                displayDenom={displayDenom}
                baseDenom={baseDenom}
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
