import { useLingui } from '@lingui/react';

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-bc-neutral-0 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 px-20 py-50 md:p-50 w-[360px] md:w-[560px] md:h-[318px]">
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute top-10 right-5 p-8 bg-transparent border-none cursor-pointer"
        >
          <CloseIcon className="w-6 h-6 text-bc-neutral-500" />
        </button>
        <h4 className="font-muli font-bold text-[24px] leading-[1.2] mb-20 mt-0 mx-auto text-center">
          {_(REMOVE_MEMBER_TITLE)}
        </h4>
        <p className="font-sans text-lg text-bc-neutral-500 mb-50 text-center px-10 m-0">
          {_(REMOVE_MEMBER_DESCRIPTION)}
        </p>
        <div className="flex justify-end gap-40">
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer text-sm font-bold text-bc-neutral-400"
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
            className="h-[60px] w-[238px] text-[18px]"
          >
            {_(REMOVE_CONFIRM_LABEL)}
          </ContainedButton>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;
