import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Title, Body } from 'web-components/src/components/typography';
import { INVITE_MEMBERS } from '../CreateOrganization.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { useAuth } from 'lib/auth/auth';
import { useMemo, useState } from 'react';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'pages/Dashboard/Dashboard.constants';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import { getAccountsByNameOrAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountsByNameOrAddr/getAccountsByNameOrAddrQuery';
import { useAtom } from 'jotai';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useUpdateMembers } from '../hooks/useUpdateMembers/useUpdateMembers';

const InviteMembersStep = () => {
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const dao = useMemo(
    () =>
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
        dao => !!dao?.organizationByDaoAddress,
      ),
    [activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes],
  );

  const currentUserRole = useMemo(
    () =>
      dao?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountByAccountId?.id === activeAccount?.id,
      )?.roleName,
    [dao, activeAccount],
  ) as BaseMemberRole | undefined;

  const members = useMemo(
    () =>
      (
        dao?.assignmentsByDaoAddress?.nodes?.map(assignment => {
          const acc = assignment?.accountByAccountId;
          return assignment
            ? {
                id: acc?.id,
                name: acc?.name || _(DEFAULT_NAME),
                title: acc?.title,
                avatar: acc?.image || DEFAULT_PROFILE_USER_AVATAR,
                role: assignment?.roleName,
                visible: assignment?.visible,
                address: acc?.addr,
                hasWalletAddress: !!acc?.addr,
                isCurrentUser: acc?.id === activeAccount?.id,
                organization:
                  dao?.organizationByDaoAddress?.name || _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail,
                onChainRoleId: parseInt(assignment?.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao],
  );

  const { addMember, removeMember, updateRole, updateVisibility } =
    useUpdateMembers({
      currentUserRole,
      daoAddress: dao?.address,
      daoRbamAddress: dao?.daoRbamAddress,
      cw4GroupAddress: dao?.cw4GroupAddress,
      members,
    });

  const [debouncedValue, setDebouncedValue] = useState('');
  const { data: accounts } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!debouncedValue,
      input: debouncedValue,
      languageCode: selectedLanguage,
    }),
  );

  return (
    <div className="text-center">
      <Title variant="h3">{_(INVITE_MEMBERS)}</Title>
      <Body className="pt-20 pb-40">
        <Trans>
          Organization members have permissions for all projects associated with
          an organization. You can also skip this step and invite members later.
        </Trans>
      </Body>
      {members && (
        <OrganizationMembersInviteTable
          members={members}
          onToggleSort={function (): void {
            throw new Error('Function not implemented.');
          }}
          onUpdateRole={updateRole}
          onUpdateVisibility={updateVisibility}
          onRemove={removeMember}
          setDebouncedValue={setDebouncedValue}
          accounts={accounts}
          onAddMember={addMember}
          onSaveProfile={async () => {}} // TODO
        />
      )}
    </div>
  );
};
export default InviteMembersStep;
