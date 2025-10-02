import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Title, Body } from 'web-components/src/components/typography';
import { INVITE_MEMBERS } from '../CreateOrganization.constants';
import { OrganizationMembers } from 'components/organisms/OrganizationMembers/OrganizationMembers';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';

export const InviteMembersStep = () => {
  const { _ } = useLingui();
  return (
    <div className="text-center">
      <Title>{_(INVITE_MEMBERS)}</Title>
      <Body>
        <Trans>
          Organization members have permissions for all projects associated with
          an organization. You can also skip this step and invite members later.
        </Trans>
      </Body>
      <OrganizationMembers
        members={[]}
        onInvite={function (): void {
          throw new Error('Function not implemented.');
        }}
        onToggleSort={function (): void {
          throw new Error('Function not implemented.');
        }}
        onUpdateRole={function (id: string, role: BaseMemberRole): void {
          throw new Error('Function not implemented.');
        }}
        onUpdateVisibility={function (id: string, visible: boolean): void {
          throw new Error('Function not implemented.');
        }}
        onRemove={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};
