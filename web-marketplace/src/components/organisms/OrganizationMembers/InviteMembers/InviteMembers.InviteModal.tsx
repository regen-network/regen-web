import { useRef, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { useLingui } from '@lingui/react';
import useClickOutside from 'utils/hooks/useClickOutside';
import { z } from 'zod';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import { BaseMemberRole } from '../../BaseMembersTable/BaseMembersTable.types';
import {
  ADD_MEMBER_LABEL,
  ADMIN_EDITOR_RULE,
  CANCEL_LABEL,
  CHOOSE_A_ROLE_FOR_THIS_USER,
  CHOOSE_ROLE_HELP,
  EMAIL_OR_ADDRESS_LABEL,
  ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER,
  INVALID_EMAIL_ERROR,
  INVALID_REGEN_ADDRESS_ERROR,
  INVITE_LABEL,
  REGEN_ADDRESS_LABEL,
  REGEN_ADDRESS_REQUIRED_ERROR,
  ROLE_LABEL,
  VISIBLE_DESCRIPTION,
  VISIBLE_QUESTION,
} from '../OrganizationMembers.constants';
import { MemberRoleDropdown } from '../OrganizationMembers.RoleDropdown';
import { InviteMemberModalProps } from '../OrganizationMembers.types';
import { VisibilitySwitch } from '../OrganizationMembers.VisibilitySwitch';
import {
  getDisplayValue,
  getValidationError,
  isValidAddressOrEmail,
} from './InviteMembers.utils';

const inviteSchema = z.object({
  role: z.enum(['owner', 'admin', 'editor', 'viewer']).optional(),
  addressOrEmail: z.string().min(1),
  visible: z.boolean().default(true),
});

export const InviteMemberModal = ({
  open,
  onClose,
  onSubmit,
  accounts,
  setDebouncedValue,
}: InviteMemberModalProps) => {
  const { _ } = useLingui();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const blurTimeoutRef = useRef<number | undefined>();

  const form = useZodForm<typeof inviteSchema, typeof inviteSchema>({
    schema: inviteSchema,
    defaultValues: { role: undefined, addressOrEmail: '', visible: true },
    mode: 'onChange',
  });
  const { control, setValue, reset, watch } = form;
  const { errors } = useFormState({ control });
  const role = watch('role');
  const addressOrEmail = watch('addressOrEmail');
  const visible = watch('visible');

  const modalRef = useClickOutside<HTMLDivElement>(event => {
    const target = event.target as HTMLElement;
    if (target.closest('ul.absolute') || target.closest('li.cursor-pointer'))
      return;
    if (isInputFocused) return;
    resetFields();
    onClose();
  });

  const accountSuggestions =
    accounts?.getAccountsByNameOrAddr?.nodes?.slice(0, 8) || [];

  const resetFields = () => {
    reset({ role: undefined, addressOrEmail: '', visible: true });
    setIsInputFocused(false);
  };

  if (!open) return null;

  const disabledInvite =
    !role ||
    !(addressOrEmail || '').trim() ||
    !isValidAddressOrEmail(addressOrEmail || '', role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-bc-neutral-700/40 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="bg-bc-neutral-0 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 px-20 py-50 md:p-50 w-[360px] md:w-[560px] md:h-auto shadow-md shadow-bc-neutral-700/10"
      >
        <Form
          form={form}
          className="flex flex-col"
          onSubmit={v => {
            onSubmit({
              role: v.role as BaseMemberRole | undefined,
              addressOrEmail: v.addressOrEmail,
              visible: v.visible,
            });
            resetFields();
            onClose();
          }}
        >
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
          <Title variant="h4" className="mb-30 md:mb-45 mx-auto">
            {_(ADD_MEMBER_LABEL)}
          </Title>

          {/* Role Section */}
          <div className="flex flex-col mb-45">
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
              onChange={r => setValue('role', r, { shouldDirty: true })}
              currentUserRole={role as BaseMemberRole}
              placeholder={_(CHOOSE_ROLE_HELP)}
              height="h-[50px] md:h-[60px]"
              fullWidth={true}
            />
          </div>

          {/* Address / Email Section */}
          <div className="flex flex-col mb-45 relative">
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
            <TextField
              type="text"
              label=""
              value={getDisplayValue(addressOrEmail || '')}
              placeholder={_(ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER)}
              helperText={(() => {
                const err = getValidationError(
                  addressOrEmail || '',
                  role,
                  REGEN_ADDRESS_REQUIRED_ERROR,
                  INVALID_EMAIL_ERROR,
                  INVALID_REGEN_ADDRESS_ERROR,
                );
                return (
                  err || (errors.addressOrEmail?.message as string | undefined)
                );
              })()}
              error={
                !!getValidationError(
                  addressOrEmail || '',
                  role,
                  REGEN_ADDRESS_REQUIRED_ERROR,
                  INVALID_EMAIL_ERROR,
                  INVALID_REGEN_ADDRESS_ERROR,
                )
              }
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
                setValue('addressOrEmail', e.target.value, {
                  shouldDirty: true,
                });
                if (setDebouncedValue) setDebouncedValue(e.target.value);
              }}
              InputProps={{ className: 'h-[50px] md:h-[60px]' }}
            />
            {getValidationError(
              addressOrEmail || '',
              role,
              REGEN_ADDRESS_REQUIRED_ERROR,
              INVALID_EMAIL_ERROR,
              INVALID_REGEN_ADDRESS_ERROR,
            ) && (
              <div className="text-bc-red-500 text-sm font-bold font-sans mt-2">
                {getValidationError(
                  addressOrEmail || '',
                  role,
                  REGEN_ADDRESS_REQUIRED_ERROR,
                  INVALID_EMAIL_ERROR,
                  INVALID_REGEN_ADDRESS_ERROR,
                )}
              </div>
            )}
            {isInputFocused &&
              (addressOrEmail || '') &&
              !addressOrEmail.includes('(') &&
              accountSuggestions.length > 0 && (
                <ul className="absolute top-[100px]  md:top-[83px] left-0 w-full z-10 min-h-[84px] bg-bc-neutral-0 border-[1px] border-solid border-bc-neutral-300 pl-0 rounded shadow-lg overflow-hidden">
                  {accountSuggestions.map(acc => (
                    <li
                      key={acc?.id}
                      onMouseDown={() => {
                        if (acc?.addr && acc?.name) {
                          setValue(
                            'addressOrEmail',
                            `${acc.name} (${acc.addr})`,
                            {
                              shouldDirty: true,
                            },
                          );
                        } else if (acc?.addr) {
                          setValue('addressOrEmail', acc.addr, {
                            shouldDirty: true,
                          });
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
          <div className="flex flex-col mb-45">
            <span className="font-bold text-md md:text-lg mb-6">
              {_(VISIBLE_QUESTION)}
            </span>
            <span className="text-sm text-bc-neutral-500 mb-10">
              {_(VISIBLE_DESCRIPTION)}
            </span>
            <div className="flex items-center gap-12">
              <VisibilitySwitch
                checked={visible}
                onChange={(v: boolean) =>
                  setValue('visible', v, { shouldDirty: true })
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-0 flex justify-end gap-40">
            <button
              onClick={() => {
                resetFields();
                onClose();
              }}
              className="font-muli bg-transparent border-none cursor-pointer text-sm font-bold text-bc-neutral-400"
            >
              {_(CANCEL_LABEL)}
            </button>
            <ContainedButton
              disabled={disabledInvite}
              type="submit"
              className="h-[53px] w-[138px] text-[18px]"
            >
              {_(INVITE_LABEL)}
            </ContainedButton>
          </div>
        </Form>
      </div>
    </div>
  );
};
