import { useLingui } from '@lingui/react';
import { useSetAtom } from 'jotai';

import {
  DaoByAddressQuery,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';
import { UseStateSetter } from 'types/react/use-state';
import { bannerTextAtom } from 'lib/atoms/banner.atoms';

import {
  BaseMemberRole,
  Member,
  MemberData,
  RoleOption,
} from './BaseMembersTable.types';
import { MEMBER_REMOVED_BANNER } from './modals/constants';
import { InviteMemberModal } from './modals/InviteMemberModal';
import { PersonalProfileSchemaType } from './modals/modals.schema';
import PersonalProfileModal from './modals/ProfileModal';
import RemoveMemberModal from './modals/RemoveMemberModal';

type ModalsProps<T> = {
  showInviteModal: boolean;
  setShowInviteModal: UseStateSetter<boolean>;
  showRemoveModal: boolean;
  setShowRemoveModal: UseStateSetter<boolean>;
  onAddMember: (data: MemberData<T>) => Promise<void>;
  memberToRemove: string | null;
  setMemberToRemove: UseStateSetter<string | null>;
  onRemove: (id: string) => Promise<void>;
  showPersonalProfileModal: boolean;
  setShowPersonalProfileModal: UseStateSetter<boolean>;
  accounts?: GetAccountsByNameOrAddrQuery | null;
  setDebouncedValue: UseStateSetter<string>;
  onSaveProfile: (data: PersonalProfileSchemaType) => Promise<void>;
  onUpload: (imageFile: File) => Promise<{ url: string }>;
  daoWithAddress?: DaoByAddressQuery['daoByAddress'];
  currentMember: Member;
  isOrg?: boolean;
  roleOptions: RoleOption[];
};

export const Modals = <T extends BaseMemberRole>({
  showInviteModal,
  setShowInviteModal,
  showRemoveModal,
  setShowRemoveModal,
  onAddMember,
  memberToRemove,
  setMemberToRemove,
  onRemove,
  showPersonalProfileModal,
  setShowPersonalProfileModal,
  onSaveProfile,
  accounts,
  setDebouncedValue,
  onUpload,
  daoWithAddress,
  currentMember,
  isOrg = true,
  roleOptions,
}: ModalsProps<T>) => {
  const setBannerText = useSetAtom(bannerTextAtom);
  const { _ } = useLingui();

  return (
    <>
      <InviteMemberModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={(data: MemberData<T>) => {
          if (onAddMember) onAddMember(data);
          setShowInviteModal(false);
        }}
        accounts={accounts}
        setDebouncedValue={setDebouncedValue}
        daoWithAddress={daoWithAddress}
        isOrg={isOrg}
        roleOptions={roleOptions}
      />
      <RemoveMemberModal
        open={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setMemberToRemove(null);
        }}
        onConfirm={async () => {
          if (memberToRemove) {
            await onRemove(memberToRemove);
            setBannerText(_(MEMBER_REMOVED_BANNER));
          }
          setShowRemoveModal(false);
          setMemberToRemove(null);
        }}
      />
      <PersonalProfileModal
        open={showPersonalProfileModal}
        onClose={() => setShowPersonalProfileModal(false)}
        initialName={currentMember?.name || ''}
        initialAvatar={currentMember?.avatar}
        initialDescription={undefined}
        initialTitle={currentMember?.title}
        onSave={async data => {
          await onSaveProfile(data);
          setShowPersonalProfileModal(false);
        }}
        onUploadAvatar={onUpload}
      />
    </>
  );
};
