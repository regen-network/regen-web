import { ChangeEvent, useState } from 'react';
import { i18n } from '@lingui/core';
import { msg, Trans } from '@lingui/macro';

import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { TextButton } from 'web-components/src/components/buttons/TextButton';

interface MakeAnonymousProps {
  value: string;
  onChange: (isAnonymous: string) => void;
  name?: string;
  ariaLabel?: string;
  className?: string;
}

export const MakeAnonymous = ({
  value,
  onChange,
  name = '',
  ariaLabel = i18n._(msg`Make Anonymous select`),
  className = '',
}: MakeAnonymousProps) => {
  const [editable, setEditable] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(value);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setIsAnonymous(e.target.value);
  };

  const handleOnUpdate = () => {
    onChange(isAnonymous);
    toggleEditable();
  };

  return (
    <>
      {editable ? (
        <div
          className={`w-full flex justify-between [@media(max-width:340px)]:flex-col [@media(max-width:340px)]:mb-20 sm:flex-row items-center [@media(max-width:340px)]:items-start h-[47px] ${className}`}
        >
          <select
            className="w-[120px] py-10 px-10 border border-gray-300 text-base font-normal font-['Lato'] flex items-center"
            value={isAnonymous}
            onChange={handleOnChange}
            aria-label={ariaLabel}
            name={name}
            autoFocus
          >
            <option value={i18n._(msg`Yes`)}>
              <Trans>Yes</Trans>
            </option>
            <option value={i18n._(msg`No`)}>
              <Trans>No</Trans>
            </option>
          </select>
          <TextButton
            className="lowercase text-[12px] mt-5 sm:mt-0"
            onClick={handleOnUpdate}
            aria-label="update"
          >
            <Trans>update</Trans>
          </TextButton>
        </div>
      ) : (
        <div className="w-fullflex justify-between h-[47px] items-center">
          <span>{isAnonymous}</span>
          <EditButtonIcon
            onClick={toggleEditable}
            ariaLabel={i18n._(msg`Edit`)}
          />
        </div>
      )}
    </>
  );
};
