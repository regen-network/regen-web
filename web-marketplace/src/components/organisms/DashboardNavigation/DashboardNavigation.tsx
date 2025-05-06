import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  className = 'p-25',
  header,
  sections,
  currentPath,
  onNavItemClick,
}) => {
  const { _ } = useLingui();

  return (
    <nav
      // eslint-disable-next-line lingui/no-unlocalized-strings
      aria-label="Dashboard side navigation"
      className={clsx(
        'relative flex w-[240px] flex-col overflow-visible',
        'border-r border-bc-neutral-100 bg-white',
        className,
      )}
    >
      <DashboardNavHeader {...header} />
      <div className="flex-1 overflow-y-auto">
        {sections.map(section => (
          <div key={section.heading}>
            <h3 className="my-3 text-[12px] font-extrabold uppercase tracking-wider text-bc-neutral-400">
              {_(section.heading)}
            </h3>

            <ul className="mt-0 flex flex-col gap-1 list-none px-0">
              {section.items.map(item => (
                <Fragment key={item.label}>
                  {item.disabled ? (
                    <InfoTooltip title={item.disabledTooltipText} arrow>
                      <li className="text-[12px]">
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
      </div>
    </nav>
  );
};

export default DashboardNavigation;
