export type AdminNavigationSection = {
  heading: string;
  items: AdminNavigationItem[];
};

export type AdminNavigationItem = {
  name: string;
  icon: JSX.Element;
  path: string;
  disabledTooltipText?: string | undefined;
  disabled?: boolean | undefined;
};
