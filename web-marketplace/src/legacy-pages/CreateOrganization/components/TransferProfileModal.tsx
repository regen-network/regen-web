import { useLingui } from '@lingui/react';

import Modal from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import {
  CREATE_ORG_TRANSFER_MODAL_CONFIRM_LABEL,
  CREATE_ORG_TRANSFER_MODAL_DESCRIPTION,
  CREATE_ORG_TRANSFER_MODAL_SECTION_TITLE,
  CREATE_ORG_TRANSFER_MODAL_SKIP_LABEL,
  CREATE_ORG_TRANSFER_MODAL_TITLE,
} from '../CreateOrganization.constants';

type Props = {
  open: boolean;
  onSkip: () => void;
  onTransfer: () => void;
  name: string;
  avatar?: string;
};

export function TransferProfileModal({
  open,
  onSkip,
  onTransfer,
  name,
  avatar,
}: Props) {
  const { _ } = useLingui();
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onSkip}
      className="flex max-h-[90vh] w-[360px] flex-col overflow-y-auto border border-solid border-bc-neutral-300 bg-bc-neutral-100 shadow-md shadow-bc-neutral-700/10 !p-0 md:w-[560px]"
      isFullscreenMobile={false}
      closeIconColor="#6B7280"
    >
      <div className="flex h-full flex-col">
        <header className="flex-shrink-0 px-20 py-40 md:px-40 md:pt-40 md:pb-0">
          <Title variant="h4" className="mb-10 text-center">
            {_(CREATE_ORG_TRANSFER_MODAL_TITLE)}
          </Title>
          <p className="text-center px-10 text-[18px] font-normal text-bc-neutral-500 md:px-40">
            {_(CREATE_ORG_TRANSFER_MODAL_DESCRIPTION)}
          </p>
        </header>

        <div className="flex-1 px-20 md:px-40">
          <div className="flex flex-col rounded-[5px] border border-solid border-bc-neutral-300 bg-bc-neutral-0 px-20 py-30 md:p-40">
            <p className="mt-0 mb-20 text-[18px] font-bold text-bc-neutral-500">
              {_(CREATE_ORG_TRANSFER_MODAL_SECTION_TITLE)}
            </p>
            <div className="flex items-center gap-[15px]">
              <UserAvatar
                src={avatar || ''}
                alt={name}
                size="xl"
                border={false}
                className="!w-[56px] !h-[56px]"
              />
              <span className="text-[16px] font-bold text-bc-neutral-800">
                {name}
              </span>
            </div>
          </div>
        </div>

        <footer className="flex-shrink-0 px-20 py-20 md:px-40 md:py-40">
          <CancelButtonFooter
            onCancel={onSkip}
            cancelLabel={_(CREATE_ORG_TRANSFER_MODAL_SKIP_LABEL)}
            label={_(CREATE_ORG_TRANSFER_MODAL_CONFIRM_LABEL)}
            disabled={false}
            type="button"
            onClick={onTransfer}
            className="h-[53px] w-full text-[16px] md:w-[260px]"
          />
        </footer>
      </div>
    </Modal>
  );
}

export default TransferProfileModal;
