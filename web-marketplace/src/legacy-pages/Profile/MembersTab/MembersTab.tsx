import { useLingui } from '@lingui/react';
import { DEFAULT_PROFILE_USER_AVATAR } from 'legacy-pages/Dashboard/Dashboard.constants';

import { MemberCard } from 'web-components/src/components/cards/MemberCard/MemberCard';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';

import { useAuth } from 'lib/auth/auth';
import { EDIT_TEXT } from 'lib/constants/shared.constants';

import { Link } from 'components/atoms/Link';
import WithLoader from 'components/atoms/WithLoader';
import { UNNAMED } from 'components/organisms/DashboardNavigation/DashboardNavigation.constants';

import { useProfileData } from '../hooks/useProfileData';

export const MembersTab = () => {
  const { _ } = useLingui();
  const { organization, isLoading } = useProfileData();
  const { activeAccountId } = useAuth();

  return (
    <WithLoader isLoading={isLoading}>
      {organization ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {organization.daoByDaoAddress?.assignmentsByDaoAddress?.nodes.map(
            assignment => {
              const account = assignment?.accountByAccountId;
              return (
                <MemberCard
                  key={account?.id}
                  imageSrc={account?.image || DEFAULT_PROFILE_USER_AVATAR}
                  name={account?.name || _(UNNAMED)}
                  isCurrentAccount={activeAccountId === account?.id}
                  editText={_(EDIT_TEXT)}
                  editLink="/dashboard/profile"
                  linkComponent={Link as LinkComponentType}
                  description={`${account?.title ? `${account.title}, ` : ''}${
                    organization.name
                  }`}
                />
              );
            },
          )}
        </div>
      ) : null}
    </WithLoader>
  );
};
