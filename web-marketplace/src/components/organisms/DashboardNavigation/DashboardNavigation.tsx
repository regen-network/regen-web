import { useState } from 'react';
import { useLingui } from '@lingui/react';

import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import DoubleBreadcrumbLeftIcon from 'web-components/src/components/icons/DoubleBreadcrumbLeftIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import { DashboardNavFooter } from './DashboardNavigation.Footer';
import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';

// Component class constants
const NAV_BASE_CLASSES =
  'relative flex flex-col justify-between h-screen overflow-visible transition-all duration-300 border-0 border-r border-solid border-r-[#D2D5D9] bg-white';

const COLLAPSE_BUTTON_CLASSES =
  'hidden sm:flex items-center justify-center w-[25px] h-[25px] absolute z-10 right-[-12px] top-[35px] p-0 rounded-[5px] border border-[1px] border-[#D2D5D9] bg-[#FFFFFF] shadow-[0_4px_10px_rgba(0,0,0,0.1)] cursor-pointer';

const SECTION_HEADING_BASE =
  'my-3 font-extrabold uppercase tracking-wider text-bc-neutral-400';

export const DashboardNavigation = ({
  className = 'px-30 pt-30 pb-20',
  header: { activeAccount, accounts, onAccountSelect, onViewProfileClick },
  currentPath,
  onNavItemClick,
  onLogout,
  onCloseMobile,
  onExitClick,
}: DashboardNavigationProps) => {
  const { _ } = useLingui();
  const [collapsed, setCollapsed] = useState(false);
  const sections = getDashboardNavigationSections(
    activeAccount.type,
    false,
    collapsed,
  );

  // Handle navigation item clicks
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
        !collapsed && className,
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
      >
        <DoubleBreadcrumbLeftIcon
          className={cn(
            'text-bc-neutral-400 w-[15px] h-[15px]',
            collapsed && 'transform -scale-x-100', // Flip horizontally when collapsed
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
                <h3
                  className={cn(
                    SECTION_HEADING_BASE,
                    collapsed
                      ? 'text-center text-[10px] leading-tight px-1 mx-auto'
                      : 'text-[12px]',
                  )}
                >
                  {_(section.heading)}
                </h3>
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
              <ul className="flex flex-col gap-1 list-none px-0 mt-0">
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
