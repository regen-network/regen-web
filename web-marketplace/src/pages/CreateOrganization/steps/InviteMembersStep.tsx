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
import { useUpdateMembers } from 'hooks/org-members';
import { useSaveProfile } from '../hooks/useSaveProfile';
import { AccountsOrderBy } from 'generated/graphql';
import { getAccountByIdQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery';

export const InviteMembersStep = () => {
  const { _ } = useLingui();
  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);

  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const { data, refetch } = useQuery(
    getAccountByIdQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!activeAccountId,
      id: activeAccountId,
      daoAccountsOrderBy,
      languageCode: selectedLanguage,
    }),
  );
  const activeAccount = useMemo(() => data?.accountById, [data]);

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
        assignment => assignment?.accountId === activeAccount?.id,
      )?.roleName,
    [dao, activeAccount],
  ) as BaseMemberRole | undefined;

  const members = useMemo(
    () =>
      (
        dao?.accountsByAssignmentDaoAddressAndAccountId?.nodes?.map(acc => {
          const assignment = dao?.assignmentsByDaoAddress?.nodes?.find(
            assignment => acc?.id === assignment?.accountId,
          );
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
      daoAccountsOrderBy,
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

  const { saveProfile, onUpload } = useSaveProfile(daoAccountsOrderBy);

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
          onToggleSort={() =>
            setDaoAccountsOrderBy(prev =>
              prev === AccountsOrderBy.NameAsc
                ? AccountsOrderBy.NameDesc
                : AccountsOrderBy.NameAsc,
            )
          }
          onUpdateRole={updateRole}
          onUpdateVisibility={updateVisibility}
          onRemove={removeMember}
          setDebouncedValue={setDebouncedValue}
          accounts={accounts}
          onAddMember={addMember}
          onSaveProfile={saveProfile}
          onUpload={onUpload}
          sortDir={daoAccountsOrderBy}
        />
      )}
    </div>
  );
};
