import { Fragment } from 'react';
import { useLingui } from '@lingui/react';
import clsx from 'clsx';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { DashboardNavFooter } from './DashboardNavigation.Footer';
import { DashboardNavHeader } from './DashboardNavigation.Header';
import { DashboardNavigationListItem } from './DashboardNavigation.ListItem';
import { DashboardNavigationProps } from './DashboardNavigation.types';

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  header,
  sections,
  currentPath,
  onNavItemClick,
}) => {
  const { _ } = useLingui();

  return (
    <nav className="relative flex w-[263px] flex-col justify-between h-screen overflow-visible border-bc-neutral-400 px-30 pt-30 pb-20 z-10">
      <DashboardNavHeader {...header} />
      <div className="flex-1 overflow-y-auto ">
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
      <DashboardNavFooter />
    </nav>
  );
};

export default DashboardNavigation;
