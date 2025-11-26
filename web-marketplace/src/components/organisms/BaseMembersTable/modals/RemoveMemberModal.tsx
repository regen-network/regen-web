import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Modal from 'web-components/src/components/modal';
import { Title } from 'web-components/src/components/typography/Title';

import {
  CANCEL_LABEL,
  REMOVE_CONFIRM_LABEL,
  REMOVE_MEMBER_DESCRIPTION,
  REMOVE_MEMBER_TITLE,
} from './constants';

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

  return (
    <Modal open={open} onClose={onClose}>
      <Title
        variant="h4"
        id="remove-member-title"
        className="mb-16 md:mb-20 mt-0 mx-auto text-center px-10"
      >
        {_(REMOVE_MEMBER_TITLE)}
      </Title>
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
    </Modal>
  );
};

export default RemoveMemberModal;
