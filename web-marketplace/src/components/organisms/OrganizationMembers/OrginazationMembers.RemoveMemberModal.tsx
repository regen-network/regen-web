import { useLingui } from '@lingui/react';
import useClickOutside from 'utils/hooks/useClickOutside';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';

import {
  CANCEL_LABEL,
  REMOVE_CONFIRM_LABEL,
  REMOVE_MEMBER_DESCRIPTION,
  REMOVE_MEMBER_TITLE,
} from './OrganizationMembers.constants';

interface RemoveMemberModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

export const RemoveMemberModal = ({
  open,
  onClose,
  onConfirm,
}: RemoveMemberModalProps) => {
  const { _ } = useLingui();
  const modalRef = useClickOutside<HTMLDivElement>(() => onClose());

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-10">
      {/* Overlay */}
      <div className="absolute inset-0 bg-bc-neutral-700/40 backdrop-blur-sm" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="remove-member-title"
        aria-describedby="remove-member-description"
        className="bg-bc-neutral-0 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 px-20 py-40 md:p-50 w-full max-w-[560px] shadow-md shadow-bc-neutral-700/10"
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute top-10 right-5 p-8 bg-transparent border-none cursor-pointer"
        >
          <CloseIcon className="w-6 h-6 text-bc-neutral-500" />
        </button>
        <h4
          id="remove-member-title"
          className="font-muli font-bold text-[20px] md:text-[24px] leading-[1.2] mb-16 md:mb-20 mt-0 mx-auto text-center px-10"
        >
          {_(REMOVE_MEMBER_TITLE)}
        </h4>
        <p
          id="remove-member-description"
          className="font-sans text-sm md:text-base text-bc-neutral-500 mb-30 md:mb-50 text-center px-10 m-0"
        >
          {_(REMOVE_MEMBER_DESCRIPTION)}
        </p>
        <div className="flex flex-col-reverse md:flex-row md:justify-end gap-12 md:gap-40 mt-0 md:mt-10">
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-sm font-bold text-bc-neutral-400 font-muli w-full md:w-auto h-[48px] md:h-auto"
          >
            {_(CANCEL_LABEL)}
          </button>
          <ContainedButton
            onClick={async () => {
              try {
                await onConfirm();
              } finally {
                onClose();
              }
            }}
            className="h-[52px] md:h-[60px] w-full md:w-[238px] text-[16px] md:text-[18px]"
          >
            {_(REMOVE_CONFIRM_LABEL)}
          </ContainedButton>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
