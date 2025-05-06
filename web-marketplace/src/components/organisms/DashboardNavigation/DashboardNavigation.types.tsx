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
  sections: DashboardNavigationSection[];
  currentPath: string;
  onNavItemClick: (path: string) => void;
  header: DashboardNavHeaderData;
};

export type DashboardNavHeaderData = {
  name: string;
  address: string;
  avatarSrc?: string;
};
