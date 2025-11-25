import { useMemo, useState } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import {
  DEFAULT_NAME,
  DEFAULT_PROFILE_USER_AVATAR,
} from 'legacy-pages/Dashboard/Dashboard.constants';

import { Body } from 'web-components/src/components/typography';

import { AccountsOrderBy } from 'generated/graphql';
import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { useAuth } from 'lib/auth/auth';
import { getAccountsByNameOrAddrQuery } from 'lib/queries/react-query/registry-server/graphql/getAccountsByNameOrAddr/getAccountsByNameOrAddrQuery';
import { getDaoByAddressQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressQuery/getDaoByAddressQuery';
import { getDaoByAddressWithAssignmentsQuery } from 'lib/queries/react-query/registry-server/graphql/getDaoByAddressWithAssignmentsQuery/getDaoByAddressWithAssignmentsQuery';

import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { Member } from 'components/organisms/OrganizationMembers/OrganizationMembers.types';
import { useUpdateMembers } from 'hooks/org-members';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

import { useSaveProfile } from '../hooks/useSaveProfile';

export const InviteMembersStep = () => {
  const { _ } = useLingui();
  const [daoAccountsOrderBy, setDaoAccountsOrderBy] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);
  const { activeAccountId } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const daoOrganization = useDaoOrganization();

  const { data } = useQuery(
    getDaoByAddressWithAssignmentsQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!daoOrganization?.address,
      address: daoOrganization?.address as string,
      daoAccountsOrderBy,
    }),
  );

  const dao = data?.daoByAddress;

  const currentUserRole = useMemo(
    () =>
      dao?.assignmentsByDaoAddress?.nodes?.find(
        assignment => assignment?.accountId === activeAccountId,
      )?.roleName,
    [dao, activeAccountId],
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
                isCurrentUser: acc?.id === activeAccountId,
                organization:
                  daoOrganization?.organizationByDaoAddress?.name ||
                  _(DEFAULT_NAME),
                email:
                  acc?.privateAccountById?.email ||
                  acc?.privateAccountById?.googleEmail,
                onChainRoleId: parseInt(assignment?.onChainRoleId),
              }
            : null;
        }) ?? []
      ).filter(Boolean) as Member[],
    [dao, activeAccountId, _, daoOrganization],
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
  const { data: daoData } = useQuery(
    getDaoByAddressQuery({
      client: graphqlClient,
      enabled: !!graphqlClient && !!debouncedValue,
      address: debouncedValue,
    }),
  );

  const { saveProfile, onUpload } = useSaveProfile(
    daoAccountsOrderBy,
    daoOrganization?.address,
  );

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
          daoWithAddress={daoData?.daoByAddress}
        />
      )}
    </div>
  );
};
