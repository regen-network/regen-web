export interface AccountOption {
  id: string;
  name: string;
  address: string;
  avatarSrc?: string;
  type: 'user' | 'org';
}

export type DashboardNavHeaderData = {
  activeAccount: AccountOption;
  accounts: AccountOption[];
  collapsed?: boolean;
  onAccountSelect?: (id: string) => void;
  onViewProfileClick?: (href: string) => void;
};

export interface DashboardNavigationItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  disabledTooltipText?: string;
}

export interface DashboardNavigationSection {
  heading: string;
  items: DashboardNavigationItem[];
}

export interface DashboardNavigationProps {
  header: DashboardNavHeaderData;
  currentPath: string;
  className?: string;
  onNavItemClick: (path: string) => void;
  onLogout?: () => void;
  onCloseMobile?: () => void;
  onExitClick?: () => void;
}

export interface NavigationListItemProps {
  item: DashboardNavigationItem;
  currentPath: string;
  onClick: (path: string) => void;
  collapsed?: boolean;
}

export interface DashboardNavFooterProps {
  onExitClick?: (href: string) => void;
}

export interface AccountSwitcherDropdownProps {
  accounts: AccountOption[];
  activeId: string;
  onSelect: (id: string) => void;
}
