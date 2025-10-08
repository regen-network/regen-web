import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Title, Body } from 'web-components/src/components/typography';
import { INVITE_MEMBERS } from '../CreateOrganization.constants';
import { BaseMemberRole } from 'components/organisms/BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersInviteTable } from 'components/organisms/OrganizationMembers/InviteMembers/InviteMembers.Table';
import { useAuth } from 'lib/auth/auth';
import { SetStateAction, useMemo, useState } from 'react';
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
import { isValidAddress } from 'web-components/src/components/inputs/validation';

const InviteMembersStep = () => {
  const { _ } = useLingui();
  const { activeAccount } = useAuth();
  const graphqlClient =
    useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [selectedLanguage] = useAtom(selectedLanguageAtom);

  const members = useMemo(() => {
    const dao =
      activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes?.find(
        dao => !!dao?.organizationByDaoAddress,
      );
    return (
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
              hasWalletAddress: !!acc?.addr,
              isCurrentUser: acc?.id === activeAccount?.id,
              organization:
                dao?.organizationByDaoAddress?.name || _(DEFAULT_NAME),
              email:
                acc?.privateAccountById?.email ||
                acc?.privateAccountById?.googleEmail,
            }
          : null;
      }) ?? []
    ).filter(Boolean) as Member[];
  }, [activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes]);

  const [debouncedValue, setDebouncedValue] = useState('');
  const { data: accounts } = useQuery(
    getAccountsByNameOrAddrQuery({
      client: graphqlClient,
      enabled:
        !!graphqlClient && !!debouncedValue,
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
          setDebouncedValue={setDebouncedValue}
          accounts={accounts}
        />
      )}
    </div>
  );
};
export default InviteMembersStep;
