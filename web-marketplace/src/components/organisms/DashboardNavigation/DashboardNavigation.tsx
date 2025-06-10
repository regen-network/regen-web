import { useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import DoubleBreadcrumbLeftIcon from 'web-components/src/components/icons/DoubleBreadcrumbLeftIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  COLLAPSE_BUTTON_CLASSES,
  NAV_BASE_CLASSES,
  SECTION_HEADING_BASE,
} from './DashboardNavigation.constants';
import { DashboardNavFooter } from './DashboardNavigation.Footer';
import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';

export const DashboardNavigation = ({
  header: { activeAccount, accounts, onAccountSelect, onViewProfileClick },
  currentPath,
  onNavItemClick,
  onLogout,
  onCloseMobile,
  onExitClick,
  isIssuer = false, // Add this prop with default
}: DashboardNavigationProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { _ } = useLingui();

  const sections = useMemo(
    () =>
      getDashboardNavigationSections(
        _,
        activeAccount.type,
        false, // loginDisabled
        collapsed,
        isIssuer, // Pass isIssuer to the utility function
      ),
    [_, activeAccount.type, collapsed, isIssuer], // Add isIssuer to dependencies
  );

  const handleItemClick = (path: string) => {
    if (path === 'logout') {
      onLogout?.();
    } else {
      onNavItemClick(path);
    }
  };

  return (
    <nav
      aria-label="Dashboard side navigation"
      className={cn(
        NAV_BASE_CLASSES,
        collapsed ? 'w-[100px] px-2 pt-[27px] pb-20' : 'w-[263px]',
        !collapsed && 'px-20 md:px-30 pt-30 pb-20',
      )}
    >
      {/* Mobile close button */}
      <button
        type="button"
        onClick={onCloseMobile}
        className="absolute top-[6px] right-3 block md:hidden p-1 bg-transparent border-none rounded-full hover:bg-bc-neutral-200 cursor-pointer"
        aria-label="Close menu"
      >
        <CloseIcon className="h-6 w-6 text-bc-neutral-500" />
      </button>

      {/* Collapse toggle button */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className={COLLAPSE_BUTTON_CLASSES}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-pressed={collapsed}
      >
        <DoubleBreadcrumbLeftIcon
          className={cn(
            'text-bc-neutral-400 w-[15px] h-[15px] transition-colors',
            collapsed && 'transform -scale-x-100', // Flip horizontally when collapsed
            'group-hover:text-bc-neutral-100',
          )}
        />
      </button>

      {/* Header with account switcher */}
      <DashboardNavHeader
        activeAccount={activeAccount}
        accounts={accounts}
        onAccountSelect={onAccountSelect}
        collapsed={collapsed}
        onViewProfileClick={onViewProfileClick}
      />

      {/* Navigation sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, idx) => {
          const isLogoutSection = section.heading === '';

          return (
            <div key={idx} className={collapsed ? 'px-0' : ''}>
              {/* Section heading */}
              {!isLogoutSection && (
                <TextButton
                  className={cn(
                    SECTION_HEADING_BASE,
                    collapsed
                      ? 'text-center text-[10px] leading-tight px-1 mx-auto block w-full'
                      : 'text-left text-[12px] w-full',
                  )}
                  textSize="xs"
                >
                  {section.heading}{' '}
                  {/* Section heading is already translated */}
                </TextButton>
              )}

              {/* Divider for logout section */}
              {isLogoutSection && (
                <hr
                  className={cn(
                    'border-0 border-t border-solid border-t-bc-neutral-300 mx-auto my-2',
                    collapsed ? 'w-[65%]' : 'w-full',
                  )}
                />
              )}

              {/* Navigation items */}
              <ul className="flex flex-col gap-[3px] list-none px-0 mt-5 mb-[10px] md:mb-[15px]">
                {section.items.map(item => (
                  <li key={item.label}>
                    <DashboardNavigationListItem
                      item={item}
                      currentPath={currentPath}
                      onClick={handleItemClick}
                      collapsed={collapsed}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Footer (only when expanded) */}
      {!collapsed && <DashboardNavFooter onExitClick={onExitClick} />}
    </nav>
  );
};

export default DashboardNavigation;
