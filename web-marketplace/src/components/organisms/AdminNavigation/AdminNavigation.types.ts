export type AdminNavigationSection = {
  heading: string;
  items: AdminNavigationItem[];
};

type AdminNavigationItem = {
  name: string;
  icon: JSX.Element;
  path: string;
};
