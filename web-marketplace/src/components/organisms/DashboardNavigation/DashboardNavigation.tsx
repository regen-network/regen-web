import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';
import { getDashboardNavigationSections } from './DashboardNavigation.utils';
import { DashboardNavFooter } from './DashboardNavigation.Footer';

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  className = 'px-30 pt-30 pb-20',
  header: { activeAccount, accounts, onAccountSelect },
  currentPath,
  onNavItemClick,
  onLogout,
}) => {
  const { _ } = useLingui();
  const sections = getDashboardNavigationSections(activeAccount.type);

  return (
    <nav
      aria-label="Dashboard side navigation"
      className={clsx(
        'relative flex w-[240px] flex-col justify-between h-screen overflow-visible',
        'border-0 border-r border-solid border-r-bc-neutral-300 bg-white',
        className
      )}      
    >
      {/* header */}
      <DashboardNavHeader
        activeAccount={activeAccount}
        accounts={accounts}
        onAccountSelect={onAccountSelect}
      />

      {/* scrollable sections + logout */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, idx) => {
          const isLogoutSection = section.heading === '';
          return (
            <div key={idx}>
              {!isLogoutSection && (
                <h3 className="my-3 text-[12px] font-extrabold uppercase tracking-wider text-bc-neutral-400">
                  {_(section.heading)}
                </h3>
              )}

              {isLogoutSection && (
                <hr className="border-t border-[#D2D5D9] mx-auto my-2" />
              )}

              <ul className="flex flex-col gap-1 list-none px-0 mt-0">
                {section.items.map(item => (
                  <Fragment key={item.label}>
                    {item.disabled ? (
                      <InfoTooltip title={item.disabledTooltipText} arrow>
                        <li>
                          <DashboardNavigationListItem
                            item={item}
                            currentPath={currentPath}
                            onClick={onNavItemClick}
                          />
                        </li>
                      </InfoTooltip>
                    ) : (
                      <li>
                        <DashboardNavigationListItem
                          item={item}
                          currentPath={currentPath}
                          onClick={path => {
                            if (item.path === '/logout') {
                              onLogout?.();
                            } else {
                              onNavItemClick(path);
                            }
                          }}
                        />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <DashboardNavFooter />
    </nav>
  );
};

export default DashboardNavigation;
