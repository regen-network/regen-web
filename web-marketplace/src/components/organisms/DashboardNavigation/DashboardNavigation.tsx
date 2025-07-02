import { useEffect, useMemo, useRef, useState } from 'react';
import { useLingui } from '@lingui/react';

import { TextButton } from 'web-components/src/components/buttons/TextButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import DoubleBreadcrumbLeftIcon from 'web-components/src/components/icons/DoubleBreadcrumbLeftIcon';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  CLOSE_MENU,
  COLLAPSE_BUTTON_CLASSES,
  COLLAPSE_SIDEBAR,
  DASHBOARD_NAVIGATION_ARIA_LABEL,
  EXPAND_SIDEBAR,
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
  isIssuer,
  loginDisabled,
  mobileMenuOpen,
  hasWalletAddress,
  hasOrders,
  collapsed,
  onToggleCollapse,
}: DashboardNavigationProps & {
  mobileMenuOpen?: boolean;
  hasWalletAddress?: boolean;
  hasOrders?: boolean;
  collapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
}) => {
  const { _ } = useLingui();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showFooterShadow, setShowFooterShadow] = useState(false);

  const sections = useMemo(
    () =>
      getDashboardNavigationSections(
        _,
        activeAccount.type,
        loginDisabled || false,
        collapsed,
        isIssuer || false,
        hasWalletAddress ?? true,
        hasOrders ?? true,
      ),
    [
      _,
      activeAccount.type,
      collapsed,
      isIssuer,
      loginDisabled,
      hasWalletAddress,
      hasOrders,
    ],
  );

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const hasScrollableContent = scrollHeight > clientHeight;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

      setShowFooterShadow(hasScrollableContent && !isAtBottom);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(container);
      setTimeout(handleScroll, 100);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [sections]);

  const handleItemClick = (path: string) => {
    if (path === 'logout') {
      onLogout?.();
    } else {
      onNavItemClick(path);
    }
    onCloseMobile?.();
  };

  return (
    <nav
      aria-label={_(DASHBOARD_NAVIGATION_ARIA_LABEL)}
      className={cn(
        NAV_BASE_CLASSES,
        collapsed
          ? 'w-[100px] px-2 pt-[27px] pb-20'
          : 'w-[263px] px-20 md:px-20 pt-30 pb-20',
        'md:block',
        'fixed md:relative top-0 left-0 h-full z-50 transform',
        'transition-all duration-200 ease-in-out',
        mobileMenuOpen || false
          ? 'translate-x-0'
          : '-translate-x-full md:translate-x-0',
        '!flex !flex-col !h-full',
      )}
    >
      {/* Mobile close button */}
      <button
        type="button"
        onClick={onCloseMobile}
        className="absolute top-[6px] right-3 block md:hidden p-1 bg-transparent border-none rounded-full hover:bg-bc-neutral-200 cursor-pointer"
        aria-label={_(CLOSE_MENU)}
      >
        <CloseIcon className="h-6 w-6 text-bc-neutral-500" />
      </button>

      {/* Collapse toggle button */}
      <button
        type="button"
        onClick={() => onToggleCollapse(!collapsed)}
        className={cn(COLLAPSE_BUTTON_CLASSES)}
        aria-label={collapsed ? _(EXPAND_SIDEBAR) : _(COLLAPSE_SIDEBAR)}
        aria-pressed={collapsed}
      >
        <DoubleBreadcrumbLeftIcon
          className={cn(
            'text-bc-neutral-400 w-[15px] h-[15px] transition-colors',
            collapsed && 'transform -scale-x-100',
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
        hasWalletAddress={hasWalletAddress}
      />

      {/* Navigation sections */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto min-h-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {sections.map((section, idx) => {
          const isLogoutSection = section.heading === '';

          return (
            <div key={idx} className={collapsed ? 'px-0' : ''}>
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
                  {section.heading}
                </TextButton>
              )}

              {isLogoutSection && (
                <hr
                  className={cn(
                    'border-0 border-t border-solid border-t-bc-neutral-300 mx-auto my-2',
                    collapsed ? 'w-[65%]' : 'w-full',
                  )}
                />
              )}

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

      {!collapsed && (
        <div
          className={cn(
            '-mx-20 md:-mx-20',
            showFooterShadow && 'shadow-[0_-2px_5px_0.5px_rgba(0,0,0,0.05)]',
          )}
        >
          <DashboardNavFooter onExitClick={onExitClick} />
        </div>
      )}
    </nav>
  );
};

export default DashboardNavigation;
