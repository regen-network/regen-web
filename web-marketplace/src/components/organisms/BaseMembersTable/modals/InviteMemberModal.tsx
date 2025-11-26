import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-hook-form';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import Modal from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { UseStateSetter } from 'web-components/src/types/react/useState';
import { truncate } from 'web-components/src/utils/truncate';

import {
  DaoByAddressQuery,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';

import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';
import { BaseRoleDropdown } from 'components/organisms/BaseRoleDropdown/BaseRoleDropdown';
import { VisibilitySwitch } from 'components/organisms/OrganizationMembers/OrganizationMembers.VisibilitySwitch';
import { useDaoOrganization } from 'hooks/useDaoOrganization';
import { useDebounce } from 'hooks/useDebounce';

import {
  BaseMemberRole,
  MemberData,
  RoleOption,
} from '../BaseMembersTable.types';
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
} from './constants';
import { getInviteSchema } from './modals.schema';

interface InviteMemberModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MemberData<T>) => void;
  accounts?: GetAccountsByNameOrAddrQuery | null;
  setDebouncedValue: UseStateSetter<string>;
  daoWithAddress?: DaoByAddressQuery['daoByAddress'];
  isOrg?: boolean;
  roleOptions: RoleOption[];
}

export const InviteMemberModal = <T extends BaseMemberRole>({
  open,
  onClose,
  onSubmit,
  accounts,
  setDebouncedValue,
  daoWithAddress,
  isOrg = true,
  roleOptions,
}: InviteMemberModalProps<T>) => {
  const { _ } = useLingui();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const blurTimeoutRef = useRef<number | undefined>();
  const currentDaoOrganization = useDaoOrganization();

  const form = useZodForm({
    schema: getInviteSchema(_, isOrg),
    defaultValues: { role: undefined, addressOrEmail: '', visible: true },
    mode: 'onChange',
  });
  const { control, setValue, reset, watch, register, setError } = form;
  const { isSubmitting, errors, isValid } = useFormState({ control });
  const role = watch('role');
  const addressOrEmail = watch('addressOrEmail');
  const visible = watch('visible');

  const accountSuggestions =
    accounts?.getAccountsByNameOrAddr?.nodes?.slice(0, 8) || [];

  const resetFields = () => {
    reset({ role: undefined, addressOrEmail: '', visible: true });
    setIsInputFocused(false);
  };

  const addressOrEmailDebouncedValue = useDebounce(addressOrEmail);
  useEffect(
    () => setDebouncedValue(addressOrEmailDebouncedValue),
    [addressOrEmailDebouncedValue, setDebouncedValue],
  );

  const [addressOrEmailDisplayValue, setAddressOrEmailDisplayValue] =
    useState('');

  useEffect(() => {
    if (daoWithAddress) {
      setError('addressOrEmail', {
        message: _(msg`You cannot add a DAO to an organization`),
      });
    }
  }, [daoWithAddress, setError, _]);

  useEffect(() => {
    const accs = accounts?.getAccountsByNameOrAddr?.nodes || [];
    if (accs.length === 1) {
      const acc = accs[0];
      // Check only assignment within an organization
      const dao = acc?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
        dao => !!dao?.organizationByDaoAddress,
      );
      if (dao && currentDaoOrganization) {
        // provided address already belongs to the current organization
        if (dao.address === currentDaoOrganization.address) {
          setError('addressOrEmail', {
            message: _(msg`This user is already a member of the organization`),
          });
        } else {
          // provided address belongs to a different organization
          setError('addressOrEmail', {
            message: _(
              msg`This member already belongs to another organization.`,
            ),
          });
        }
      }
    }
  }, [accounts, currentDaoOrganization, setError, _]);

  return (
    <Modal
      open={open}
      onClose={() => {
        resetFields();
        onClose();
      }}
    >
      <Form
        form={form}
        className="flex flex-col"
        onSubmit={v => {
          onSubmit({
            role: v.role,
            addressOrEmail: v.addressOrEmail,
            visible: v.visible,
          });
          resetFields();
          onClose();
        }}
      >
        <header>
          <Title variant="h4" className="mb-30 md:mb-45 text-center">
            {_(ADD_MEMBER_LABEL)}
          </Title>
        </header>

        {/* Role Section */}
        <section>
          <div className="flex flex-col mb-45">
            <span className="font-bold text-md md:text-lg mb-6">
              {_(ROLE_LABEL)}
            </span>
            <span className="text-sm md:text-md text-bc-neutral-500 mb-5">
              {_(CHOOSE_A_ROLE_FOR_THIS_USER)}
            </span>
            <BaseRoleDropdown
              role={role}
              disabled={false}
              hasWalletAddress={true}
              onChange={r =>
                setValue('role', r, { shouldDirty: true, shouldValidate: true })
              }
              currentUserRole={role}
              placeholder={_(CHOOSE_ROLE_HELP)}
              height="h-[50px] md:h-[60px]"
              fullWidth={true}
              roleOptions={roleOptions}
            />
          </div>

          {/* Address / Email Section */}
          <div className="flex flex-col mb-0">
            {/* Reserve 45px below the field so helper text sits within that space, avoiding layout jump */}
            <div className="relative pb-[45px]">
              {/* Hidden real value that will be submitted */}
              <input type="hidden" {...register('addressOrEmail')} />

              <TextField
                type="text"
                label={_(
                  role === 'admin' || role === 'editor'
                    ? REGEN_ADDRESS_LABEL
                    : EMAIL_OR_ADDRESS_LABEL,
                )}
                description={_(ADMIN_EDITOR_RULE)}
                labelClassName="font-bold text-md md:text-lg"
                value={addressOrEmailDisplayValue}
                placeholder={_(ENTER_EMAIL_OR_ADDRESS_PLACEHOLDER)}
                helperText={errors.addressOrEmail?.message}
                error={!!errors.addressOrEmail}
                onFocus={() => {
                  if (blurTimeoutRef.current)
                    window.clearTimeout(blurTimeoutRef.current);
                  setIsInputFocused(true);
                }}
                InputProps={{ className: 'h-50 md:h-60' }}
                sx={{
                  position: 'relative',
                  '& .MuiFormHelperText-root': {
                    position: 'absolute',
                    top: 'calc(100% + 2px)',
                    left: 5,
                    right: 0,
                    margin: 0,
                    whiteSpace: 'normal',
                  },
                }}
                onChange={e => {
                  setAddressOrEmailDisplayValue(e.target.value);
                  // keep the hidden form value in sync when user types manually
                  setValue('addressOrEmail', e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                onBlur={e => {
                  register('addressOrEmail').onBlur(e);

                  blurTimeoutRef.current = window.setTimeout(
                    () => setIsInputFocused(false),
                    120,
                  );
                }}
              />
              {isInputFocused &&
                !errors.addressOrEmail &&
                (addressOrEmail || '') &&
                !addressOrEmail.includes('(') &&
                accountSuggestions.length > 0 && (
                  <ul className="absolute top-[108px] mt-2 left-0 w-full z-10 min-h-[84px] bg-bc-neutral-0 border-[1px] border-solid border-bc-neutral-300 pl-0 rounded shadow-lg overflow-hidden">
                    {accountSuggestions.map(acc => (
                      <li
                        key={acc?.id}
                        onMouseDown={() => {
                          if (acc?.addr && acc?.name) {
                            // store raw addr/email
                            setValue('addressOrEmail', acc.addr, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            // display truncated
                            setAddressOrEmailDisplayValue(
                              `${acc?.name} (${truncate(acc?.addr)})`,
                            );
                          } else if (acc?.addr) {
                            setValue('addressOrEmail', acc.addr, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setAddressOrEmailDisplayValue(acc.addr);
                          }
                          setIsInputFocused(false);
                        }}
                        className="cursor-pointer hover:bg-bc-neutral-100 p-[20px] flex items-center gap-[10px] min-h-[84px]"
                      >
                        {acc?.image && (
                          <UserAvatar
                            src={acc?.image}
                            alt={acc?.name || acc?.addr || ''}
                            size="medium"
                          />
                        )}
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
          </div>

          {/* Visibility */}
          {isOrg && (
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
          )}
        </section>

        {/* Footer */}
        <footer className="mt-0">
          <CancelButtonFooter
            onCancel={() => {
              resetFields();
              onClose();
            }}
            cancelLabel={_(CANCEL_LABEL)}
            label={_(INVITE_LABEL)}
            disabled={!isValid || isSubmitting || !!errors.addressOrEmail}
            type="submit"
            className="h-[53px] w-[138px] text-[18px]"
          />
        </footer>
      </Form>
    </Modal>
  );
};
