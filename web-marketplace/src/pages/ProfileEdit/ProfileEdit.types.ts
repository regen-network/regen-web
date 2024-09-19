export type SocialProvider = {
  id: 'google';
  name: string;
  connect: () => void;
  disconnect: () => Promise<void>;
};

export type DashboardNavSection = {
  heading: string;
  items: DashboardNavItem[];
};

type DashboardNavItem = {
  name: string;
  icon: JSX.Element;
  href: string;
};
