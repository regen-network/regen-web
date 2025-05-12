export type AccountOption = {
  id: string;
  name: string;
  address: string;
  avatarSrc?: string;
  type: 'user' | 'org';
};

export type DashboardNavHeaderData = {
  activeAccount: AccountOption;
  accounts: AccountOption[];
  onAccountSelect?: (id: string) => void;
};

export type DashboardNavigationItem = {
  label: string;
  path: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  disabledTooltipText?: string;
};

export type DashboardNavigationSection = {
  heading: string;
  items: DashboardNavigationItem[];
};

export type DashboardNavigationProps = {
  className?: string;
  header: {
    activeAccount: AccountOption;
    accounts: AccountOption[];
    onAccountSelect: (id: string) => void;
  };
  currentPath: string;
  onNavItemClick: (path: string) => void;
  onLogout?: () => void;
};

