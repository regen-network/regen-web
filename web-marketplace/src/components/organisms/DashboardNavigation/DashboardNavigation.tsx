// src/components/organisms/DashboardNavigation/DashboardNavigation.tsx
import React, { useState } from 'react';
import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';

import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import DoubleBreadcrumbLeftIcon from 'web-components/src/components/icons/DoubleBreadcrumbLeftIcon';

import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavFooter } from './DashboardNavigation.Footer';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';
import { DashboardNavigationProps } from './DashboardNavigation.types';

export const DashboardNavigation: React.FC<DashboardNavigationProps & {
  /** Called when the mobile “close” button is clicked */
  onCloseMobile?: () => void;
}> = ({
  className = 'px-30 pt-30 pb-20',
  header: { activeAccount, accounts, onAccountSelect },
  currentPath,
  onNavItemClick,
  onLogout,
  onCloseMobile,
}) => {
    const { _ } = useLingui();
    const [collapsed, setCollapsed] = useState(false);
    const sections = getDashboardNavigationSections(activeAccount.type, false, collapsed);


    return (
      <nav
        aria-label="Dashboard side navigation"
        className={clsx(
          'relative flex flex-col justify-between h-screen overflow-visible transition-all duration-300',
          collapsed ? 'w-[100px] px-2 pt-[27px] pb-20' : 'w-[263px]',
          'border-0 border-r border-solid border-r-[#D2D5D9] bg-white',
          !collapsed && className
        )}
      >
        <button
          type="button"
          onClick={onCloseMobile}
          className="absolute top-[6px] right-3 block md:hidden p-1 bg-transparent border-none rounded-full hover:bg-bc-neutral-200 cursor-pointer"
          aria-label="Close menu"
        >
          <CloseIcon className="h-6 w-6 text-bc-neutral-500" />
        </button>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            "hidden sm:flex items-center justify-center",
            "w-[25px] h-[25px]",
            "absolute z-10",
            "right-[-12px]", // Fixed position 
            "top-[35px]", // Fixed position
            "p-0",
            "rounded-[5px]",
            "border border-[1px] border-[#D2D5D9]",
            "bg-[#FFFFFF]",
            "shadow-[0_4px_10px_rgba(0,0,0,0.1)]",
            "cursor-pointer"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <DoubleBreadcrumbLeftIcon 
            className={clsx(
              "text-bc-neutral-400 w-[15px] h-[15px]",
              collapsed && "transform -scale-x-100" // Flip horizontally when collapsed
            )}
          />
        </button>

        <DashboardNavHeader
          activeAccount={activeAccount}
          accounts={accounts}
          onAccountSelect={onAccountSelect}
          collapsed={collapsed}
        />

        <div className="flex-1 overflow-y-auto">
          {sections.map((section, idx) => {
            const isLogoutSection = section.heading === '';
            return (
              <div key={idx} className={collapsed ? "px-0" : ""}>
                {!isLogoutSection && (
                  <h3 className={clsx(
                    "my-3 font-extrabold uppercase tracking-wider text-bc-neutral-400",
                    collapsed
                      ? "text-center text-[10px] leading-tight px-1 mx-auto"
                      : "text-[12px]"
                  )}>
                    {_(section.heading)}
                  </h3>
                )}

                {isLogoutSection && (
                  <hr className={clsx(
                    "border-0 border-t border-solid border-t-bc-neutral-300 mx-auto my-2",
                    collapsed ? "w-[%]" : "w-full"
                  )} />
                )}

                <ul className="flex flex-col gap-1 list-none px-0 mt-0">
                  {section.items.map(item => (
                    <li key={item.label}>
                      <DashboardNavigationListItem
                        item={item}
                        currentPath={currentPath}
                        onClick={(path) => {
                          // Check if this is the logout action
                          if (path === '/logout') {
                            // Call the onLogout callback
                            onLogout?.();
                          } else {
                            // Normal navigation for other items
                            onNavItemClick(path);
                          }
                        }}
                        collapsed={collapsed}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {!collapsed && <DashboardNavFooter />}
      </nav>
    );
  };

export default DashboardNavigation;
