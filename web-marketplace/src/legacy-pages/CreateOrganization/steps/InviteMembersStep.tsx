import { Trans } from '@lingui/react/macro';

import { Body } from 'web-components/src/components/typography';

import { useInviteMember } from 'components/organisms/BaseMembersTable/modals/hooks/useInviteMember';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { useMultiStep } from 'components/templates/MultiStepTemplate';
import { useUpdateMembers } from 'hooks/org-members';
import { useMembers } from 'hooks/org-members/useMembers';

import { OrganizationMultiStepData } from '../hooks/useOrganizationFlow';

export const InviteMembersStep = () => {
  const { data } = useMultiStep<OrganizationMultiStepData>();

  const orgAddress = data?.dao?.daoAddress;
  const { dao, members, currentUserRole, daoAccountsOrderBy, toggleSort } =
    useMembers({ orgAddress });

  const { addMember, removeMember, updateRole, updateVisibility } =
    useUpdateMembers({
      currentUserRole,
      daoAddress: dao?.address,
      daoRbamAddress: dao?.daoRbamAddress,
      cw4GroupAddress: dao?.cw4GroupAddress,
      members,
      daoAccountsOrderBy,
      // no feeGranter set since no coin have been transfered to organization yet
    });

  const { setDebouncedValue, accounts, daoData, saveProfile, onUpload } =
    useInviteMember();

  return (
    <div className="text-center">
      <Body className="pb-40">
        <Trans>
          Organization members have permissions for all projects associated with
          an organization. You can also skip this step and invite members later.
        </Trans>
      </Body>
      {members && (
        <OrganizationMembersInviteTable
          members={members}
          onToggleSort={toggleSort}
          onUpdateRole={updateRole}
          onUpdateVisibility={updateVisibility}
          onRemove={removeMember}
          setDebouncedValue={setDebouncedValue}
          accounts={accounts}
          onAddMember={addMember}
          onSaveProfile={saveProfile}
          onUpload={onUpload}
          sortDir={daoAccountsOrderBy}
          daoWithAddress={daoData?.daoByAddress}
          currentDaoAddress={orgAddress}
        />
      )}
    </div>
  );
};
