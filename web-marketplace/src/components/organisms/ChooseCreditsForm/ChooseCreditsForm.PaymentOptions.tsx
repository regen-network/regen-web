import { ChangeEvent, useState } from 'react';

import CreditCardIcon from 'web-components/src/components/icons/CreditCardIcon';
import CryptoIcon from 'web-components/src/components/icons/CryptoIcon';

import { PAYMENT_OPTIONS } from './ChooseCreditsForm.constants';
import {
  ChooseCreditButtonProps,
  PaymentOptionsType,
} from './ChooseCreditsForm.types';

function ChooseCreditButton({
  children,
  value,
  isChecked,
  onChange,
}: ChooseCreditButtonProps) {
  return (
    <label
      className={`block w-[138px] rounded-md px-[12px] py-10 font-extrabold cursor-pointer text-xs font-[lato] shadow ${
        isChecked
          ? 'border-brand-300 border-solid border text-brand-300'
          : 'border-grey-300 border-solid border text-grey-500 filter grayscale'
      }`}
    >
      <input
        type="radio"
        name="chooseCredit"
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
      />
      <div className="flex flex-col items-start">{children}</div>
    </label>
  );
}

function ChooseCreditButtonGroup({
  onSelectOption,
}: {
  onSelectOption: (option: PaymentOptionsType) => void;
}) {
  const [selectedButton, setSelectedButton] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CARD,
  );

  const handleButtonClick = (e: ChangeEvent<HTMLInputElement>) => {
    const paymentType = e.target.value as PaymentOptionsType;
    setSelectedButton(paymentType);
    onSelectOption(paymentType);
  };

  return (
    <div className="flex space-x-4 gap-10">
      <ChooseCreditButton
        value={PAYMENT_OPTIONS.CARD}
        isChecked={selectedButton === PAYMENT_OPTIONS.CARD}
        onChange={handleButtonClick}
      >
        <CreditCardIcon />
        <div className="lowercase≈">
          <span className="capitalize">buy</span> with credit card
        </div>
      </ChooseCreditButton>
      <ChooseCreditButton
        value={PAYMENT_OPTIONS.CRYPTO}
        isChecked={selectedButton === PAYMENT_OPTIONS.CRYPTO}
        onChange={handleButtonClick}
      >
        <CryptoIcon />
        <div className="lowercase">
          <span className="capitalize">buy</span> with crypto
        </div>
      </ChooseCreditButton>
    </div>
  );
}

export const PaymentOptions = ({
  setPaymentOption,
}: {
  setPaymentOption: (option: PaymentOptionsType) => void;
}) => {
  return <ChooseCreditButtonGroup onSelectOption={setPaymentOption} />;
};
