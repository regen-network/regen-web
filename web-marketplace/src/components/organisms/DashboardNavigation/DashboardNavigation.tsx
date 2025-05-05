import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';

export const DashboardNavigation = ({
  className = '',
  sections,
  currentPath,
  onNavItemClick,
}: DashboardNavigationProps) => {
  const { _ } = useLingui();

  return (
    <nav
      aria-label="Dashboard side navigation"
      className={clsx(
        'relative flex w-[240px] flex-col overflow-y-auto border-r border-bc-neutral-100 bg-white',
        className,
      )}
    >
      {sections.map(section => (
        <div key={section.heading} className="mb-6">
          <h3 className="pb-2 text-xs font-extrabold uppercase tracking-wider text-bc-neutral-400">
            {_(section.heading)}
          </h3>

          <ul className="list-none flex flex-col gap-1 px-0">
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
                      onClick={onNavItemClick}
                    />
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default DashboardNavigation;
