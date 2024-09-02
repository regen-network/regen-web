import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { Link } from 'web-marketplace/src/components/atoms';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';

import { ChooseCreditsFormSchemaType } from './ChooseCreditsForm.schema';

export function AdvanceSettings({
  advanceSettingsOpen,
  toggleAdvancedSettings,
  creditVintages,
  handleCreditVintageOptions,
}: {
  advanceSettingsOpen: boolean;
  toggleAdvancedSettings: (e: React.MouseEvent<HTMLElement>) => void;
  creditVintages: { date: string; credits: string; batchDenom: string }[];
  handleCreditVintageOptions: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { register } = useFormContext<ChooseCreditsFormSchemaType>();
  return (
    <div className="grid grid-rows-1 mt-20 sm:mt-40">
      <div className="flex flex-col">
        <TextButton
          className="w-[193px] text-xs font-['Muli'] text-green-400 font-extrabold uppercase text-brand-400 self-start bg-transparent border-none p-0 text-left"
          textSize="sm"
          onClick={toggleAdvancedSettings}
        >
          <span className="text-base w-10 inline-block mr-5">
            {advanceSettingsOpen ? '-' : '+'}
          </span>
          <Trans>Advanced settings</Trans>
        </TextButton>
        {advanceSettingsOpen && (
          <div
            className={`${
              advanceSettingsOpen ? 'max-h-[400px] sm:max-h-[350px]' : 'max-h-0'
            } flex flex-grow justify-end items-center font-['Lato'] text-base flex-col mt-4 overflow-hidden transition-all duration-500 ease-in-out max-h-0`}
          >
            <p className="self-start text-sm ">
              <Trans>Choose specific credit vintages</Trans>{' '}
              <span className="italic">
                (
                <Trans>
                  by default the cheapest credit vintage will be purchased first
                </Trans>
                )
              </span>
            </p>
            {creditVintages.map(({ date, credits, batchDenom }) => (
              <div
                key={date}
                className="h-auto flex flex-col items-start w-full p-15 border border-solid border-grey-300 mb-10 rounded-md"
              >
                <CheckboxLabel
                  label={date}
                  {...(register(`creditVintageOptions`),
                  {
                    value: date,
                  })}
                  onChange={handleCreditVintageOptions}
                />
                <p className="pl-[32px] m-0 mt-5 text-sm">
                  <span className="italic">
                    {credits} <Trans>credits available</Trans>
                  </span>
                  <span className="px-[4px]">|</span>
                  <Link
                    target="_blank"
                    href={`/credit-batches/${batchDenom}`}
                    className="text-brand-300 uppercase bg-transparent border-none font-bold hover:opacity-80 text-xs"
                  >
                    <Trans>view batch</Trans> »
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
