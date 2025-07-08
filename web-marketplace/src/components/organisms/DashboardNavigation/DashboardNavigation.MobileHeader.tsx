import { useLingui } from '@lingui/react';

import HamburgerIcon from 'web-components/src/components/icons/HamburgerIcon';
import { Subtitle } from 'web-components/src/components/typography/Subtitle';
import UserAvatar from 'web-components/src/components/user/UserAvatar';
import { cn } from 'web-components/src/utils/styles/cn';

import { AccountType } from 'generated/graphql';

import { getDefaultAvatar } from 'pages/Dashboard/Dashboard.utils';

import { UNNAMED } from './DashboardNavigation.constants';
import { DashboardNavHeaderData } from './DashboardNavigation.types';

type Props = {
  activeAccount: DashboardNavHeaderData['activeAccount'];
  onMenuClick: () => void;
  mobileMenuOpen?: boolean;
};

export const DashboardNavigationMobileHeader = ({
  activeAccount,
  onMenuClick,
  mobileMenuOpen = false,
}: Props) => {
  const { _ } = useLingui();
  const { name, image } = activeAccount;

  const avatarSrc =
    image ||
    getDefaultAvatar({
      ...activeAccount,
      type:
        activeAccount.type === 'user'
          ? AccountType.User
          : AccountType.Organization,
    });

  return (
    <div
      className={cn(
        'md:hidden fixed top-0 w-[100%] z-40 flex gap-10 bg-bc-neutral-0 px-5 py-10 transition-all duration-300 border-solid border-0 border-b border-sc-surface-stroke',
        mobileMenuOpen && 'blur-sm',
      )}
    >
      {/* Hamburger Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden z-50 border-none bg-bc-neutral-0 pt-5"
        aria-label="Open menu"
      >
        <HamburgerIcon className="w-[29px] h-[22px] cursor-pointer" />
      </button>

      {/* User Info */}
      <div className="flex items-center gap-5">
        <UserAvatar src={avatarSrc} alt={name} size="sm" />
        <Subtitle className="text-bc-neutral-900" size="lg">
          {name || _(UNNAMED)}
        </Subtitle>
      </div>
    </div>
  );
};
