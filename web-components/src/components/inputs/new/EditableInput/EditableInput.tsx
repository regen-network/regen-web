import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { TextButton } from 'web-components/src/components/buttons/TextButton';

interface EditableInputProps {
  value: number;
  onChange: (amount: number) => void;
  name?: string;
  inputAriaLabel: string;
  editButtonAriaLabel: string;
  updateButtonText: string;
  className?: string;
}

export const EditableInput = ({
  value,
  onChange,
  name = '',
  inputAriaLabel,
  editButtonAriaLabel,
  updateButtonText,
  className = '',
}: EditableInputProps) => {
  const [editable, setEditable] = useState(false);
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    if (!editable && value !== amount) setAmount(value);
  }, [amount, value, editable]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (isNaN(+e.target.value)) return;
    setAmount(+e.target.value);
  };

  const handleOnUpdate = () => {
    onChange(+amount);
    toggleEditable();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isNaN(+e.currentTarget.value)) return;
      setAmount(+e.currentTarget.value);
      handleOnUpdate();
    }
  };

  return (
    <>
      {editable ? (
        <div
          className={`flex [@media(max-width:340px)]:flex-col [@media(max-width:340px)]:mb-20 sm:flex-row items-center [@media(max-width:340px)]:items-start h-[47px] ${className}`}
        >
          <input
            pattern="[0-9]*"
            maxLength={6}
            className="min-w-60 max-w-[80px] h-30 py-20 px-10 border border-gray-300 text-base font-normal font-['Lato']"
            type="text"
            value={amount}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            aria-label={inputAriaLabel}
            name={name}
            autoFocus
          />
          <TextButton
            className="lowercase text-[12px] mt-5 sm:mt-0 font-sans"
            onClick={handleOnUpdate}
            aria-label={updateButtonText}
          >
            {updateButtonText}
          </TextButton>
        </div>
      ) : (
        <div className="flex justify-between h-[47px] items-center">
          <span>{amount}</span>
          <EditButtonIcon
            onClick={toggleEditable}
            ariaLabel={editButtonAriaLabel}
          />
        </div>
      )}
    </>
  );
};
