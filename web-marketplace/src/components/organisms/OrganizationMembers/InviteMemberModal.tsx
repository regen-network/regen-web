import { useState } from 'react';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { Title } from 'web-components/src/components/typography';

import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import {
  ADD_MEMBER_LABEL,
  ADMIN_EDITOR_RULE,
  CANCEL_LABEL,
  CHOOSE_A_ROLE_FOR_THIS_USER,
  CHOOSE_ROLE_HELP,
  EMAIL_OR_ADDRESS_LABEL,
  INVITE_LABEL,
  REGEN_ADDRESS_LABEL,
  ROLE_LABEL,
  VISIBLE_DESCRIPTION,
  VISIBLE_QUESTION,
} from './OrganizationMembers.constants';
import { MemberRoleDropdown } from './OrganizationMembers.RoleDropdown';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => void;
}

export const InviteMemberModal = ({
  open,
  onClose,
  onSubmit,
}: InviteMemberModalProps) => {
  const { _ } = useLingui();
  const [role, setRole] = useState<BaseMemberRole | undefined>();
  const [addressOrEmail, setAddressOrEmail] = useState('');
  const [visible, setVisible] = useState(true);

  const resetFields = () => {
    setRole(undefined);
    setAddressOrEmail('');
    setVisible(true);
  };

  if (!open) return null;

  const disabledInvite = !role || addressOrEmail.trim() === '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="  bg-bc-neutral-0 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 px-20 py-50 md:p-50 w-[360px] md:w-[560px] md:h-[733px]">
        <button
          onClick={() => {
            resetFields();
            onClose();
          }}
          aria-label="close"
          className="absolute top-10 right-5 p-8 bg-transparent border-none cursor-pointer"
        >
          <CloseIcon className="w-6 h-6 text-bc-neutral-500" />
        </button>
        <Title variant="h4" className="mb-30 md:mb-50 mx-auto">
          {_(ADD_MEMBER_LABEL)}
        </Title>

        {/* Role Section */}
        <div className="flex flex-col mb-50">
          <span className="font-bold text-md md:text-lg mb-6">
            {_(ROLE_LABEL)}
          </span>
          <span className="text-sm md:text-md text-bc-neutral-500 mb-5">
            {_(CHOOSE_A_ROLE_FOR_THIS_USER)}
          </span>
          <MemberRoleDropdown
            role={role as BaseMemberRole}
            disabled={false}
            hasWalletAddress={true} // ensure all non-owner roles are enabled for selection
            onChange={r => setRole(r)}
            currentUserRole={role as BaseMemberRole}
            placeholder={_(CHOOSE_ROLE_HELP)}
          />
        </div>

        {/* Address / Email Section */}
        <div className="flex flex-col mb-50">
          <span className="font-bold text-md md:text-lg mb-6">
            {_(
              role === 'admin' || role === 'editor'
                ? REGEN_ADDRESS_LABEL
                : EMAIL_OR_ADDRESS_LABEL,
            )}
          </span>
          <span className="text-sm md:text-md text-bc-neutral-500 mb-5">
            {_(ADMIN_EDITOR_RULE)}
          </span>
          <input
            type="text"
            value={addressOrEmail}
            onChange={e => setAddressOrEmail(e.target.value)}
            className="w-full h-[50px] border-solid border-[1px] border-bc-neutral-300 rounded px-12 text-sm focus:outline-none p-20"
          />
        </div>

        {/* Visibility */}
        <div className="flex flex-col mb-50">
          <span className="font-bold text-md md:text-lg mb-6">
            {_(VISIBLE_QUESTION)}
          </span>
          <span className="text-sm text-bc-neutral-500 mb-10">
            {_(VISIBLE_DESCRIPTION)}
          </span>
          <div className="flex items-center gap-12">
            <VisibilitySwitch
              checked={visible}
              onChange={(v: boolean) => setVisible(v)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex justify-end gap-40 pt-20">
          <button
            onClick={() => {
              resetFields();
              onClose();
            }}
            className="bg-transparent border-none cursor-pointer text-sm font-bold text-bc-neutral-400"
          >
            {_(CANCEL_LABEL)}
          </button>
          <ContainedButton
            disabled={disabledInvite}
            onClick={() => {
              onSubmit({ role, addressOrEmail, visible });
              resetFields();
              onClose();
            }}
            className="h-[53px] w-[138px] text-[18px]"
          >
            {_(INVITE_LABEL)}
          </ContainedButton>
        </div>
      </div>
    </div>
  );
};
