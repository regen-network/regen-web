import { ChangeEvent, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { useAtomValue } from 'jotai';

import CreditCardIcon from 'web-components/src/components/icons/CreditCardIcon';
import CryptoRegenIcon from 'web-components/src/components/icons/CryptoRegenIcon';

import { BuyBaseEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';

import { paymentOptionAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';

interface ChooseCreditButtonProps {
  children: ReactNode;
  value: string;
  isChecked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function ChooseCreditButton({
  children,
  value,
  isChecked,
  disabled,
  onChange,
}: ChooseCreditButtonProps) {
  return (
    <label
      className={`block w-[138px] rounded-md px-[12px] py-10 font-extrabold text-xs font-[lato] shadow border-solid ${
        disabled
          ? 'border-grey-300 border-2 bg-grey-200 !text-grey-400'
          : isChecked
          ? 'border-brand-300 text-brand-300 border-2 hover:cursor-default'
          : 'border-grey-300 border text-grey-500 filter grayscale hover:bg-grey-200 hover:cursor-pointer'
      }`}
    >
      <input
        type="radio"
        name="chooseCredit"
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="hidden"
        disabled={disabled}
        data-testid={`choose-credit-${value}`}
      />
      <div className="flex flex-col items-start">{children}</div>
    </label>
  );
}

type Props = {
  handlePaymentOptions: (option: PaymentOptionsType) => void;
  cardDisabled: boolean;
  isConnected: boolean;
  setupWalletModal: () => void;
  project?: ProjectWithOrderData;
};
export const PaymentOptions = ({
  handlePaymentOptions,
  cardDisabled,
  isConnected,
  setupWalletModal,
  project,
}: Props) => {
  const paymentOption = useAtomValue(paymentOptionAtom);
  const { track } = useTracker();
  const location = useLocation();

  const handleButtonClick = (e: ChangeEvent<HTMLInputElement>) => {
    const paymentType = e.target.value as PaymentOptionsType;
    if (paymentType === PAYMENT_OPTIONS.CRYPTO && !isConnected) {
      setupWalletModal();
    } else {
      track<BuyBaseEvent>(`buy${paymentType}`, {
        url: location.pathname,
        projectName: project?.name,
        projectId: project?.id,
        creditClassId: project?.creditClassId,
      });
      handlePaymentOptions(paymentType);
    }
  };

  return (
    <div className="flex gap-15">
      <ChooseCreditButton
        value={PAYMENT_OPTIONS.CARD}
        isChecked={paymentOption === PAYMENT_OPTIONS.CARD}
        onChange={handleButtonClick}
        disabled={cardDisabled}
      >
        <CreditCardIcon
          className={cardDisabled ? 'text-grey-300' : 'text-inherit'}
        />
        <div>
          <Trans>Buy with credit card</Trans>
        </div>
      </ChooseCreditButton>
      <ChooseCreditButton
        value={PAYMENT_OPTIONS.CRYPTO}
        isChecked={paymentOption === PAYMENT_OPTIONS.CRYPTO}
        onChange={handleButtonClick}
      >
        <CryptoRegenIcon />
        <div>
          <Trans>Buy with crypto</Trans>
        </div>
      </ChooseCreditButton>
    </div>
  );
};
