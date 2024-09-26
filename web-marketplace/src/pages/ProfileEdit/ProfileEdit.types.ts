import { MessageDescriptor } from '@lingui/core';

export type SocialProvider = {
  id: 'google';
  name: string;
  connect: () => void;
  disconnect: () => Promise<void>;
};

export type DashboardNavSection = {
  heading: MessageDescriptor;
  items: DashboardNavItem[];
};

type DashboardNavItem = {
  name: MessageDescriptor;
  icon: JSX.Element;
  href: string;
};
