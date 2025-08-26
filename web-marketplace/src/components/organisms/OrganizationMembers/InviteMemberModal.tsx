import { useRef, useState } from 'react';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import { GetAccountsByNameOrAddrQuery } from 'generated/graphql';

import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import {
  ADD_MEMBER_LABEL,
  ADMIN_EDITOR_RULE,
  CANCEL_LABEL,
  CHOOSE_A_ROLE_FOR_THIS_USER,
  CHOOSE_ROLE_HELP,
  EMAIL_OR_ADDRESS_LABEL,
  ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER,
  INVITE_LABEL,
  REGEN_ADDRESS_LABEL,
  ROLE_LABEL,
  VISIBLE_DESCRIPTION,
  VISIBLE_QUESTION,
} from './OrganizationMembers.constants';
import { MemberRoleDropdown } from './OrganizationMembers.RoleDropdown';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';

const REGEN_ADDRESS_REQUIRED_ERROR =
  'You must enter a REGEN address in order to add this user as an Admin or Editor.';
const INVALID_EMAIL_ERROR = 'Invalid email';
const INVALID_REGEN_ADDRESS_ERROR = 'Invalid REGEN address';

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => void;
  accounts?: GetAccountsByNameOrAddrQuery | null;
  setDebouncedValue?: (value: string) => void;
}

export const InviteMemberModal = ({
  open,
  onClose,
  onSubmit,
  accounts,
  setDebouncedValue,
}: InviteMemberModalProps) => {
  const { _ } = useLingui();
  const [role, setRole] = useState<BaseMemberRole | undefined>();
  const [addressOrEmail, setAddressOrEmail] = useState('');
  const [visible, setVisible] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const blurTimeoutRef = useRef<number | undefined>();

  const accountSuggestions =
    accounts?.getAccountsByNameOrAddr?.nodes?.slice(0, 8) || [];

  const shortenAddress = (addr: string): string => {
    if (addr.length <= 15) return addr;
    return `${addr.slice(0, 9)}...${addr.slice(-6)}`;
  };
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidRegenAddress = (address: string): boolean => {
    return (
      address.startsWith('regen1') &&
      address.length >= 39 &&
      address.length <= 45
    );
  };

  const isValidAddressOrEmail = (value: string): boolean => {
    if (!value.trim()) return false;
    const match = value.match(/^(.+)\s\((.+)\)$/);
    if (match) {
      return true;
    }
    if (role === 'admin' || role === 'editor') {
      return isValidRegenAddress(value);
    }

    return isValidEmail(value) || isValidRegenAddress(value);
  };
  const getValidationError = (): string | null => {
    if (!addressOrEmail.trim()) return null;
    const match = addressOrEmail.match(/^(.+)\s\((.+)\)$/);
    if (match) {
      return null;
    }
    if (role === 'admin' || role === 'editor') {
      if (!isValidRegenAddress(addressOrEmail)) {
        return REGEN_ADDRESS_REQUIRED_ERROR;
      }
    } else {
      if (
        !isValidEmail(addressOrEmail) &&
        !isValidRegenAddress(addressOrEmail)
      ) {
        if (addressOrEmail.includes('@')) {
          return INVALID_EMAIL_ERROR;
        } else if (addressOrEmail.startsWith('regen')) {
          return INVALID_REGEN_ADDRESS_ERROR;
        } else {
          return INVALID_EMAIL_ERROR;
        }
      }
    }

    return null;
  };
  const getDisplayValue = (): string => {
    const match = addressOrEmail.match(/^(.+)\s\((.+)\)$/);
    if (match) {
      const [, name, address] = match;
      return `${name} (${shortenAddress(address)})`;
    }
    return addressOrEmail;
  };

  const resetFields = () => {
    setRole(undefined);
    setAddressOrEmail('');
    setVisible(true);
    setIsInputFocused(false);
  };

  if (!open) return null;

  const disabledInvite =
    !role ||
    addressOrEmail.trim() === '' ||
    !isValidAddressOrEmail(addressOrEmail);

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
            hasWalletAddress={true}
            onChange={r => setRole(r)}
            currentUserRole={role as BaseMemberRole}
            placeholder={_(CHOOSE_ROLE_HELP)}
          />
        </div>

        {/* Address / Email Section */}
        <div className="flex flex-col mb-50 relative">
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
            value={getDisplayValue()}
            onFocus={() => {
              if (blurTimeoutRef.current)
                window.clearTimeout(blurTimeoutRef.current);
              setIsInputFocused(true);
            }}
            onBlur={() => {
              blurTimeoutRef.current = window.setTimeout(
                () => setIsInputFocused(false),
                120,
              );
            }}
            onChange={e => {
              setAddressOrEmail(e.target.value);
              if (setDebouncedValue) {
                setDebouncedValue(e.target.value);
              }
            }}
            placeholder={_(ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER)}
            className="w-full h-[50px] border-solid border-[1px] border-bc-neutral-300 rounded px-12 text-sm focus:outline-none p-20"
          />
          {getValidationError() && (
            <div className="text-bc-red-500 text-sm font-bold font-sans mt-2">
              {getValidationError()}
            </div>
          )}
          {isInputFocused &&
            addressOrEmail &&
            !addressOrEmail.includes('(') &&
            accountSuggestions.length > 0 && (
              <ul className="absolute top-[83px] left-0 w-full z-10 min-h-[84px] bg-bc-neutral-0 border-[1px] border-solid border-bc-neutral-300 pl-0 rounded shadow-lg overflow-hidden">
                {accountSuggestions.map(acc => (
                  <li
                    key={acc?.id}
                    onMouseDown={() => {
                      if (acc?.addr && acc?.name) {
                        setAddressOrEmail(`${acc.name} (${acc.addr})`);
                      } else if (acc?.addr) {
                        setAddressOrEmail(acc.addr);
                      }
                      setIsInputFocused(false);
                    }}
                    className="cursor-pointer hover:bg-bc-neutral-100 p-[20px] flex items-center gap-[10px] min-h-[84px]"
                  >
                    <UserAvatar
                      src={acc?.image}
                      alt={acc?.name || acc?.addr || ''}
                      size="medium"
                    />
                    <div className="flex flex-col flex-1 min-w-0 gap-2">
                      <span className="text-md font-medium leading-tight">
                        {acc?.name || acc?.addr}
                      </span>
                      {acc?.name && (
                        <span className="text-sm text-bc-neutral-500 truncate">
                          ({acc?.addr})
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
